import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@demo.dev' },
    update: {},
    create: { email: 'alice@demo.dev', name: 'Alice', role: 'organizer' }
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@demo.dev' },
    update: {},
    create: { email: 'bob@demo.dev', name: 'Bob', role: 'participant' }
  });
  const judge = await prisma.user.upsert({
    where: { email: 'judge@demo.dev' },
    update: {},
    create: { email: 'judge@demo.dev', name: 'Judy', role: 'judge' }
  });
  const event = await prisma.event.create({
    data: {
      title: 'SynapHack 3.0',
      mode: 'online',
      status: 'open',
      startAt: new Date(Date.now()+86400000),
      endAt: new Date(Date.now()+3*86400000)
    }
  });
  const team = await prisma.team.create({
    data: {
      name: 'Alpha Team',
      sizeLimit: 4,
      inviteCode: 'joinus',
      eventId: event.id,
      members: { create: [{ role: 'owner', userId: bob.id }]}
    },
    include: { members: true }
  });
  await prisma.submission.create({
    data: {
      title: 'Alpha Prototype',
      repoUrl: 'https://github.com/example/repo',
      demoUrl: 'https://demo.example.com',
      stage: 'prototype',
      teamId: team.id,
      eventId: event.id
    }
  });
  console.log('Seeded users, event, team, submission. Invite code:', team.inviteCode);
}
main().finally(()=>prisma.$disconnect());
