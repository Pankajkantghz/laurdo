import express from "express";
import { config } from "./config";
import { initLoaders } from "./loaders";


async function startServer(): Promise<void> {
  const app = express();
  await initLoaders(app);

  app.listen(config.port, () => {
    console.log(
      `Server running on http://localhost:${config.port}${config.apiPrefix}`,
    );
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
