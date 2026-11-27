import { Router } from "express";
import auth from "./routes/auth.route";
import exercises from "./routes/exercise.route";
import workouts from "./routes/workout.route";

export default () => {
  const api = Router();
  auth(api);
  exercises(api);
  workouts(api);

  return api;
};
