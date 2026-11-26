import { config } from "../config";
import { prisma } from "../loaders/prisma.js";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

const signToken = (userId: string): string => {
  const jti = crypto.randomUUID();
  return jwt.sign({ sub: userId, jti }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
  });
};
export const registerUser = async (input: {
  email: string;
  password: string;
  name: string;
}) => {
  const email = input.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AuthError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: input.name,
      
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  const token = signToken(user.id);
  return { user, token };
};

export const loginUser = async (input: { email: string; password: string }) => {
  const email = input.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new AuthError(401, "Invalid email or password");
  }

  const token = signToken(user.id);
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const authenticateToken = async (token: string) => {
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError(401, "Invalid or expired token");
    }
    throw error;
  }

  if (
    typeof decoded.sub !== "string" ||
    typeof decoded.jti !== "string" ||
    typeof decoded.exp !== "number"
  ) {
    throw new AuthError(401, "Invalid token");
  }

  const revoked = await prisma.tokenDenylist.findUnique({
    where: { jti: decoded.jti },
  });

  if (revoked && revoked.expiresAt > new Date()) {
    throw new AuthError(401, "Token has been revoked");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AuthError(401, "Unauthorized");
  }

  return {
    user,
    auth: {
      userId: user.id,
      jti: decoded.jti,
      exp: decoded.exp,
    },
  };
};

export const logoutToken = async (jti: string, exp: number): Promise<void> => {
  const expiresAt = new Date(exp * 1000);
  if (expiresAt > new Date()) {
    await prisma.tokenDenylist.upsert({
      where: { jti },
      update: { expiresAt },
      create: { jti, expiresAt },
    });
  }
};
