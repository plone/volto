import { useSelector } from 'react-redux';

/**
 * useLang hook
 *
 * This hook returns the current intl data that is stored in the Redux store in the
 * `intl` reducer, and returns it along with the related state (lang).
 *
 * @export
 * @return {{ items:ContentData }}
 */
export function useLang() {
  const lang = useSelector((state) => state.intl.locale);
  return lang;
}
