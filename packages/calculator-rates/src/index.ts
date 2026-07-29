import type {
  PriceCalculationInput,
  PriceCalculationResult,
  SourceCountry,
} from "@autobring/shared-types";
import {
  AGE_DUTY_BRACKETS,
  DISCLAIMER,
  EFFECTIVE_FROM,
  LOGISTICS_FLAT_RUB,
  RATES_VERSION,
  SERVICE_FEE_RUB,
  UTIL_FEE_BRACKETS,
} from "./rates";

export * from "./rates";

const EUR_TO_RUB_FALLBACK = 100; // TODO: replace with live FX rate lookup in Module 3/4

function findAgeBracket(ageYears: number) {
  return (
    AGE_DUTY_BRACKETS.find(
      (b) => ageYears >= b.minAgeYears && (b.maxAgeYears === null || ageYears < b.maxAgeYears)
    ) ?? AGE_DUTY_BRACKETS[AGE_DUTY_BRACKETS.length - 1]
  );
}

function findUtilBracket(engineCc: number) {
  return (
    UTIL_FEE_BRACKETS.find((b) => b.maxEngineCc === null || engineCc <= b.maxEngineCc) ??
    UTIL_FEE_BRACKETS[UTIL_FEE_BRACKETS.length - 1]
  );
}

/**
 * Pure, side-effect-free calculation. Given a car's basics and an FX snapshot,
 * returns an itemised, ruble-denominated estimate. Safe to unit test directly
 * (see Module 9 — testing) without any React/HTTP concerns.
 */
export function calculatePriceEstimate(
  input: PriceCalculationInput
): PriceCalculationResult {
  const { engineCc, ageYears, basePrice, currency, fxRateToRub, sourceCountry } = input;

  const ageBracket = findAgeBracket(ageYears);
  // basePrice is in foreign currency; convert to RUB first, then to EUR.
  const basePriceInRub = currency === "RUB" ? basePrice : basePrice * fxRateToRub;
  const dutyEur =
    ageBracket.percentOfValue !== null
      ? Math.max(
          (basePriceInRub * (ageBracket.percentOfValue / 100)) / EUR_TO_RUB_FALLBACK,
          (ageBracket.minPercentRatePerCcEur ?? 0) * engineCc
        )
      : ageBracket.ratePerCcEur * engineCc;
  const customsDuty = Math.round(dutyEur * EUR_TO_RUB_FALLBACK);

  const utilBracket = findUtilBracket(engineCc);
  const utilCoefficient = ageYears < 3 ? utilBracket.coefficientNew : utilBracket.coefficientUsed;
  const utilFee = Math.round(utilBracket.baseRateRub * utilCoefficient);

  const logisticsCost =
    LOGISTICS_FLAT_RUB[sourceCountry as SourceCountry] ?? LOGISTICS_FLAT_RUB.JP;

  const serviceFee = SERVICE_FEE_RUB;

  const totalRub = Math.round(
    basePriceInRub + customsDuty + utilFee + logisticsCost + serviceFee
  );

  return {
    customsDuty,
    utilFee,
    logisticsCost,
    serviceFee,
    totalRub,
    ratesVersion: `${RATES_VERSION} (effective ${EFFECTIVE_FROM})`,
    disclaimer: DISCLAIMER,
  };
}
