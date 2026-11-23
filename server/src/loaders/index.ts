import type { Express } from "express";
import { initExpress } from "./express";
import { connectDatabase } from "./prisma";

export const initLoaders = async (app: Express): Promise<void> => {
  await connectDatabase();
  initExpress(app);
};
