import { describe, expect, it } from "vitest";
import { calculatePriceEstimate } from "./index";

describe("calculatePriceEstimate", () => {
  it("returns a positive total and echoes the rates version + disclaimer", () => {
    const result = calculatePriceEstimate({
      sourceCountry: "JP",
      engineCc: 1500,
      ageYears: 4,
      basePrice: 1_200_000, // JPY
      currency: "JPY",
      fxRateToRub: 0.65,
    });

    expect(result.totalRub).toBeGreaterThan(0);
    expect(result.disclaimer.length).toBeGreaterThan(0);
    expect(result.ratesVersion).toContain("effective");
  });

  it("applies the newest-age (0-3y) percent-of-value bracket differently from an older bracket", () => {
    const young = calculatePriceEstimate({
      sourceCountry: "JP",
      engineCc: 2000,
      ageYears: 1,
      basePrice: 2_000_000,
      currency: "JPY",
      fxRateToRub: 0.65,
    });
    const old = calculatePriceEstimate({
      sourceCountry: "JP",
      engineCc: 2000,
      ageYears: 8,
      basePrice: 2_000_000,
      currency: "JPY",
      fxRateToRub: 0.65,
    });

    expect(young.customsDuty).not.toEqual(old.customsDuty);
  });
});
