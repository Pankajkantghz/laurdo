import { Router } from "express";
import { z } from "zod";
import { listExercises } from "../../services/exercise.service.js";

const listExercisesQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  category: z
    .enum([
      "CHEST",
      "SHOULDER",
      "BACK",
      "LEG",
      "BICEPS_TRICEPS",
      "ABS",
      "FOREARMS",
      "CARDIO",
      "FLEXIBILITY",
      "OTHER",
    ])
    .optional(),
  movementFocus: z
    .enum([
      "BENCH_PRESS",
      "DEADLIFT",
      "BACK_SQUAT",
      "SNATCH",
      "CLEAN_AND_JERK",
      "OTHER",
    ])
    .optional(),
  scope: z.enum(["all", "global", "custom"]).default("all"),
});

export const exercisesRouter = Router();

exercisesRouter.get("/", async (req, res, next) => {
  try {
    const query = listExercisesQuerySchema.parse(req.query);
    const exercises = await listExercises({
      userId: req.user?.id,
      ...query,
    });

    res.json({ data: exercises });
  } catch (err) {
    next(err);
  }
});
