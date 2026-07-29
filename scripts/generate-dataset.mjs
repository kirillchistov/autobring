// Generates a synthetic car dataset for AutoBring — no scraped text/photos,
// just neutral factual make/model combinations (public knowledge, not
// copyrightable) with randomized but plausible specs.
//
// Run: node scripts/generate-dataset.mjs
// Output: packages/mock-data/cars.json

import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "packages", "mock-data");
const outFile = path.join(outDir, "cars.json");

const JP_MODELS = [
  ["Toyota", "Sienta"], ["Toyota", "Raize"], ["Toyota", "Corolla Fielder"],
  ["Toyota", "Aqua"], ["Toyota", "Yaris Cross"], ["Toyota", "Roomy"],
  ["Honda", "Freed"], ["Honda", "Fit"], ["Honda", "Vezel"], ["Honda", "N-Box"],
  ["Nissan", "Note"], ["Nissan", "X-Trail"], ["Nissan", "Dayz"],
  ["Mazda", "CX-3"], ["Mazda", "Demio"], ["Mazda", "CX-5"],
  ["Suzuki", "Jimny"], ["Suzuki", "Hustler"], ["Suzuki", "Swift"],
  ["Subaru", "Forester"], ["Subaru", "XV"],
  ["Mitsubishi", "RVR"], ["Mitsubishi", "Delica D:5"],
  ["Daihatsu", "Taft"], ["Daihatsu", "Rocky"],
];

const KR_MODELS = [
  ["Hyundai", "Avante"], ["Hyundai", "Tucson"], ["Hyundai", "Sonata"], ["Hyundai", "Kona"],
  ["Kia", "K5"], ["Kia", "Seltos"], ["Kia", "Sportage"], ["Kia", "Morning"],
  ["KG Mobility", "Tivoli"], ["Chevrolet", "Trailblazer"],
];

const CN_MODELS = [
  ["Chery", "Tiggo 7"], ["Chery", "Tiggo 8"], ["Geely", "Binyue"],
  ["Haval", "H6"], ["Jetour", "X70"], ["Toyota", "Levin"],
  ["Volkswagen", "Lavida"], ["Volkswagen", "Tharu"], ["BMW", "X1"], ["Audi", "Q3"],
];

const TRANSMISSIONS = ["AT", "CVT", "MT"];
const DRIVE_TYPES = ["2WD", "4WD", "AWD"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function svgPlaceholder(make, model, seedColor) {
  // Simple deterministic-ish SVG car silhouette placeholder, no external assets.
  return (
    `data:image/svg+xml;utf8,` +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">` +
        `<rect width="400" height="260" fill="#F1EFEA"/>` +
        `<g fill="${seedColor}">` +
        `<rect x="60" y="140" width="280" height="50" rx="14"/>` +
        `<rect x="100" y="105" width="200" height="45" rx="12"/>` +
        `<circle cx="120" cy="195" r="22" fill="#2B2B2B"/>` +
        `<circle cx="280" cy="195" r="22" fill="#2B2B2B"/>` +
        `</g>` +
        `<text x="200" y="235" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B6558">${make} ${model}</text>` +
        `</svg>`
    )
  );
}

function buildCar(sourceCountry, [make, model], colorPalette) {
  const year = randomInt(2015, 2026);
  const ageYears = 2026 - year;
  const engineCc = pick([660, 1000, 1200, 1500, 1800, 2000, 2500]);
  const mileageKm = randomInt(3000, 120000);
  const grade = sourceCountry === "JP" ? Math.round((3 + Math.random() * 2) * 2) / 2 : null;
  const basePriceByCountry = {
    JP: randomInt(400000, 2500000), // JPY
    KR: randomInt(8000000, 35000000), // KRW
    CN: randomInt(60000, 220000), // CNY
  };
  const currencyByCountry = { JP: "JPY", KR: "KRW", CN: "CNY" };

  return {
    id: randomUUID(),
    sourceCountry,
    make,
    model,
    year,
    mileageKm,
    engineCc,
    transmission: pick(TRANSMISSIONS),
    driveType: pick(DRIVE_TYPES),
    auctionGrade: grade,
    auctionDate: sourceCountry === "JP" ? new Date(2026, randomInt(0, 6), randomInt(1, 28)).toISOString() : null,
    basePrice: basePriceByCountry[sourceCountry],
    currency: currencyByCountry[sourceCountry],
    photos: [svgPlaceholder(make, model, pick(colorPalette))],
    auctionSheetUrl: null,
    createdAt: new Date().toISOString(),
    _ageYearsAtGeneration: ageYears,
  };
}

const PALETTE = ["#8C7A63", "#4C6B5C", "#7A5C4C", "#5C6B7A", "#6B5C7A"];

const cars = [
  ...Array.from({ length: 120 }, () => buildCar("JP", pick(JP_MODELS), PALETTE)),
  ...Array.from({ length: 60 }, () => buildCar("KR", pick(KR_MODELS), PALETTE)),
  ...Array.from({ length: 60 }, () => buildCar("CN", pick(CN_MODELS), PALETTE)),
];

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(cars, null, 2), "utf-8");
console.log(`Generated ${cars.length} listings -> ${path.relative(process.cwd(), outFile)}`);
