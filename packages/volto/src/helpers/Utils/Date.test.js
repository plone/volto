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

  describe('moment-style format tokens', () => {
    it('formats with "ll" token (short date)', () => {
      expect(formatDate({ date, format: 'll' })).toBe('Jan 3, 2022');
    });

    it('formats with "lll" token (short date + time)', () => {
      expect(formatDate({ date, format: 'lll' })).toBe('Jan 3, 2022, 7:26 PM');
    });

    it('formats with "LLLL" token (full date + time)', () => {
      expect(formatDate({ date, format: 'LLLL' })).toBe(
        'Monday, January 3, 2022 at 7:26 PM',
      );
    });

    it('formats with "L" token (numeric short date)', () => {
      expect(formatDate({ date, format: 'L' })).toBe('01/03/2022');
    });

    it('formats with "LT" token (time only)', () => {
      expect(formatDate({ date, format: 'LT' })).toBe('7:26 PM');
    });

    it('moment token works with other locales', () => {
      expect(formatDate({ date, format: 'll', locale: 'de' })).toBe(
        '3. Jan. 2022',
      );
    });

    it('unknown string format falls back to short_date_format', () => {
      expect(formatDate({ date, format: 'unknown' })).toBe('1/3/2022');
    });
  });

  describe('Italian locale (it)', () => {
    it('formats a basic date', () => {
      expect(formatDate({ date, locale: 'it' })).toBe('03/01/2022');
    });

    it('formats a date with time', () => {
      expect(formatDate({ date, locale: 'it', includeTime: true })).toBe(
        '03/01/22, 19:26',
      );
    });

    it('formats a date as long', () => {
      expect(formatDate({ date, locale: 'it', long: true })).toBe(
        'lunedì 3 gennaio 2022 alle ore 19:26',
      );
    });

    it('formats with "ll" token', () => {
      expect(formatDate({ date, format: 'll', locale: 'it' })).toBe(
        '3 gen 2022',
      );
    });

    it('formats with "lll" token', () => {
      expect(formatDate({ date, format: 'lll', locale: 'it' })).toBe(
        '3 gen 2022, 19:26',
      );
    });

    it('formats with "LLLL" token', () => {
      expect(formatDate({ date, format: 'LLLL', locale: 'it' })).toBe(
        'lunedì 3 gennaio 2022 alle ore 19:26',
      );
    });

    it('formats with "L" token', () => {
      expect(formatDate({ date, format: 'L', locale: 'it' })).toBe(
        '03/01/2022',
      );
    });

    it('formats with "LT" token', () => {
      expect(formatDate({ date, format: 'LT', locale: 'it' })).toBe('19:26');
    });
  });

  describe('German locale (de)', () => {
    it('formats a basic date', () => {
      expect(formatDate({ date, locale: 'de' })).toBe('3.1.2022');
    });

    it('formats a date with time', () => {
      expect(formatDate({ date, locale: 'de', includeTime: true })).toBe(
        '03.01.22, 19:26',
      );
    });

    it('formats a date as long', () => {
      expect(formatDate({ date, locale: 'de', long: true })).toBe(
        'Montag, 3. Januar 2022 um 19:26',
      );
    });

    it('formats with "ll" token', () => {
      expect(formatDate({ date, format: 'll', locale: 'de' })).toBe(
        '3. Jan. 2022',
      );
    });

    it('formats with "lll" token', () => {
      expect(formatDate({ date, format: 'lll', locale: 'de' })).toBe(
        '3. Jan. 2022, 19:26',
      );
    });

    it('formats with "LLLL" token', () => {
      expect(formatDate({ date, format: 'LLLL', locale: 'de' })).toBe(
        'Montag, 3. Januar 2022 um 19:26',
      );
    });

    it('formats with "L" token', () => {
      expect(formatDate({ date, format: 'L', locale: 'de' })).toBe(
        '03.01.2022',
      );
    });

    it('formats with "LT" token', () => {
      expect(formatDate({ date, format: 'LT', locale: 'de' })).toBe('19:26');
    });
  });

  describe('Brazilian Portuguese locale (pt-BR)', () => {
    it('formats a basic date', () => {
      expect(formatDate({ date, locale: 'pt-BR' })).toBe('03/01/2022');
    });

    it('formats a date with time', () => {
      expect(formatDate({ date, locale: 'pt-BR', includeTime: true })).toBe(
        '03/01/2022, 19:26',
      );
    });

    it('formats a date as long', () => {
      expect(formatDate({ date, locale: 'pt-BR', long: true })).toBe(
        'segunda-feira, 3 de janeiro de 2022 às 19:26',
      );
    });

    it('formats with "ll" token', () => {
      expect(formatDate({ date, format: 'll', locale: 'pt-BR' })).toBe(
        '3 de jan. de 2022',
      );
    });

    it('formats with "lll" token', () => {
      expect(formatDate({ date, format: 'lll', locale: 'pt-BR' })).toBe(
        '3 de jan. de 2022, 19:26',
      );
    });

    it('formats with "LLLL" token', () => {
      expect(formatDate({ date, format: 'LLLL', locale: 'pt-BR' })).toBe(
        'segunda-feira, 3 de janeiro de 2022 às 19:26',
      );
    });

    it('formats with "L" token', () => {
      expect(formatDate({ date, format: 'L', locale: 'pt-BR' })).toBe(
        '03/01/2022',
      );
    });

    it('formats with "LT" token', () => {
      expect(formatDate({ date, format: 'LT', locale: 'pt-BR' })).toBe('19:26');
    });
  });

  describe('Romanian locale (ro)', () => {
    it('formats a basic date', () => {
      expect(formatDate({ date, locale: 'ro' })).toBe('03.01.2022');
    });

    it('formats a date with time', () => {
      expect(formatDate({ date, locale: 'ro', includeTime: true })).toBe(
        '03.01.2022, 19:26',
      );
    });

    it('formats a date as long', () => {
      expect(formatDate({ date, locale: 'ro', long: true })).toBe(
        'luni, 3 ianuarie 2022 la 19:26',
      );
    });

    it('formats with "ll" token', () => {
      expect(formatDate({ date, format: 'll', locale: 'ro' })).toBe(
        '3 ian. 2022',
      );
    });

    it('formats with "lll" token', () => {
      expect(formatDate({ date, format: 'lll', locale: 'ro' })).toBe(
        '3 ian. 2022, 19:26',
      );
    });

    it('formats with "LLLL" token', () => {
      expect(formatDate({ date, format: 'LLLL', locale: 'ro' })).toBe(
        'luni, 3 ianuarie 2022 la 19:26',
      );
    });

    it('formats with "L" token', () => {
      expect(formatDate({ date, format: 'L', locale: 'ro' })).toBe(
        '03.01.2022',
      );
    });

    it('formats with "LT" token', () => {
      expect(formatDate({ date, format: 'LT', locale: 'ro' })).toBe('19:26');
    });
  });

  // moment vs Intl comparison
  // This section documents known differences between the former moment.js output
  // and our Intl-based formatDate implementation. Reference values are hardcoded
  // from moment@2.29.4 to avoid a runtime dependency on the library we are removing.
  //
  // Tokens that match moment exactly: ll, L, LT (most locales), LLLL (pt-BR only)
  //
  // Known differences from moment@2.29.4:
  //   - lll (all locales): Intl inserts a comma between date and time;
  //     moment did not (e.g. "Jan 3, 2022, 7:26 PM" vs "Jan 3, 2022 7:26 PM")
  //   - LLLL (en, it, de, ro): Intl inserts a locale-specific preposition before
  //     the time; moment did not
  //       en: "...at 7:26 PM"  vs "...7:26 PM"
  //       it: "...alle ore 19:26" vs "...19:26"
  //       de: "...um 19:26"      vs "...19:26"
  //       ro: "...la 19:26"      vs "...19:26"
  //   - ll/lll (pt-BR): Intl adds a period after abbreviated month ("jan.");
  //     moment did not ("jan")
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
