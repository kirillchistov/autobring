import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { carsRouter } from "./modules/cars/cars.routes";
import { dealsRouter } from "./modules/deals/deals.routes";

const app = express();

app.use(
  cors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/cars", carsRouter);
app.use("/deals", dealsRouter);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`autobring api listening on :${port}`);
});
