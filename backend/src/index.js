import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(morgan('dev'));

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Mongo (announcements, qna)
let mongoDb = null;
async function initMongo() {
  try {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/synaphack';
    const client = new MongoClient(url);
    await client.connect();
    mongoDb = client.db();
    console.log('[mongo] connected');
  } catch (e) {
    console.warn('[mongo] failed, falling back to memory for announcements/Q&A', e.message);
  }
}
const mem = { announcements: [], qna_threads: [] };

// --------- Routes ---------

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Users (very basic)
app.post('/users', async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name, role } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Events
app.get('/events', async (req, res) => {
  const events = await prisma.event.findMany({ orderBy: { startAt: 'asc' }});
  res.json(events);
});
app.post('/events', async (req, res) => {
  const { title, mode, status, startAt, endAt } = req.body;
  try {
    const event = await prisma.event.create({ data: { title, mode, status, startAt: new Date(startAt), endAt: new Date(endAt) } });
    res.json(event);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.get('/events/:id', async (req, res) => {
  const event = await prisma.event.findUnique({ where: { id: req.params.id }, include: { teams: true, submissions: true } });
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(event);
});

// Teams
app.post('/teams', async (req, res) => {
  const { name, eventId, ownerUserId } = req.body;
  try {
    const team = await prisma.team.create({
      data: {
        name, eventId,
        inviteCode: Math.random().toString(36).slice(2,8),
        members: { create: [{ role: 'owner', userId: ownerUserId }] }
      },
      include: { members: true }
    });
    res.json(team);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.post('/teams/join', async (req, res) => {
  const { inviteCode, userId } = req.body;
  const team = await prisma.team.findFirst({ where: { inviteCode }, include: { members: true } });
  if (!team) return res.status(404).json({ error: 'Invalid code' });
  if (team.members.length >= team.sizeLimit) return res.status(400).json({ error: 'Team is full' });
  try {
    const member = await prisma.teamMember.create({ data: { role: 'member', teamId: team.id, userId } });
    res.json({ teamId: team.id, member });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Submissions
app.post('/events/:eventId/submissions', async (req, res) => {
  const { title, repoUrl, demoUrl, stage, teamId } = req.body;
  try {
    const s = await prisma.submission.create({ data: { title, repoUrl, demoUrl, stage, teamId, eventId: req.params.eventId } });
    res.json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.get('/events/:eventId/submissions', async (req, res) => {
  const subs = await prisma.submission.findMany({ where: { eventId: req.params.eventId }, include: { reviews: true, team: true } });
  res.json(subs);
});

// Reviews
app.post('/submissions/:id/reviews', async (req, res) => {
  const { judgeId, scoreImpact, scoreInnovation, scoreUx, scoreTech, comments } = req.body;
  try {
    const r = await prisma.review.create({ data: {
      submissionId: req.params.id, judgeId,
      scoreImpact, scoreInnovation, scoreUx, scoreTech, comments
    }});
    res.json(r);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Leaderboard
app.get('/events/:eventId/leaderboard', async (req, res) => {
  const rows = await prisma.review.findMany({
    where: { submission: { eventId: req.params.eventId }},
    include: { submission: { include: { team: true } } }
  });
  const map = new Map();
  for (const r of rows) {
    const sid = r.submissionId;
    const total = r.scoreImpact + r.scoreInnovation + r.scoreUx + r.scoreTech;
    const cur = map.get(sid) || { submissionId: sid, team: r.submission.team.name, total: 0 };
    cur.total += total;
    map.set(sid, cur);
  }
  const leaderboard = Array.from(map.values()).sort((a,b)=>b.total-a.total);
  res.json({ eventId: req.params.eventId, leaderboard });
});

// Announcements (Mongo or memory)
app.post('/events/:eventId/announce', async (req, res) => {
  const doc = { event_id: req.params.eventId, title: req.body.title, body: req.body.body, created_at: new Date() };
  try {
    if (mongoDb) {
      const r = await mongoDb.collection('announcements').insertOne(doc);
      res.json({ _id: r.insertedId, ...doc });
    } else {
      mem.announcements.push({ _id: mem.announcements.length+1, ...doc });
      res.json(mem.announcements[mem.announcements.length-1]);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.get('/events/:eventId/announce', async (req, res) => {
  if (mongoDb) {
    const items = await mongoDb.collection('announcements').find({ event_id: req.params.eventId }).sort({ created_at: -1 }).toArray();
    res.json(items);
  } else {
    res.json(mem.announcements.filter(a=>a.event_id===req.params.eventId).reverse());
  }
});

// Q&A (threads)
app.post('/events/:eventId/qna', async (req, res) => {
  const doc = { event_id: req.params.eventId, title: req.body.title, messages: [], created_at: new Date() };
  if (mongoDb) {
    const r = await mongoDb.collection('qna_threads').insertOne(doc);
    res.json({ _id: r.insertedId, ...doc });
  } else {
    mem.qna_threads.push({ _id: mem.qna_threads.length+1, ...doc });
    res.json(mem.qna_threads[mem.qna_threads.length-1]);
  }
});
app.post('/qna/:id/reply', async (req, res) => {
  const msg = { user_id: req.body.user_id, text: req.body.text, ts: new Date() };
  if (mongoDb) {
    await mongoDb.collection('qna_threads').updateOne({ _id: new MongoClient.ObjectId(req.params.id) }, { $push: { messages: msg }});
    res.json({ ok: true });
  } else {
    const t = mem.qna_threads.find(x=>String(x._id)===req.params.id);
    if (!t) return res.status(404).json({ error: 'Not found' });
    t.messages.push(msg);
    res.json({ ok: true });
  }
});

// Start
initMongo().finally(() => {
  app.listen(PORT, () => console.log(`API running http://localhost:${PORT}`));
});
