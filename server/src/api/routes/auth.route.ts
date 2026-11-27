import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { validate } from "../middlewares/validate";
import {
  loginUser,
  logoutToken,
  registerUser,
} from "../../services/auth.service";
import { isAuth } from "../middlewares/isAuth";
import { AVATAR_IDS } from "../../constants/avatars";
import { handleAuthError } from "../../utils/handleAuthError";

const registerSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required")
    .regex(/[^A-Za-z0-9]/, "At least one special character required"),
  name: z.string().trim().min(1).max(100),
  avatarId: z.enum(AVATAR_IDS).optional(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const route = Router();
export const authRouter = route;

export default (app: Router) => {
  app.use("/auth", route);

route.post(
  "/register",
  validate(registerSchema),
  async (req, res, next) => {
    try {
      const result = await registerUser(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      handleAuthError(error, res, next);
    }
  },
);

route.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await loginUser(req.body);
      res.status(200).json({ data: result });
    } catch (error) {
      handleAuthError(error, res, next);
    }
  },
);

route.post(
  "/logout",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.auth) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      await logoutToken(req.auth.jti, req.auth.exp);
      res.status(200).json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  },
);
};
