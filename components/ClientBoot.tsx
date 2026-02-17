'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

export function ClientBoot() {
  const load = useAppStore((s) => s.load);
  useEffect(() => {
    load();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
  }, [load]);
  return null;
}
