import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

// NOTE: swap this in-memory placeholder for `new PrismaClient()` once
// `prisma generate` has been run against a real DATABASE_URL (Sprint 0
// leaves the DB unprovisioned so the scaffold works before you wire infra).
const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_DAYS = 30;

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret-change-me";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change-me";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  // TODO(Sprint 1): prisma.user.create({ data: { ...parsed.data, passwordHash } })
  // and handle the unique-email conflict (409) instead of this placeholder.
  const fakeUser = {
    id: "temp-id",
    name: parsed.data.name,
    email: parsed.data.email,
    role: "buyer" as const,
  };
  void passwordHash;
  return res.status(201).json({ user: fakeUser });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  // TODO(Sprint 1): look up user by email, bcrypt.compare(password, user.passwordHash)
  const userId = "temp-id";

  const accessToken = jwt.sign({ sub: userId, role: "buyer" }, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  const refreshToken = jwt.sign({ sub: userId }, REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d`,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  });

  return res.json({ accessToken });
});

authRouter.post("/refresh", (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: "no refresh token" });
  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as { sub: string };
    const accessToken = jwt.sign({ sub: payload.sub, role: "buyer" }, ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
    });
    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: "invalid refresh token" });
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("refresh_token");
  return res.status(204).send();
});
