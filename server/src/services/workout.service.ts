import { prisma } from "../loaders/prisma";

export interface WorkoutExerciseInput {
  exerciseId?: string;
  name?: string;
  sets: number;
  reps: number;
  weight: number;
  restSeconds?: number | null;
  sortOrder?: number;
}

export interface CreateWorkoutInput {
  userId: string;
  title: string;
  scheduledAt: Date;
  comments?: string | null;
  exercises: WorkoutExerciseInput[];
}

export interface UpdateWorkoutInput {
  title?: string;
  scheduledAt?: Date;
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
  comments?: string | null;
  exercises?: WorkoutExerciseInput[];
}

const resolveWorkoutExercises = async (
  userId: string,
  exercises: WorkoutExerciseInput[],
) => {
  const exerciseIds = [
    ...new Set(
      exercises.flatMap((exercise) =>
        exercise.exerciseId ? [exercise.exerciseId] : [],
      ),
    ),
  ];

  const catalogExercises = exerciseIds.length
    ? await prisma.exercise.findMany({
        where: {
          id: { in: exerciseIds },
          OR: [{ userId: null }, { userId }],
        },
        select: { id: true, name: true },
      })
    : [];

  if (catalogExercises.length !== exerciseIds.length) return null;

  const namesById = new Map(
    catalogExercises.map((exercise) => [exercise.id, exercise.name]),
  );

  return exercises.map((exercise, index) => ({
    exerciseId: exercise.exerciseId ?? null,
    exerciseName: exercise.exerciseId
      ? namesById.get(exercise.exerciseId)!
      : exercise.name!,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
    restSeconds: exercise.restSeconds,
    sortOrder: exercise.sortOrder ?? index,
  }));
};

const workoutDetails = {
  workoutExercises: {
    orderBy: { sortOrder: "asc" as const },
    include: { exercise: true },
  },
};

export const createWorkout = async (input: CreateWorkoutInput) => {
  const exercises = await resolveWorkoutExercises(input.userId, input.exercises);
  if (!exercises) return null;

  return prisma.workout.create({
    data: {
      userId: input.userId,
      title: input.title,
      scheduledAt: input.scheduledAt,
      comments: input.comments,
      workoutExercises: { create: exercises },
    },
    include: workoutDetails,
  });
};

export const getWorkoutsForUser = async (userId: string) => {
  return prisma.workout.findMany({
    where: { userId, status: "PENDING" },
    orderBy: { scheduledAt: "asc" },
    include: workoutDetails,
  });
};

export const getWorkoutForUser = async (userId: string, workoutId: string) => {
  return prisma.workout.findFirst({
    where: { id: workoutId, userId },
    include: workoutDetails,
  });
};

export const updateWorkoutForUser = async (
  userId: string,
  workoutId: string,
  input: UpdateWorkoutInput,
) => {
  const exercises =
    input.exercises === undefined
      ? undefined
      : await resolveWorkoutExercises(userId, input.exercises);
  if (exercises === null) return { kind: "invalid_exercises" as const };

  return prisma.$transaction(async (tx) => {
    const existing = await tx.workout.findFirst({
      where: { id: workoutId, userId },
      select: { id: true },
    });
    if (!existing) return { kind: "not_found" as const };

    const updateData = {
      title: input.title,
      scheduledAt: input.scheduledAt,
      status: input.status,
      comments: input.comments,
    };
    await tx.workout.update({ where: { id: workoutId }, data: updateData });

    if (exercises !== undefined) {
      await tx.workoutExercise.deleteMany({ where: { workoutId } });
      if (exercises.length > 0) {
        await tx.workoutExercise.createMany({
          data: exercises.map((exercise) => ({ workoutId, ...exercise })),
        });
      }
    }

    const workout = await tx.workout.findUnique({
      where: { id: workoutId },
      include: workoutDetails,
    });
    return { kind: "ok" as const, workout };
  });
};

export const deleteWorkoutForUser = async (userId: string, workoutId: string) => {
  const result = await prisma.workout.deleteMany({
    where: { id: workoutId, userId },
  });
  return result.count > 0;
};
