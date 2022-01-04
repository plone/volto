const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365; // ? is this safe or should it be more accurate

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

const toDate = (d) => (typeof d === 'string' ? new Date(d) : d);

export function formatDate({
  date, // Date() or  '2022-01-03T19:26:08.999Z'
  format, // format object, see https://tc39.es/ecma402/#datetimeformat-objects
  language = 'en',
  long, // true if format should be in long readable form.
  includeTime, // true if short date format should include time
}) {
  date = toDate(date);
  format = format
    ? format
    : long && !includeTime
    ? long_date_format
    : includeTime
    ? short_date_and_time_format
    : short_date_format;
  return new Intl.DateTimeFormat(language, format).format(date);
}

export function formatRelativeDate({ date, language = 'en', relativeTo }) {
  const formatter = new Intl.RelativeTimeFormat(language);

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
  const pos = deltas.map(Math.floor).findIndex((d) => d > 0);
  const tag = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'][pos];

  return formatter.format(
    Math.round(deltaMiliTime < 0 ? -1 * deltas[pos] : deltas[pos]),
    tag,
  );
}
