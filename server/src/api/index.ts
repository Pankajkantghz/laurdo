import { Router } from "express";
import exercises from "./routes/exercise";

export default () => {
  const api = Router();
  exercises(api);

  return api;
};
