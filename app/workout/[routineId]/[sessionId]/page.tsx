'use client';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useTimer } from '@/hooks/useTimer';

export default function WorkoutPlayer() {
  const params = useParams<{ routineId: string; sessionId: string }>();
  const { routines, exercises, settings, saveLog } = useAppStore();
  const routine = routines.find((r) => r.id === params.routineId);
  const session = routine?.sessions.find((s) => s.id === params.sessionId);
  const [blockIndex, setBlockIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(1);
  const [reps, setReps] = useState(0);
  const [entries, setEntries] = useState<any[]>([]);
  const [startTs] = useState(Date.now());
  const timer = useTimer();

  const block = session?.blocks[blockIndex];
  const exercise = useMemo(() => exercises.find((e) => e.id === block?.exerciseRef.exerciseId), [exercises, block]);
  if (!routine || !session || !block || !exercise) return <main>루틴/세션을 찾을 수 없습니다.</main>;

  const p: any = block.prescription;
  const totalSets = p.sets || p.rounds || 1;

  const announce = (t: string) => {
    if (settings.voice && 'speechSynthesis' in window) speechSynthesis.speak(new SpeechSynthesisUtterance(t));
    if (settings.vibrate && 'vibrate' in navigator) navigator.vibrate(150);
  };

  const finishSet = () => {
    const now = new Date().toISOString();
    setEntries((prev) => [...prev, { exerciseId: exercise.id, stepNumber: block.exerciseRef.stepNumber, setIndex, repsDone: reps, restPlannedSec: p.restSec, restActualSec: p.restSec, timestampISO: now, isSkipped: false }]);
    setReps(0);
    if (setIndex < totalSets) {
      setSetIndex(setIndex + 1);
      timer.start(p.restSec || 60);
      announce('휴식 시작');
    } else {
      if (blockIndex + 1 < session.blocks.length) {
        setBlockIndex(blockIndex + 1);
        setSetIndex(1);
      } else {
        saveLog({
          id: `log-${Date.now()}`,
          dateISO: now,
          routineId: routine.id,
          sessionId: session.id,
          entries,
          durationSec: Math.floor((Date.now() - startTs) / 1000),
          notes: '',
        });
        alert('운동 기록 저장 완료');
      }
    }
  };

  return (
    <main className="space-y-3">
      <section className="card">
        <h2 className="text-xl font-bold">{exercise.name} - Step {block.exerciseRef.stepNumber}</h2>
        <p>세트 {setIndex}/{totalSets}</p>
        <p>목표 반복: {p.repsTarget || `${p.repsRange?.[0] || 0}-${p.repsRange?.[1] || 0}`}</p>
        <input type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} aria-label="입력 reps" />
        <div className="text-6xl font-bold my-3">{timer.remainingSec}</div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-indigo-600" onClick={finishSet}>완료</button>
          <button className="bg-slate-700" onClick={() => timer.pause()}>일시정지</button>
          <button className="bg-slate-700" onClick={() => timer.resume()}>재개</button>
          <button className="bg-slate-700" onClick={() => timer.addSec(10)}>+10초</button>
          <button className="bg-slate-700" onClick={() => timer.addSec(30)}>+30초</button>
          <button className="bg-slate-700" onClick={() => setBlockIndex(Math.max(0, blockIndex - 1))}>이전</button>
          <button className="bg-slate-700" onClick={() => setBlockIndex(Math.min(session.blocks.length - 1, blockIndex + 1))}>다음</button>
        </div>
      </section>
      <section className="card">
        <h3 className="font-semibold">다음 항목</h3>
        <p>{session.blocks[blockIndex + 1] ? `${session.blocks[blockIndex + 1].exerciseRef.exerciseId} / step ${session.blocks[blockIndex + 1].exerciseRef.stepNumber}` : '마지막 항목입니다.'}</p>
      </section>
    </main>
  );
}
