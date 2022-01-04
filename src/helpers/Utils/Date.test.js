import { formatDate, formatRelativeDate } from './Date';

const d = '2022-01-03T19:26:08.999Z';
const date = new Date(d);

describe('Date tests', () => {
  it('accepts an iso date string', () => {
    expect(formatDate({ date: d })).toBe('1/3/2022');
  });

  it('accepts a date object', () => {
    expect(formatDate({ date })).toBe('1/3/2022');
  });

  it('formats a date object in other language', () => {
    expect(formatDate({ date, language: 'de' })).toBe('3.1.2022');
  });

  it('formats a date object with time in default en locale', () => {
    expect(formatDate({ date, includeTime: true })).toBe('1/3/22, 7:26 PM');
  });

  it('formats a date object with time in other language', () => {
    expect(formatDate({ date, language: 'de', includeTime: true })).toBe(
      '03.01.22, 19:26',
    );
  });

  it('formats a date as long', () => {
    expect(formatDate({ date, long: true })).toBe(
      'Monday, January 3, 2022 at 7:26 PM',
    );
  });

  it('formats a date as long in other language', () => {
    expect(formatDate({ date, long: true, language: 'de' })).toBe(
      'Montag, 3. Januar 2022 um 19:26',
    );
  });
});
