import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../../middleware/require-auth";

export const dealsRouter = Router();

// TODO(Sprint 7 — auth + deal timeline module): back these with Prisma once
// the User/Deal tables are migrated. For now this documents the intended
// contract so apps/web can be built against it with a mock adapter.

dealsRouter.get("/mine", requireAuth, (req: AuthedRequest, res) => {
  return res.json({ userId: req.userId, deals: [] });
});

dealsRouter.post("/", requireAuth, (req: AuthedRequest, res) => {
  return res.status(201).json({ id: "temp-deal-id", userId: req.userId, status: "draft" });
});
