'use client';
import { create } from 'zustand';
import { Exercise, RoutineTemplate, Settings, WorkoutLog } from '@/types/domain';
import { ensureSeeded, repo } from '@/db/indexedDb';

type State = {
  exercises: Exercise[];
  routines: RoutineTemplate[];
  logs: WorkoutLog[];
  settings: Settings;
  lastRoutineId?: string;
  load: () => Promise<void>;
  saveRoutine: (r: RoutineTemplate) => Promise<void>;
  saveLog: (log: WorkoutLog) => Promise<void>;
  setSettings: (s: Settings) => Promise<void>;
};

export const useAppStore = create<State>((set, get) => ({
  exercises: [],
  routines: [],
  logs: [],
  settings: { sound: true, voice: false, vibrate: false, wakeLock: true, disclaimerAccepted: false },
  load: async () => {
    await ensureSeeded();
    const [exercises, routines, logs, rawSettings] = await Promise.all([
      repo.listExercises(),
      repo.listRoutines(),
      repo.listLogs(),
      repo.getSettings(),
    ]);
    const { id: _id, ...settings } = rawSettings || { id: 'app', sound: true, voice: false, vibrate: false, wakeLock: true, disclaimerAccepted: false };
    set({ exercises, routines, logs, settings });
  },
  saveRoutine: async (r) => {
    await repo.saveRoutine(r);
    set({ routines: await repo.listRoutines() });
  },
  saveLog: async (log) => {
    await repo.saveLog(log);
    set({ logs: await repo.listLogs(), lastRoutineId: log.routineId });
  },
  setSettings: async (s) => {
    await repo.saveSettings(s);
    set({ settings: s });
  },
}));
