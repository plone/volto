const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
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

export const readable_date_format = {
  // Thursday, December 9, 2021 at 10:39 AM
  dateStyle: 'full',
  timeStyle: 'short',
};

export function formatDate({
  date,
  format,
  language = 'en',
  long,
  includeTime,
}) {
  date = typeof date === 'string' ? new Date(date) : date;
  format = format
    ? format
    : long && !includeTime
    ? readable_date_format
    : includeTime
    ? short_date_and_time_format
    : short_date_format;
  return new Intl.DateTimeFormat(language, format).format(date);
}

export function formatRelativeDate(date, language) {
  date = typeof date === 'string' ? date : new Date(date);
  const deltaMiliTime = date.getTime() - Date.now();
  const deltaSeconds = deltaMiliTime / SECOND;
  const deltaDays = deltaMiliTime / DAY;
  const formatter = new Intl.RelativeTimeFormat(language);
  const tag = deltaDays < 1 ? 1 : 1;

  return formatter.format(Math.round(deltaDays), tag);
}
