import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: z.treeifyError(parsed.error),
      });
      return;
    }
    req.body = parsed.data;
    next();
  };
