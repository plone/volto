/**
 * Locale negotiation helpers for server-side rendering.
 * @module helpers/Locale/Locale
 */

import locale from 'locale';
import type { Locales } from 'locale';
import {
  toBackendLang,
  toReactIntlLang,
} from '@plone/volto/helpers/Utils/Utils';

/**
 * Language the UI strings are written in. It is the preferred fallback,
 * because it renders correctly even without a loaded catalog.
 */
const SOURCE_LANGUAGE = 'en';

/**
 * Build the matcher of the locales the server can render.
 *
 * Only the languages in `supportedLanguages` have a catalog loaded on the
 * server, so the matcher must never return any other language. When nothing
 * matches, it falls back to English if it is supported, otherwise to the
 * first supported language.
 *
 * @param supportedLanguages Languages from `config.settings.supportedLanguages`.
 * @returns Matcher to pass to {@link negotiateLocale}.
 */
export function getSupportedLocales(
  supportedLanguages: string[] = [],
): Locales {
  const languages = supportedLanguages.filter(Boolean);
  const fallback =
    languages.find((lang) => toBackendLang(lang) === SOURCE_LANGUAGE) ||
    languages[0] ||
    SOURCE_LANGUAGE;
  // An empty array is truthy, and `Locales` would parse it as one blank locale.
  return new locale.Locales(languages.length ? languages : undefined, fallback);
}

/**
 * Pick the best supported locale for a language preference.
 *
 * @param preference An `Accept-Language` header value, an `I18N_LANGUAGE`
 *   cookie value or a content language token. Empty means no preference.
 * @param supported Matcher built by {@link getSupportedLocales}.
 * @returns The locale in `react-intl` format, for example `pt-BR`.
 */
export function negotiateLocale(
  preference: string | null | undefined,
  supported: Locales,
): string {
  const best = new locale.Locales(preference || undefined).best(supported);
  return toReactIntlLang(String(best));
}

/**
 * Decide whether the rendered locale must change to match the content.
 *
 * The comparison is made against the locale already in the intl store, not
 * against the site default language: the store may hold a locale negotiated
 * from the browser that differs from both.
 *
 * @param contentLang Language token of the content being rendered.
 * @param currentLocale Locale currently in the intl store.
 * @param supported Matcher built by {@link getSupportedLocales}.
 * @returns The locale to switch to, or `null` when the current one fits.
 */
export function resolveContentLocale(
  contentLang: string | null | undefined,
  currentLocale: string | null | undefined,
  supported: Locales,
): string | null {
  const contentLocale = negotiateLocale(contentLang, supported);
  if (
    currentLocale &&
    toBackendLang(currentLocale) === toBackendLang(contentLocale)
  ) {
    return null;
  }
  return contentLocale;
}
