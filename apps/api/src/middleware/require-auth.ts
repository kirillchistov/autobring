import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret-change-me";

export interface AuthedRequest extends Request {
  userId?: string;
  role?: "buyer" | "admin";
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing access token" });
  }
  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as { sub: string; role: "buyer" | "admin" };
    req.userId = payload.sub;
    req.role = payload.role;
    return next();
  } catch {
    return res.status(401).json({ error: "invalid or expired access token" });
  }
}
