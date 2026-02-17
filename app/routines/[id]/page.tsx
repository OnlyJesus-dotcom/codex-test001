'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function RoutineEditor() {
  const params = useParams<{ id: string }>();
  const routines = useAppStore((s) => s.routines);
  const exercises = useAppStore((s) => s.exercises);
  const saveRoutine = useAppStore((s) => s.saveRoutine);
  const routine = useMemo(() => routines.find((r) => r.id === params.id), [routines, params.id]);
  if (!routine) return <main>Not found</main>;

  return (
    <main className="space-y-3">
      {routine.sessions.map((session, si) => (
        <section className="card" key={session.id}>
          <input
            value={session.title}
            onChange={(e) => {
              const next = structuredClone(routine);
              next.sessions[si].title = e.target.value;
              saveRoutine(next);
            }}
          />
          {session.blocks.map((b, bi) => (
            <div className="grid grid-cols-2 gap-2 mt-2" key={b.id}>
              <select
                value={b.exerciseRef.exerciseId}
                onChange={(e) => {
                  const next = structuredClone(routine);
                  next.sessions[si].blocks[bi].exerciseRef.exerciseId = e.target.value;
                  saveRoutine(next);
                }}
              >
                {exercises.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
              </select>
              <input
                type="number"
                min={1}
                max={10}
                value={b.exerciseRef.stepNumber}
                onChange={(e) => {
                  const next = structuredClone(routine);
                  next.sessions[si].blocks[bi].exerciseRef.stepNumber = Number(e.target.value);
                  saveRoutine(next);
                }}
              />
            </div>
          ))}
          <button
            className="bg-slate-700 mt-2"
            onClick={() => {
              const ex = exercises[0];
              if (!ex) return;
              const next = structuredClone(routine);
              next.sessions[si].blocks.push({
                id: `b-${Date.now()}`,
                type: 'sets',
                exerciseRef: { exerciseId: ex.id, stepNumber: 1 },
                prescription: { sets: 3, repsRange: [5, 12], restSec: 90 },
              });
              saveRoutine(next);
            }}
          >
            블록 추가
          </button>
        </section>
      ))}
      <button className="bg-indigo-600" onClick={() => {
        const next = structuredClone(routine);
        next.sessions.push({ id: `S${next.sessions.length+1}`, title: `Session ${next.sessions.length+1}`, blocks: [] });
        saveRoutine(next);
      }}>세션 추가</button>
    </main>
  );
}
