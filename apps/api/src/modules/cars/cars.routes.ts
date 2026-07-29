import { calculatePriceEstimate } from "@autobring/calculator-rates";
import { Router } from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Sprint 0: serve the generated synthetic dataset straight from disk.
// Sprint 1 swaps this for `prisma.car.findMany({ where: ... })`.
const datasetPath = fileURLToPath(
  new URL("../../../../../packages/mock-data/cars.json", import.meta.url)
);

function loadCars() {
  try {
    return JSON.parse(readFileSync(datasetPath, "utf-8"));
  } catch {
    return [];
  }
}

export const carsRouter = Router();

const listQuerySchema = z.object({
  sourceCountry: z.enum(["JP", "KR", "CN"]).optional(),
  make: z.string().optional(),
  yearFrom: z.coerce.number().optional(),
  yearTo: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().max(50).default(20),
});

carsRouter.get("/", (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { sourceCountry, make, yearFrom, yearTo, page, pageSize } = parsed.data;

  let cars = loadCars();
  if (sourceCountry) cars = cars.filter((c: any) => c.sourceCountry === sourceCountry);
  if (make) cars = cars.filter((c: any) => c.make.toLowerCase() === make.toLowerCase());
  if (yearFrom) cars = cars.filter((c: any) => c.year >= yearFrom);
  if (yearTo) cars = cars.filter((c: any) => c.year <= yearTo);

  const start = (page - 1) * pageSize;
  const items = cars.slice(start, start + pageSize);

  return res.json({ items, total: cars.length, page, pageSize });
});

const calcSchema = z.object({
  carId: z.string().optional(),
  sourceCountry: z.enum(["JP", "KR", "CN"]),
  engineCc: z.number().positive(),
  ageYears: z.number().min(0),
  basePrice: z.number().positive(),
  currency: z.enum(["JPY", "KRW", "CNY", "RUB"]),
  fxRateToRub: z.number().positive(),
});

// POST /calculate must be declared before GET /:id so Express doesn't treat
// the literal "calculate" as a dynamic :id parameter.
carsRouter.post("/calculate", (req, res) => {
  const parsed = calcSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const result = calculatePriceEstimate(parsed.data);
  return res.json(result);
});

carsRouter.get("/:id", (req, res) => {
  const cars = loadCars();
  const car = cars.find((c: any) => c.id === req.params.id);
  if (!car) return res.status(404).json({ error: "not found" });
  return res.json(car);
});
