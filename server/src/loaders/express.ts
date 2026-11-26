import express, { Express, NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { config } from "../config";
import { exercisesRouter } from "../api/routes/exercise";
import { authRouter } from "../api/routes/auth.route";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const initExpress = (app: Express): Express => {
  app.use(express.json());

  app.get(`${config.apiPrefix}/health`, (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use(`${config.apiPrefix}`, authRouter);

  app.use(`${config.apiPrefix}/exercises`, exercisesRouter);

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Not found", 404));
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: z.treeifyError(err),
      });
      return;
    }

    if (err instanceof AppError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
};
