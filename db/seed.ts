import { Exercise, ExerciseCategory, RoutineTemplate } from '@/types/domain';

const cats: ExerciseCategory[] = ['PUSHUP', 'SQUAT', 'PULLUP', 'LEG_RAISE', 'BRIDGE', 'HANDSTAND_PUSHUP'];

export const seedExercises: Exercise[] = cats.map((category) => ({
  id: category.toLowerCase(),
  category,
  name: `${category.replace('_', ' ')} Progression`,
  equipmentTags: category === 'PULLUP' ? ['bar'] : ['none'],
  notes: 'Example exercise. Edit freely.',
  progressionSteps: Array.from({ length: 10 }, (_, i) => ({
    stepNumber: i + 1,
    name: `Step ${i + 1}`,
    description: '',
    criteriaToAdvance: '',
    defaultPrescription: { sets: 3, repsRange: [5, 15], restSec: 90 },
  })),
}));

export const seedRoutines: RoutineTemplate[] = [
  {
    id: 'ab-example',
    name: 'A/B Split (Example)',
    daysPerWeek: 4,
    sessions: [
      {
        id: 'A',
        title: 'Session A',
        blocks: [
          { id: 'a1', type: 'sets', exerciseRef: { exerciseId: 'pushup', stepNumber: 1 }, prescription: { sets: 3, repsRange: [6, 12], restSec: 90 } },
          { id: 'a2', type: 'sets', exerciseRef: { exerciseId: 'leg_raise', stepNumber: 1 }, prescription: { sets: 3, repsRange: [6, 12], restSec: 90 } },
          { id: 'a3', type: 'sets', exerciseRef: { exerciseId: 'handstand_pushup', stepNumber: 1 }, prescription: { sets: 2, repsRange: [5, 10], restSec: 120 } },
        ],
      },
      {
        id: 'B',
        title: 'Session B',
        blocks: [
          { id: 'b1', type: 'sets', exerciseRef: { exerciseId: 'squat', stepNumber: 1 }, prescription: { sets: 3, repsRange: [8, 15], restSec: 90 } },
          { id: 'b2', type: 'sets', exerciseRef: { exerciseId: 'pullup', stepNumber: 1 }, prescription: { sets: 3, repsRange: [5, 10], restSec: 120 } },
          { id: 'b3', type: 'sets', exerciseRef: { exerciseId: 'bridge', stepNumber: 1 }, prescription: { sets: 2, repsRange: [8, 12], restSec: 90 } },
        ],
      },
    ],
  },
  {
    id: 'full-example',
    name: 'Full Body (Example)',
    daysPerWeek: 3,
    sessions: [
      {
        id: 'F1',
        title: 'Full Body Session',
        blocks: [
          { id: 'f1', type: 'sets', exerciseRef: { exerciseId: 'pushup', stepNumber: 1 }, prescription: { sets: 3, repsRange: [6, 12], restSec: 90 } },
          { id: 'f2', type: 'sets', exerciseRef: { exerciseId: 'squat', stepNumber: 1 }, prescription: { sets: 3, repsRange: [10, 15], restSec: 90 } },
          { id: 'f3', type: 'sets', exerciseRef: { exerciseId: 'pullup', stepNumber: 1 }, prescription: { sets: 2, repsRange: [5, 8], restSec: 120 } },
        ],
      },
    ],
  },
];
