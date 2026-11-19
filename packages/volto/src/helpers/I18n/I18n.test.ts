import { createIntl, createIntlCache } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { formatMessageWithFallback } from './I18n';

const buildIntl = (
  locale: string,
  messages: Record<string, string>,
): IntlShape => createIntl({ locale, messages }, createIntlCache());

describe('formatMessageWithFallback', () => {
  it('returns the translated string when the locale catalog has an entry', () => {
    const intl = buildIntl('pt-BR', { Image: 'Imagem' });
    expect(formatMessageWithFallback(intl, 'Image')).toBe('Imagem');
  });

  it('falls back to the input message when no translation is registered', () => {
    const intl = buildIntl('pt-BR', {});
    expect(formatMessageWithFallback(intl, 'Image')).toBe('Image');
  });

  it('returns undefined unchanged', () => {
    const intl = buildIntl('en', {});
    expect(formatMessageWithFallback(intl, undefined)).toBeUndefined();
  });

  it('returns null unchanged', () => {
    const intl = buildIntl('en', {});
    expect(formatMessageWithFallback(intl, null)).toBeNull();
  });

  it('returns an empty string unchanged', () => {
    const intl = buildIntl('en', {});
    expect(formatMessageWithFallback(intl, '')).toBe('');
  });

  it('does not call intl.formatMessage when the message is falsy', () => {
    const intl = buildIntl('en', {});
    const spy = vi.spyOn(intl, 'formatMessage');
    formatMessageWithFallback(intl, undefined);
    formatMessageWithFallback(intl, null);
    formatMessageWithFallback(intl, '');
    expect(spy).not.toHaveBeenCalled();
  });
});
