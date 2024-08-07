import { formatDate, formatRelativeDate } from './Date';

const d = '2022-01-03T19:26:08.999Z';
const date = new Date(d);

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365; // ? is this safe or should it be more accurate

describe('formatDate helper', () => {
  it('accepts an iso date string', () => {
    expect(formatDate({ date: d })).toBe('1/3/2022');
  });

  it('accepts a date object', () => {
    expect(formatDate({ date })).toBe('1/3/2022');
  });

  it('formats a date object in other language', () => {
    expect(formatDate({ date, locale: 'de' })).toBe('3.1.2022');
  });

  it('formats a date object with time in default en locale', () => {
    expect(formatDate({ date, includeTime: true })).toBe('1/3/22, 7:26 PM');
  });

  it('formats a date object with time in other language', () => {
    expect(formatDate({ date, locale: 'de', includeTime: true })).toBe(
      '03.01.22, 19:26',
    );
  });

  it('formats a date as long', () => {
    expect(formatDate({ date, long: true })).toBe(
      'Monday, January 3, 2022 at 7:26 PM',
    );
  });

  it('formats a date as long in other language', () => {
    expect(formatDate({ date, long: true, locale: 'de' })).toBe(
      'Montag, 3. Januar 2022 um 19:26',
    );
  });

  it('includeTime takes precedence over long', () => {
    expect(formatDate({ date, long: true, includeTime: true })).toBe(
      '1/3/22, 7:26 PM',
    );
  });

  it('accepts custom format', () => {
    expect(
      formatDate({
        date,
        format: {
          year: 'numeric',
          month: 'narrow',
          day: '2-digit',
        },
      }),
    ).toBe('J 03, 2022');
  });

  it('custom format takes precedence over long and includeTime', () => {
    expect(
      formatDate({
        date,
        long: true,
        includeTime: true,
        format: {
          year: 'numeric',
          month: 'narrow',
          day: '2-digit',
          // dayPeriod: 'long',
        },
      }),
    ).toBe('J 03, 2022');
  });
});

describe('formatRelativeDate helper', () => {
  it('accepts an iso date string', () => {
    expect(formatRelativeDate({ date: d })).toBeTruthy();
  });

  it('accepts date object', () => {
    expect(formatRelativeDate({ date })).toBeTruthy();
  });

  it('uses auto numeric to format close past days', () => {
    const now = Date.now();
    const d = new Date(now - 1 * DAY);
    expect(formatRelativeDate({ date: d })).toBe('yesterday');
  });

  it('uses auto numeric to format close future days', () => {
    const now = Date.now();
    const d = new Date(now + 1 * DAY);
    expect(formatRelativeDate({ date: d })).toBe('tomorrow');
  });

  it('uses auto numeric to format close future years', () => {
    const now = Date.now();
    const d = new Date(now + 1 * YEAR);
    expect(formatRelativeDate({ date: d })).toBe('next year');
  });

  it('uses auto numeric to format close last years', () => {
    const now = Date.now();
    const d = new Date(now - 1 * YEAR);
    expect(formatRelativeDate({ date: d })).toBe('last year');
  });

  it('accepts a relativeTo date', () => {
    const relativeTo = new Date(date.getTime() + 4 * DAY);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 days ago');
  });

  it('can format past seconds', () => {
    const relativeTo = new Date(date.getTime() + 4 * SECOND);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 seconds ago');
  });

  it('can format future seconds', () => {
    const relativeTo = new Date(date.getTime() - 4 * SECOND);
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 seconds');
  });

  it('can format past minutes', () => {
    const relativeTo = new Date(date.getTime() + 4 * MINUTE);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 minutes ago');
  });

  it('can format future minutes', () => {
    const relativeTo = new Date(date.getTime() - 4 * MINUTE);
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 minutes');
  });

  it('can format past hours', () => {
    const relativeTo = new Date(date.getTime() + 4 * HOUR);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 hours ago');
  });

  it('can format future hours', () => {
    const relativeTo = new Date(date.getTime() - 4 * HOUR);
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 hours');
  });

  it('can format past days', () => {
    const relativeTo = new Date(date.getTime() + 4 * DAY);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 days ago');
  });

  it('can format future days', () => {
    const relativeTo = new Date(date.getTime() - 4 * DAY);
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 days');
  });

  it('can format past months', () => {
    const relativeTo = new Date(date.getTime() + 4 * MONTH);
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 months ago');
  });

  it('can format future months', () => {
    const relativeTo = new Date(date.getTime() - 4 * MONTH);
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 months');
  });

  it('can format past years', () => {
    const relativeTo = new Date(
      date.getTime() + 4 * YEAR + 4 * MONTH + 4 * DAY,
    );
    expect(formatRelativeDate({ date, relativeTo })).toBe('4 years ago');
  });

  it('can format future years', () => {
    const relativeTo = new Date(
      date.getTime() - 4 * YEAR - +4 * MONTH - 4 * DAY,
    );
    expect(formatRelativeDate({ date, relativeTo })).toBe('in 4 years');
  });

  it('can use alternate style short', () => {
    const now = Date.now();
    const d = new Date(now + 3 * MONTH);
    expect(formatRelativeDate({ date: d, style: 'short' })).toBe('in 3 mo.');
  });

  it('can use alternate style narrow', () => {
    const now = Date.now();
    const d = new Date(now + 3 * MONTH);
    expect(['in 3 mo.', 'in 3mo']).toContain(
      formatRelativeDate({ date: d, style: 'narrow' }),
    );
  });
});
