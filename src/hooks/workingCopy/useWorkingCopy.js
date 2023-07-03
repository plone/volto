import { shallowEqual, useSelector } from 'react-redux';

/**
 * useLang hook
 *
 * This hook returns the current active language of the site.
 * It is stored in the locale key of the intl Redux store reducer.
 *
 * @export
 * @return {{ workingCopy }}
 */
export function useWorkingCopy() {
  const workingCopy = useSelector((state) => state.workingCopy);
  return workingCopy;
}
