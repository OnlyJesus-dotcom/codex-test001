'use client';
import { useAppStore } from '@/store/appStore';

export default function HistoryPage() {
  const logs = useAppStore((s) => s.logs);
  const routines = useAppStore((s) => s.routines);

  return (
    <main className="space-y-3">
      {logs.sort((a,b)=>b.dateISO.localeCompare(a.dateISO)).map((log) => (
        <section key={log.id} className="card">
          <h3 className="font-semibold">{new Date(log.dateISO).toLocaleString()}</h3>
          <p>Routine: {routines.find((r) => r.id === log.routineId)?.name || log.routineId}</p>
          <p>Duration: {log.durationSec}s</p>
          <table className="w-full text-sm mt-2">
            <thead><tr><th>Exercise</th><th>Step</th><th>Set</th><th>Reps</th></tr></thead>
            <tbody>{log.entries.map((e, idx) => <tr key={idx}><td>{e.exerciseId}</td><td>{e.stepNumber}</td><td>{e.setIndex}</td><td>{e.repsDone}</td></tr>)}</tbody>
          </table>
        </section>
      ))}
      {logs.length === 0 && <p>아직 기록이 없습니다.</p>}
    </main>
  );
}
