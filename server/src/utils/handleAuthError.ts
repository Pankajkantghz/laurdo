import { NextFunction, Response } from "express";
import { AuthError } from "../services/auth.service";

export const handleAuthError = (
  error: unknown,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  next(error);
};
