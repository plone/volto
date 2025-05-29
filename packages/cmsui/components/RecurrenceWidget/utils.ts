import { RRule } from 'rrule';

export const FREQUENCES = {
  DAILY: 'daily',
  MONDAYFRIDAY: 'mondayfriday',
  WEEKDAYS: 'weekdays',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

export const OPTIONS = {
  frequences: {
    [FREQUENCES.DAILY]: { rrule: RRule.DAILY, interval: true },
    [FREQUENCES.MONDAYFRIDAY]: { rrule: RRule.WEEKLY },
    [FREQUENCES.WEEKDAYS]: { rrule: RRule.WEEKLY },
    [FREQUENCES.WEEKLY]: { rrule: RRule.WEEKLY, interval: true, byday: true },
    [FREQUENCES.MONTHLY]: {
      rrule: RRule.MONTHLY,
      interval: true,
      bymonth: true,
    },
    [FREQUENCES.YEARLY]: { rrule: RRule.YEARLY, interval: true, byyear: true },
  },
};

export const Days = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
};

export function getLocalizedWeekdayShort(
  dayIndex: number,
  locale: string = 'en-US',
) {
  const baseDate = new Date(2024, 0, 1 + dayIndex);
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(baseDate);
}
