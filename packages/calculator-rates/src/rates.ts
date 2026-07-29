/**
 * ⚠️ PLACEHOLDER RATES — DO NOT SHIP OR QUOTE THESE TO A REAL BUYER.
 *
 * This file exists so the *shape* of the calculator (age brackets, engine-volume
 * brackets, util-fee brackets, versioning) is correct from day one. The actual
 * numeric rates must be verified against the current Федеральная таможенная
 * служба (ФТС) schedule and the utilisation-fee (утильсбор) resolution in force
 * at build time — these change periodically and are NOT safe to hardcode from
 * training data. When we reach Module 3 (calculator), re-derive these via a
 * web search against ФТС / consultant.ru / garant.ru current sources, then bump
 * `version` and `effectiveFrom` below.
 *
 * The UI MUST surface `DISCLAIMER` next to any calculated total.
 */

export const DISCLAIMER =
  "Расчёт ориентировочный и не является офертой. Актуальные ставки таможенных " +
  "платежей и утилизационного сбора уточняйте у таможенного брокера или на " +
  "сайте ФТС России. AutoBring не оказывает юридических и финансовых консультаций.";

export interface AgeBracket {
  /** inclusive lower bound in years, e.g. 3 means "3 to <5 years old" */
  minAgeYears: number;
  /** exclusive upper bound, null = no upper bound */
  maxAgeYears: number | null;
  /** duty as a rate per cm³ of engine volume, in EUR (placeholder unit, verify) */
  ratePerCcEur: number;
  /** alternative: percentage-of-value based duty, used for newest brackets */
  percentOfValue: number | null;
  minPercentRatePerCcEur: number | null;
}

export interface UtilFeeBracket {
  maxEngineCc: number | null; // null = no upper bound within this bracket set
  baseRateRub: number; // "базовая ставка" util fee before coefficient
  coefficientNew: number; // engine/vehicle < 3 years
  coefficientUsed: number; // >= 3 years
}

export const RATES_VERSION = "2026.07-placeholder";
export const EFFECTIVE_FROM = "2026-07-27";

/** Age-based duty brackets for individuals importing for personal use (physical persons). */
export const AGE_DUTY_BRACKETS: AgeBracket[] = [
  { minAgeYears: 0, maxAgeYears: 3, ratePerCcEur: 0, percentOfValue: 48, minPercentRatePerCcEur: 2.5 },
  { minAgeYears: 3, maxAgeYears: 5, ratePerCcEur: 1.5, percentOfValue: null, minPercentRatePerCcEur: null },
  { minAgeYears: 5, maxAgeYears: 7, ratePerCcEur: 3.0, percentOfValue: null, minPercentRatePerCcEur: null },
  { minAgeYears: 7, maxAgeYears: null, ratePerCcEur: 3.6, percentOfValue: null, minPercentRatePerCcEur: null },
];

/** Utilisation fee (утильсбор) brackets — base rate is a fixed statutory figure, multiplied by a coefficient. */
export const UTIL_FEE_BRACKETS: UtilFeeBracket[] = [
  { maxEngineCc: 1000, baseRateRub: 20000, coefficientNew: 0.17, coefficientUsed: 0.26 },
  { maxEngineCc: 2000, baseRateRub: 20000, coefficientNew: 0.17, coefficientUsed: 0.26 },
  { maxEngineCc: 3000, baseRateRub: 20000, coefficientNew: 0.17, coefficientUsed: 0.26 },
  { maxEngineCc: null, baseRateRub: 20000, coefficientNew: 0.17, coefficientUsed: 0.26 },
];

/** Flat estimate for logistics (sea/rail leg) by source country, in RUB — placeholder, refine with real quotes later. */
export const LOGISTICS_FLAT_RUB: Record<"JP" | "KR" | "CN", number> = {
  JP: 150000,
  KR: 120000,
  CN: 90000,
};

/** Flat service fee (brokerage/agent commission), placeholder. */
export const SERVICE_FEE_RUB = 60000;
