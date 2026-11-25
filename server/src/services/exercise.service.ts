import {
  MovementFocus,
  MuscleCategory,
  Prisma,
} from "../generated/prisma/client.js";
import { prisma } from "../loaders/prisma.js";

export interface ListExercisesParams {
  userId?: string;
  q?: string;
  category?: MuscleCategory;
  movementFocus?: MovementFocus;
  scope?: "all" | "global" | "custom";
}

export async function listExercises(params: ListExercisesParams) {
  const { userId, q, category, movementFocus, scope = "all" } = params;

  const ownershipFilter: Prisma.ExerciseWhereInput =
    scope === "global"
      ? { userId: null }
      : scope === "custom"
        ? userId
          ? { userId }
          : { id: "__none__" }
        : userId
          ? { OR: [{ userId: null }, { userId }] }
          : { userId: null };

  return prisma.exercise.findMany({
    where: {
      AND: [
        ownershipFilter,
        category ? { category } : {},
        movementFocus ? { movementFocus } : {},
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}
