import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { isAuth } from "../middlewares/isAuth";
import {
  createWorkout,
  deleteWorkoutForUser,
  getWorkoutForUser,
  getWorkoutsForUser,
  updateWorkoutForUser,
} from "../../services/workout.service";

const workoutExerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  sets: z.number().int().min(1),
  reps: z.number().int().min(1),
  weight: z.coerce.number().min(0).max(9999.99),
  restSeconds: z.number().int().min(0).nullable().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

const createWorkoutSchema = z.object({
  title: z.string().trim().min(1).max(200),
  scheduledAt: z.coerce.date(),
  comments: z.string().trim().max(2000).nullable().optional(),
  exercises: z.array(workoutExerciseSchema).default([]),
});

const updateWorkoutSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    scheduledAt: z.coerce.date(),
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
    comments: z.string().trim().max(2000).nullable(),
    exercises: z.array(workoutExerciseSchema),
  })
  .partial();

const getAuthenticatedUserId = (
  req: Request,
  res: Response,
): string | null => {
  const userId = req.user?.id ?? req.auth?.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
  return userId;
};

const getWorkoutId = (req: Request, res: Response): string | null => {
  const id = req.params.id;
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success) {
    res.status(400).json({ message: "Invalid workout ID" });
    return null;
  }
  return id;
};

export default (app: Router) => {
  const route = Router();
  app.use("/workouts", route);

  route.post(
    "/",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = getAuthenticatedUserId(req, res);
        if (!userId) return;

        const parsed = createWorkoutSchema.safeParse(req.body);
        if (!parsed.success) {
          res.status(400).json({
            message: "Validation failed",
            errors: z.treeifyError(parsed.error),
          });
          return;
        }

        const workout = await createWorkout({ userId, ...parsed.data });
        if (!workout) {
          res
            .status(400)
            .json({ message: "One or more exercises are unavailable" });
          return;
        }

        res.status(201).json({ data: workout });
      } catch (error) {
        next(error);
      }
    },
  );

  route.get(
    "/",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = getAuthenticatedUserId(req, res);
        if (!userId) return;

        const workouts = await getWorkoutsForUser(userId);
        res.json({ data: workouts });
      } catch (error) {
        next(error);
      }
    },
  );

  route.get(
    "/:id",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = getAuthenticatedUserId(req, res);
        if (!userId) return;

        const workoutId = getWorkoutId(req, res);
        if (!workoutId) return;

        const workout = await getWorkoutForUser(userId, workoutId);
        if (!workout) {
          res.status(404).json({ message: "Workout not found" });
          return;
        }

        res.json({ data: workout });
      } catch (error) {
        next(error);
      }
    },
  );

  route.patch(
    "/:id",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = getAuthenticatedUserId(req, res);
        if (!userId) return;

        const workoutId = getWorkoutId(req, res);
        if (!workoutId) return;

        const parsed = updateWorkoutSchema.safeParse(req.body);
        if (!parsed.success) {
          res.status(400).json({
            message: "Validation failed",
            errors: z.treeifyError(parsed.error),
          });
          return;
        }

        const result = await updateWorkoutForUser(
          userId,
          workoutId,
          parsed.data,
        );
        if (result.kind === "not_found") {
          res.status(404).json({ message: "Workout not found" });
          return;
        }
        if (result.kind === "invalid_exercises") {
          res
            .status(400)
            .json({ message: "One or more exercises are unavailable" });
          return;
        }

        res.json({ data: result.workout });
      } catch (error) {
        next(error);
      }
    },
  );

  route.delete(
    "/:id",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = getAuthenticatedUserId(req, res);
        if (!userId) return;

        const workoutId = getWorkoutId(req, res);
        if (!workoutId) return;

        const deleted = await deleteWorkoutForUser(userId, workoutId);
        if (!deleted) {
          res.status(404).json({ message: "Workout not found" });
          return;
        }

        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  );
};
