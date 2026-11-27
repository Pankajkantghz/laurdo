ALTER TABLE "workout_exercises"
ADD COLUMN "exercise_name" TEXT;

UPDATE "workout_exercises" AS workout_exercise
SET "exercise_name" = exercise."name"
FROM "exercises" AS exercise
WHERE workout_exercise."exercise_id" = exercise."id";

ALTER TABLE "workout_exercises"
ALTER COLUMN "exercise_name" SET NOT NULL;

ALTER TABLE "workout_exercises"
ALTER COLUMN "exercise_id" DROP NOT NULL;

ALTER TABLE "workout_exercises"
DROP CONSTRAINT "workout_exercises_exercise_id_fkey";

ALTER TABLE "workout_exercises"
ADD CONSTRAINT "workout_exercises_exercise_id_fkey"
FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
