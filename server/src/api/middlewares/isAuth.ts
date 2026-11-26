import { NextFunction, Request, Response } from "express";
import { authenticateToken } from "../../services/auth.service";
import { handleAuthError } from "../../utils/handleAuthError";


export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const header = req.header("authorization");
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = header.slice(7).trim();
    const { user, auth } = await authenticateToken(token);

    req.user = user;
    req.auth = auth;
    next();
  } catch (error) {
    handleAuthError(error, res, next);
  }
};
