'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function NewRoutinePage() {
  const saveRoutine = useAppStore((s) => s.saveRoutine);
  const router = useRouter();
  return (
    <main className="card space-y-2">
      <button
        className="bg-indigo-600"
        onClick={async () => {
          const id = `routine-${Date.now()}`;
          await saveRoutine({ id, name: 'Custom Routine', daysPerWeek: 3, sessions: [{ id: 'S1', title: 'Session 1', blocks: [] }] });
          router.push(`/routines/${id}`);
        }}
      >
        빈 루틴 생성
      </button>
    </main>
  );
}
