'use client';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';

export default function RoutinesPage() {
  const routines = useAppStore((s) => s.routines);
  const saveRoutine = useAppStore((s) => s.saveRoutine);
  const clone = async (id: string) => {
    const src = routines.find((r) => r.id === id);
    if (!src) return;
    await saveRoutine({ ...src, id: `${src.id}-${Date.now()}`, name: `${src.name} Copy` });
  };
  return (
    <main className="space-y-3">
      {routines.map((r) => (
        <section key={r.id} className="card">
          <h3 className="font-semibold">{r.name}</h3>
          <p>{r.daysPerWeek} days/week</p>
          <div className="space-x-2 mt-2">
            <Link className="bg-indigo-600 inline-block" href={`/routines/${r.id}`}>편집</Link>
            <button className="bg-slate-700" onClick={() => clone(r.id)}>템플릿 복제</button>
          </div>
        </section>
      ))}
    </main>
  );
}
