'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function EventPage(){
  const path = usePathname();
  const id = path?.split('/').pop();
  const [event, setEvent] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);

  useEffect(()=>{
    fetch(`${API}/events/${id}`).then(r=>r.json()).then(setEvent);
  },[id]);

  const makeTeam = async()=>{
    const rUser = await fetch(`${API}/users`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email: 'me@local.dev', name: 'Me', role: 'participant'})});
    const u = await rUser.json();
    const r = await fetch(`${API}/teams`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: 'My Team', eventId: id, ownerUserId: u.id })});
    const t = await r.json();
    setTeam(t);
  };

  const submit = async()=>{
    const r = await fetch(`${API}/events/${id}/submissions`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title:'My Project', repoUrl:'https://github.com/me/repo', demoUrl:'https://demo', stage:'final', teamId: team.id })});
    const s = await r.json();
    setSubmission(s);
  };

  const leaderboard = async()=>{
    const r = await fetch(`${API}/events/${id}/leaderboard`);
    const data = await r.json();
    alert(JSON.stringify(data, null, 2));
  };

  if (!event) return <div>Loading...</div>;
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.mode} · {event.status}</p>
      <button onClick={makeTeam}>Create Team</button>
      {team && <div>Team created: {team.name} (invite: {team.inviteCode}) <button onClick={submit}>Submit Project</button></div>}
      {submission && <div>Submission: {submission.title}</div>}
      <button onClick={leaderboard}>View Leaderboard</button>
    </div>
  );
}
