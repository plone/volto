const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365; // ? is this safe or should it be more accurate

// moment-style format tokens → Intl.DateTimeFormat options (for backward compat)
const MOMENT_FORMAT_MAP = {
  ll: { year: 'numeric', month: 'short', day: 'numeric' },
  lll: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  LLLL: { dateStyle: 'full', timeStyle: 'short' },
  L: { year: 'numeric', month: '2-digit', day: '2-digit' },
  LT: { timeStyle: 'short' },
};

export const short_date_format = {
  // 12/9/2021
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const short_date_and_time_format = {
  // 12/9/21, 10:39 AM
  dateStyle: 'short',
  timeStyle: 'short',
};

export const long_date_format = {
  // Thursday, December 9, 2021 at 10:39 AM
  dateStyle: 'full',
  timeStyle: 'short',
};

export const toDate = (d) =>
  ['string', 'number'].includes(typeof d) ? new Date(d) : d;

/**
 * Friendly formatting for dates
 */
export function formatDate({
  date, // Date() or  '2022-01-03T19:26:08.999Z'
  format, // format object (Intl.DateTimeFormat options) or moment-style token string (e.g. 'll', 'lll', 'LLLL', 'L', 'LT')
  locale = 'en',
  long, // true if format should be in long readable form.
  includeTime, // true if short date format should include time
  formatToParts = false,
}) {
  date = toDate(date);
  // Resolve moment-style token strings to Intl format options
  if (typeof format === 'string') {
    if (process.env.NODE_ENV !== 'production' && !MOMENT_FORMAT_MAP[format]) {
      // eslint-disable-next-line no-console
      console.warn(
        `[formatDate] Unknown format token "${format}", falling back to short_date_format`,
      );
    }
    format = MOMENT_FORMAT_MAP[format] || short_date_format;
  }
  format = format
    ? format
    : long && !includeTime
      ? long_date_format
      : includeTime
        ? short_date_and_time_format
        : short_date_format;

  const formatter = new Intl.DateTimeFormat(locale, format);
  return formatToParts
    ? formatter.formatToParts(date)
    : formatter.format(date).replace('\u202F', ' ');
}

export function formatRelativeDate({
  date,
  locale = 'en',
  relativeTo,
  style = 'long', // long|short|narrow
  formatToParts = false,
}) {
  date = toDate(date);
  relativeTo = toDate(relativeTo || new Date());

  const deltaMiliTime = date.getTime() - relativeTo.getTime();
  const absDeltaMiliTime = Math.abs(deltaMiliTime);

  const deltaSeconds = absDeltaMiliTime / SECOND;
  const deltaMinutes = absDeltaMiliTime / MINUTE;
  const deltaHours = absDeltaMiliTime / HOUR;
  const deltaDays = absDeltaMiliTime / DAY;
  const deltaMonths = absDeltaMiliTime / MONTH;
  const deltaYears = absDeltaMiliTime / YEAR;
  const deltas = [
    deltaYears,
    deltaMonths,
    deltaDays,
    deltaHours,
    deltaMinutes,
    deltaSeconds,
  ];
  const pos = deltas.map(Math.round).findIndex((d) => d > 0);
  const tag = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'][pos];

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style,
  });

  const v = Math.round(deltaMiliTime < 0 ? -1 * deltas[pos] : deltas[pos]);
  // console.log({ date, relativeTo, v });

  return isNaN(v)
    ? ''
    : formatToParts
      ? formatter.formatToParts(v, tag)
      : formatter.format(v, tag).replace('\u202F', ' '); // use "now" ?
}
