/**
 * Locale negotiation helpers for server-side rendering.
 * @module helpers/Locale/Locale
 */
import type { Locales } from 'locale';
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
export declare function getSupportedLocales(supportedLanguages?: string[]): Locales;
/**
 * Pick the best supported locale for a language preference.
 *
 * @param preference An `Accept-Language` header value, an `I18N_LANGUAGE`
 *   cookie value or a content language token. Empty means no preference.
 * @param supported Matcher built by {@link getSupportedLocales}.
 * @returns The locale in `react-intl` format, for example `pt-BR`.
 */
export declare function negotiateLocale(preference: string | null | undefined, supported: Locales): string;
/**
 * Decide whether the response must switch to the content language.
 *
 * The switch is needed when the content locale differs from any locale the
 * request came with. On the server, that is both the locale negotiated from
 * the request (which the page starts rendering in) and the one of the
 * `I18N_LANGUAGE` cookie or site default (which the cookie must follow).
 * The intl store is no reference: loading the content may already have
 * switched it, without updating the cookie.
 *
 * @param contentLang Language token of the content being rendered.
 * @param requestLocales Locales the request came with. An empty entry
 *   always requires the switch.
 * @param supported Matcher built by {@link getSupportedLocales}.
 * @returns The locale to switch to, or `null` when every request locale
 *   already matches the content.
 */
export declare function resolveContentLocale(contentLang: string | null | undefined, requestLocales: Array<string | null | undefined>, supported: Locales): string | null;
