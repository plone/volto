/**
 * I18n helpers.
 * @module helpers/I18n/I18n
 */
import type { IntlShape } from 'react-intl';
/**
 * Format a `react-intl` message using a plain string as both the id and the
 * default fallback. Useful when a UI value (e.g. a block title configured as
 * a plain string) should be looked up in the locale catalog when available,
 * and rendered as-is otherwise.
 *
 * Returns the input untouched when it is falsy, so the result can be used
 * directly in `||` fallback chains.
 *
 * @param intl react-intl `intl` instance, typically from `useIntl()`.
 * @param message The string to translate; used as both `id` and
 *   `defaultMessage`.
 * @returns Translated text, or `message` unchanged if falsy / no translation.
 */
export declare function formatMessageWithFallback<T extends string | undefined | null>(intl: IntlShape, message: T): T extends string ? string : T;
