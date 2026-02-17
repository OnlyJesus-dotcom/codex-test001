'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimer() {
  const [remainingMs, setRemainingMs] = useState(0);
  const [running, setRunning] = useState(false);
  const targetRef = useRef(0);
  const rafRef = useRef<number>();
  const pausedRemaining = useRef(0);

  const tick = useCallback(() => {
    const now = performance.now();
    const left = Math.max(0, targetRef.current - now);
    setRemainingMs(left);
    if (left > 0 && running) rafRef.current = requestAnimationFrame(tick);
    else setRunning(false);
  }, [running]);

  const start = (sec: number) => {
    const ms = sec * 1000;
    targetRef.current = performance.now() + ms;
    setRemainingMs(ms);
    setRunning(true);
  };

  const pause = () => {
    pausedRemaining.current = remainingMs;
    setRunning(false);
  };

  const resume = () => {
    if (pausedRemaining.current <= 0) return;
    targetRef.current = performance.now() + pausedRemaining.current;
    setRunning(true);
  };

  const addSec = (sec: number) => {
    targetRef.current += sec * 1000;
    setRemainingMs((r) => r + sec * 1000);
  };

  const reset = () => {
    setRemainingMs(0);
    setRunning(false);
  };

  useEffect(() => {
    if (!running) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [running, tick]);

  return { remainingSec: Math.ceil(remainingMs / 1000), running, start, pause, resume, addSec, reset };
}
