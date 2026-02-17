export type ExerciseCategory =
  | 'PUSHUP'
  | 'SQUAT'
  | 'PULLUP'
  | 'LEG_RAISE'
  | 'BRIDGE'
  | 'HANDSTAND_PUSHUP';

export type Step = {
  stepNumber: number;
  name: string;
  description: string;
  defaultPrescription: { sets: number; repsRange: [number, number]; restSec: number };
  criteriaToAdvance: string;
};

export type Exercise = {
  id: string;
  category: ExerciseCategory;
  name: string;
  equipmentTags: string[];
  notes: string;
  progressionSteps: Step[];
};

export type Block = {
  id: string;
  type: 'sets' | 'interval';
  exerciseRef: { exerciseId: string; stepNumber: number };
  prescription:
    | {
        sets: number;
        repsTarget?: number;
        repsRange?: [number, number];
        restSec: number;
        tempo?: string;
        notes?: string;
      }
    | {
        rounds: number;
        workSec: number;
        restSec: number;
        notes?: string;
      };
};

export type Session = { id: string; title: string; blocks: Block[] };
export type RoutineTemplate = { id: string; name: string; daysPerWeek: number; sessions: Session[] };

export type Entry = {
  exerciseId: string;
  stepNumber: number;
  setIndex: number;
  repsDone: number;
  restPlannedSec: number;
  restActualSec: number;
  timestampISO: string;
  isSkipped: boolean;
};

export type WorkoutLog = {
  id: string;
  dateISO: string;
  routineId: string;
  sessionId: string;
  entries: Entry[];
  durationSec: number;
  notes: string;
  perceivedExertion?: number;
};

export type Settings = {
  sound: boolean;
  voice: boolean;
  vibrate: boolean;
  wakeLock: boolean;
  disclaimerAccepted: boolean;
};
