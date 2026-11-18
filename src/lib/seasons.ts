export type SeasonMode = "none" | "sunday" | "heritage" | "festive" | "holiday";

export interface SeasonInfo {
  mode: SeasonMode;
  label: string;
  detail: string;
}

interface Holiday {
  month: number;
  day: number;
  name: string;
}

/** Easter Sunday (Gregorian, anonymous algorithm). Month is 1-12. */
export function easterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

function shift(year: number, month: number, day: number, by: number) {
  const dt = new Date(Date.UTC(year, month - 1, day + by));
  return { month: dt.getUTCMonth() + 1, day: dt.getUTCDate(), year: dt.getUTCFullYear() };
}

function weekday(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/** South African public holidays, including the Monday after any that falls on a Sunday. */
export function saPublicHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  const goodFriday = shift(year, easter.month, easter.day, -2);
  const familyDay = shift(year, easter.month, easter.day, 1);
  const fixed: Holiday[] = [
    { month: 1, day: 1, name: "New Year's Day" },
    { month: 3, day: 21, name: "Human Rights Day" },
    { month: 4, day: 27, name: "Freedom Day" },
    { month: 5, day: 1, name: "Workers' Day" },
    { month: 6, day: 16, name: "Youth Day" },
    { month: 8, day: 9, name: "National Women's Day" },
    { month: 9, day: 24, name: "Heritage Day" },
    { month: 12, day: 16, name: "Day of Reconciliation" },
    { month: 12, day: 25, name: "Christmas Day" },
    { month: 12, day: 26, name: "Day of Goodwill" },
  ];
  const observed: Holiday[] = fixed
    .filter((h) => weekday(year, h.month, h.day) === 0)
    .map((h) => {
      const next = shift(year, h.month, h.day, 1);
      return { month: next.month, day: next.day, name: `${h.name} (observed)` };
    });
  return [
    ...fixed,
    { month: goodFriday.month, day: goodFriday.day, name: "Good Friday" },
    { month: familyDay.month, day: familyDay.day, name: "Family Day" },
    ...observed,
  ];
}

const FESTIVE_HOLIDAYS = ["Day of Reconciliation", "Christmas Day", "Day of Goodwill", "New Year's Day"];

/** Which ambient mode the site should wear on a given Johannesburg calendar date (month 1-12). */
export function getSeason(year: number, month: number, day: number): SeasonInfo {
  const holiday = saPublicHolidays(year).find((h) => h.month === month && h.day === day);
  if (holiday) {
    if (holiday.name.startsWith("Heritage Day")) {
      return { mode: "heritage", label: holiday.name, detail: "Heritage Day warmth — ochre glow, proudly local." };
    }
    if (FESTIVE_HOLIDAYS.some((n) => holiday.name.startsWith(n))) {
      return { mode: "festive", label: holiday.name, detail: "Festive champagne accents for the holidays." };
    }
    return { mode: "holiday", label: holiday.name, detail: "A gentle public-holiday warmth, nothing tacky." };
  }
  if (month === 12 && day >= 15) {
    return { mode: "festive", label: "Festive season", detail: "Festive champagne accents for the holidays." };
  }
  if (weekday(year, month, day) === 0) {
    return { mode: "sunday", label: "Red-Letter Calm Mode", detail: "Sunday rest — slower motion, quieter colour, a red-letter touch." };
  }
  return { mode: "none", label: "Everyday mode", detail: "Business as usual — the site adapts on Sundays and SA public holidays." };
}

/** Today's date as seen in Cape Town / Johannesburg. */
export function johannesburgToday(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

