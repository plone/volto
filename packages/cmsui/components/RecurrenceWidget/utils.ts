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

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ORDINAL_NUMBERS = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  '-1': 'last',
};
export function getLocalizedOrdinalNumber(string: string, t: any) {
  return t(`cmsui.recurrence.${string}_label`);
}

export function getLocalizedWeekday(
  dayIndex: number,
  locale: string = 'en-US',
  format: 'long' | 'short' | 'narrow' | undefined,
) {
  const baseDate = new Date(2024, 0, 1 + dayIndex);
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(baseDate);
}

export function getLocalizedMonth(
  monthIndex: number,
  locale: string = 'en-US',
  format: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined,
) {
  const month = new Date(2000, monthIndex - 1).toLocaleString(locale, {
    month: format,
  });
  return month;
}

export function byMonthOptions(t: any) {
  return [
    {
      id: 'bymonthday',
      title: t('cmsui.recurrence.bymonthday'),
      description: t('cmsui.recurrence.bymonthday_description'),
    },
    {
      id: 'byweekday',
      title: t('cmsui.recurrence.byweekday'),
      description: t('cmsui.recurrence.byweekday_description'),
    },
  ];
}

export function byYearOptions(t: any) {
  return [
    {
      id: 'bymonthday',
      title: t('cmsui.recurrence.bymonthday'),
      description: t('cmsui.recurrence.bymonthday_description'),
    },
    {
      id: 'byday',
      title: t('cmsui.recurrence.byday'),
      description: t('cmsui.recurrence.byday_description'),
    },
  ];
}
