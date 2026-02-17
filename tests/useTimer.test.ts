import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from '@/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('counts down and stops at zero', () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.start(1));
    expect(result.current.running).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(result.current.remainingSec).toBe(0);
  });
});
