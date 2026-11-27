import { Router } from "express";
import auth from "./routes/auth.route";
import exercises from "./routes/exercise";

export default () => {
  const api = Router();
  auth(api);
  exercises(api);

  return api;
};
