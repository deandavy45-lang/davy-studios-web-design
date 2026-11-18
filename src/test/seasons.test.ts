import { describe, expect, it } from "vitest";
import { getSeason, johannesburgToday } from "@/lib/seasons";

describe("seasonal auto-adapt", () => {
  it("uses Red-Letter Calm Mode on an ordinary Sunday", () => {
    expect(getSeason(2026, 11, 22).mode).toBe("sunday");
  });
  it("stays in everyday mode on a normal weekday", () => {
    expect(getSeason(2026, 11, 18).mode).toBe("none");
  });
  it("shows Heritage Day warmth on 24 September", () => {
    expect(getSeason(2026, 9, 24).mode).toBe("heritage");
  });
  it("shows festive champagne on Christmas Day", () => {
    expect(getSeason(2026, 12, 25).mode).toBe("festive");
  });
  it("festive season beats Sunday in late December", () => {
    expect(getSeason(2026, 12, 20).mode).toBe("festive");
  });
  it("knows Good Friday and Family Day move with Easter", () => {
    expect(getSeason(2026, 4, 3).label).toBe("Good Friday");
    expect(getSeason(2026, 4, 6).label).toBe("Family Day");
  });
  it("observes a Sunday holiday on the Monday", () => {
    expect(getSeason(2025, 4, 28).label).toBe("Freedom Day (observed)");
  });
  it("reads the date in Johannesburg time", () => {
    // 23:30 UTC on 23 Sep is already Heritage Day in Cape Town
    expect(johannesburgToday(new Date("2026-09-23T23:30:00Z"))).toEqual({ year: 2026, month: 9, day: 24 });
  });
});
