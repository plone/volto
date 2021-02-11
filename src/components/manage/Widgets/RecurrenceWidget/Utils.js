import { RRule } from 'rrule';
import moment from 'moment';
import { defineMessages } from 'react-intl';

export const Days = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
};

export const WEEKLY_DAYS = [Days.MO, Days.TU, Days.WE, Days.TH, Days.FR];
export const MONDAYFRIDAY_DAYS = [Days.MO, Days.FR];

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

export const toISOString = (date) => {
  return date.toISOString().split('T')[0];
};

export const rrulei18n = (intl) => {
  moment.locale(intl.locale);

  const messages = defineMessages({
    every: { id: 'rrule_every', defaultMessage: 'every' },
    until: { id: 'rrule_until', defaultMessage: 'until' },
    for: { id: 'rrule_for', defaultMessage: 'for' },
    time: { id: 'rrule_time', defaultMessage: 'time' },
    times: { id: 'rrule_times', defaultMessage: 'times' },
    '(~ approximate)': {
      id: 'rrule_approximate',
      defaultMessage: '(~approximate)',
    },
    hour: { id: 'rrule_hour', defaultMessage: 'hour' },
    hours: { id: 'rrule_hours', defaultMessage: 'hours' },
    minutes: {
      id: 'rrule_minutes',
      defaultMessage: 'minutes',
    },
    weekdays: {
      id: 'rrule_weekdays',
      defaultMessage: 'weekdays',
    },
    weekday: {
      id: 'rrule_weekday',
      defaultMessage: 'weekday',
    },
    day: { id: 'rrule_day', defaultMessage: 'day' },
    days: { id: 'rrule_days', defaultMessage: 'days' },
    in: { id: 'rrule_in', defaultMessage: 'in' },
    week: { id: 'rrule_week', defaultMessage: 'week' },
    weeks: { id: 'rrule_weeks', defaultMessage: 'weeks' },
    month: {
      id: 'rrule_month',
      defaultMessage: 'month',
    },
    months: {
      id: 'rrule_months',
      defaultMessage: 'months',
    },
    on: { id: 'rrule_on', defaultMessage: 'on' },
    year: { id: 'rrule_year', defaultMessage: 'year' },
    years: { id: 'rrule_years', defaultMessage: 'years' },
    'on the': {
      id: 'rrule_on the',
      defaultMessage: 'on the',
    },
    the: { id: 'rrule_the', defaultMessage: 'the' },
    and: { id: 'rrule_and', defaultMessage: 'and' },
    or: { id: 'rrule_or', defaultMessage: 'or' },
    at: { id: 'rrule_at', defaultMessage: 'at' },
    last: { id: 'rrule_last', defaultMessage: 'last' },
    st: { id: 'rrule_st', defaultMessage: 'st' },
    nd: { id: 'rrule_nd', defaultMessage: 'nd' },
    rd: { id: 'rrule_rd', defaultMessage: 'rd' },
    th: { id: 'rrule_th', defaultMessage: 'th' },
    dateFormat: {
      id: 'rrule_dateFormat',
      defaultMessage: '[month] [day], [year]',
    },
  });

  let strings = {};
  Object.keys(messages).map(
    (k) => (strings[k] = intl.formatMessage(messages[k])),
  );

  let dateFormat = strings.dateFormat
    .replace(new RegExp('\\[', 'g'), '${')
    .replace(new RegExp('\\]', 'g'), '}');

  const dateFormatter = (year, month, day) =>
    dateFormat
      .replace(/\$\{year\}/g, year)
      .replace(/\$\{month\}/g, month)
      .replace(/\$\{day\}/g, day);
  const LANGUAGE = {
    dayNames: moment.weekdays(),
    monthNames: moment.months(),
    strings: strings,
    dateFormatter: dateFormatter,
  };
  return LANGUAGE;
};
