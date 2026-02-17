import { openDB } from 'idb';
import { Exercise, RoutineTemplate, Settings, WorkoutLog } from '@/types/domain';
import { seedExercises, seedRoutines } from './seed';

const DB_NAME = 'bigsix-trainer';

export async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('exercises', { keyPath: 'id' });
      db.createObjectStore('routines', { keyPath: 'id' });
      db.createObjectStore('logs', { keyPath: 'id' });
      db.createObjectStore('settings', { keyPath: 'id' });
      db.createObjectStore('meta', { keyPath: 'id' });
    },
  });
}

export async function ensureSeeded() {
  const db = await getDb();
  const done = await db.get('meta', 'seeded');
  if (done) return;
  for (const e of seedExercises) await db.put('exercises', e);
  for (const r of seedRoutines) await db.put('routines', r);
  await db.put('settings', { id: 'app', sound: true, voice: false, vibrate: false, wakeLock: true, disclaimerAccepted: false });
  await db.put('meta', { id: 'seeded', at: new Date().toISOString() });
}

export const repo = {
  listExercises: async () => (await getDb()).getAll('exercises') as Promise<Exercise[]>,
  listRoutines: async () => (await getDb()).getAll('routines') as Promise<RoutineTemplate[]>,
  saveRoutine: async (routine: RoutineTemplate) => (await getDb()).put('routines', routine),
  getRoutine: async (id: string) => (await getDb()).get('routines', id) as Promise<RoutineTemplate>,
  listLogs: async () => (await getDb()).getAll('logs') as Promise<WorkoutLog[]>,
  saveLog: async (log: WorkoutLog) => (await getDb()).put('logs', log),
  getSettings: async () => ((await getDb()).get('settings', 'app') as Promise<(Settings & { id: 'app' }) | undefined>),
  saveSettings: async (settings: Settings) => (await getDb()).put('settings', { id: 'app', ...settings }),
  backup: async () => {
    const db = await getDb();
    return {
      exercises: await db.getAll('exercises'),
      routines: await db.getAll('routines'),
      logs: await db.getAll('logs'),
      settings: await db.get('settings', 'app'),
    };
  },
  restore: async (json: any) => {
    const db = await getDb();
    for (const k of ['exercises', 'routines', 'logs']) {
      const tx = db.transaction(k, 'readwrite');
      await tx.store.clear();
      for (const item of json[k] || []) await tx.store.put(item);
      await tx.done;
    }
    if (json.settings) await db.put('settings', json.settings);
  },
};
