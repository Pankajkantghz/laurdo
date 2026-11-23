import dotenv from "dotenv";
dotenv.config();
const requireEnv = ["DATABASE_URL", "JWT_SECRET"] as const;

for (const key of requireEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  apiPrefix: "/api",
};
