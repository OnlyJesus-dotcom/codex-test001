'use client';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';

export default function Home() {
  const routines = useAppStore((s) => s.routines);
  const lastRoutineId = useAppStore((s) => s.lastRoutineId);
  const settings = useAppStore((s) => s.settings);
  const last = routines.find((r) => r.id === lastRoutineId) || routines[0];

  return (
    <main className="space-y-4">
      {!settings.disclaimerAccepted && (
        <section className="card bg-amber-950 border-amber-700">
          <h2 className="font-bold text-lg">안내</h2>
          <p>이 앱은 의료 조언이 아닙니다. 통증/이상 증상이 있으면 즉시 중단하고 전문가와 상담하세요.</p>
          <Link className="underline" href="/settings">설정에서 확인/동의</Link>
        </section>
      )}
      <section className="card">
        <h2 className="font-semibold">빠른 시작(마지막 루틴)</h2>
        {last ? <Link className="bg-indigo-600 inline-block mt-2" href={`/workout/${last.id}/${last.sessions[0].id}`}>오늘 운동 시작</Link> : <p>루틴이 없습니다.</p>}
      </section>
      <section className="card space-y-2">
        <Link className="bg-slate-700 inline-block" href="/routines">루틴 선택</Link>
        <Link className="bg-slate-700 inline-block ml-2" href="/routines/new">새 루틴 만들기</Link>
      </section>
    </main>
  );
}
