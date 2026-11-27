-- CreateTable
CREATE TABLE "daily_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "calories" INTEGER NOT NULL DEFAULT 0,
    "protein" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "carbs" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "fat" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "fibre" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "water_ml" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "distance_km" DECIMAL(6,2) NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "calories_burned" INTEGER,
    "ran_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_logs_user_id_date_key" ON "daily_logs"("user_id", "date");

-- CreateIndex
CREATE INDEX "runs_user_id_ran_at_idx" ON "runs"("user_id", "ran_at");

-- AddForeignKey
ALTER TABLE "daily_logs" ADD CONSTRAINT "daily_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runs" ADD CONSTRAINT "runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
