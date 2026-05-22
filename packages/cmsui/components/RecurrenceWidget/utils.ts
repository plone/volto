import { RRule, RRuleSet, type RRuleType } from './rrule';

export const FREQUENCES = {
  DAILY: 'daily',
  MONDAYFRIDAY: 'mondayfriday',
  WEEKDAYS: 'weekdays',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export type Frequency = (typeof FREQUENCES)[keyof typeof FREQUENCES];

export function isFrequency(value: any): value is Frequency {
  return Object.values(FREQUENCES).includes(value as Frequency);
}

type FrequencyOption = {
  rrule: any;
  interval?: boolean;
  byday?: boolean;
  bymonth?: boolean;
  byyear?: boolean;
};

export const OPTIONS: { frequences: Record<Frequency, FrequencyOption> } = {
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

export function getSelectOptions(t: (key: string) => string) {
  return Object.entries(OPTIONS.frequences).map(([key]) => ({
    value: key as Frequency,
    label: t(`cmsui.recurrence.options.${key as Frequency}`),
  }));
}

export const Days = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
};

export const getDaysOptions = (
  currentLocale: string,
): { value: number; label: string }[] => {
  return (Object.keys(Days) as Array<keyof typeof Days>).map((d) => ({
    value: Days[d].weekday,
    label: getLocalizedWeekday(Days[d].weekday, currentLocale, 'long'),
  }));
};

export const WEEKLY_DAYS = [Days.MO, Days.TU, Days.WE, Days.TH, Days.FR];
export const MONDAYFRIDAY_DAYS = [Days.MO, Days.FR];

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const getMonthOptions = (
  currentLocale: string,
): { value: number; label: string }[] => {
  return months.map((m) => ({
    value: m,
    label: getLocalizedMonth(m, currentLocale, 'long'),
  }));
};

export const ORDINAL_NUMBERS = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  '-1': 'last',
};

export const getOrdinalNumbersOptions = (
  t: (key: string) => string,
): { value: number; label: string }[] => {
  return (
    Object.keys(ORDINAL_NUMBERS) as Array<keyof typeof ORDINAL_NUMBERS>
  ).map((numb) => ({
    value: Number(numb),
    label: getLocalizedOrdinalNumber(ORDINAL_NUMBERS[numb], t),
  }));
};

export function getRruleText(rrule: RRuleType | null) {
  if (rrule) {
    const mainRule = rrule instanceof RRuleSet ? rrule.rrules()[0] : rrule;
    const rruleText = mainRule?.toText();
    return rruleText;
  }
  return undefined;
}

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

export const getWeekday = (number: number) => {
  const n = number === -1 ? 6 : number; //because sunday has index 0, but for rrule has index 6

  const entry = Object.entries(Days).find(([, value]) => value.weekday === n);

  return entry ? entry[1] : null;
};

export type RecurrenceEndOption = 'until' | 'count';
export type MonthlyOption = 'bymonthday' | 'byweekday';
export type YearlyOption = 'bymonthday' | 'byday';

interface RadioGroupOptionsProps<T extends string> {
  id: T;
  title: string;
  description: string;
}

export function byMonthOptions(
  t: any,
): RadioGroupOptionsProps<MonthlyOption>[] {
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

export function byYearOptions(t: any): RadioGroupOptionsProps<YearlyOption>[] {
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

export function recurrenceEndOptions(
  t: any,
): RadioGroupOptionsProps<RecurrenceEndOption>[] {
  return [
    {
      id: 'count',
      title: t('cmsui.recurrence.count'),
      description: t('cmsui.recurrence.count_description'),
    },
    {
      id: 'until',
      title: t('cmsui.recurrence.until'),
      description: t('cmsui.recurrence.until_description'),
    },
  ];
}

export const widgetTailwindClasses = {
  fieldComponent: 'flex items-center flex-row gap-0',
  fieldGroupComponent:
    'flex items-center border-0 h-auto gap-2 px-4 py-2 hover:bg-quanta-snow',
  labelComponent: 'basis-1/5 text-base',
};
