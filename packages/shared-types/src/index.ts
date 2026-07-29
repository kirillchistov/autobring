// Core domain types shared between apps/web (Next.js) and apps/api (Express).
// Keep these framework-agnostic — no React, no Express types here.

export type SourceCountry = "JP" | "KR" | "CN";

export type Currency = "JPY" | "KRW" | "CNY" | "RUB";

export type DriveType = "2WD" | "4WD" | "AWD";

export type Transmission = "AT" | "MT" | "CVT";

/** A single vehicle listing (synthetic data in the learning build). */
export interface Car {
  id: string;
  sourceCountry: SourceCountry;
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  engineCc: number;
  transmission: Transmission;
  driveType: DriveType;
  /** Japanese-auction-style condition grade, 0-5, half-steps allowed. Null for KR/CN listings that don't use this scale. */
  auctionGrade: number | null;
  auctionDate: string | null; // ISO date, null if not auction-sourced
  basePrice: number;
  currency: Currency;
  photos: string[]; // paths/urls to SVG or stock placeholders
  auctionSheetUrl: string | null;
  createdAt: string;
}

export interface PriceCalculationInput {
  carId?: string;
  sourceCountry: SourceCountry;
  engineCc: number;
  ageYears: number; // computed from year at calculation time
  basePrice: number;
  currency: Currency;
  fxRateToRub: number;
}

export interface PriceCalculationResult {
  customsDuty: number;
  utilFee: number;
  logisticsCost: number;
  serviceFee: number;
  totalRub: number;
  ratesVersion: string; // ties back to packages/calculator-rates config version
  disclaimer: string;
}

export type DealStatus =
  | "draft"
  | "bidding"
  | "purchased"
  | "shipped"
  | "customs"
  | "ready"
  | "delivered";

export interface DealStatusHistoryEntry {
  status: DealStatus;
  changedAt: string;
  note?: string;
}

export interface Deal {
  id: string;
  userId: string;
  carId: string | null;
  status: DealStatus;
  statusHistory: DealStatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "buyer" | "admin";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  createdAt: string;
}

export interface Favorite {
  userId: string;
  carId: string;
  createdAt: string;
}

export interface AlertFilter {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceToRub?: number;
  sourceCountry?: SourceCountry;
}

export interface Alert {
  id: string;
  userId: string;
  filters: AlertFilter;
  notifyChannel: "email" | "telegram";
  createdAt: string;
}
