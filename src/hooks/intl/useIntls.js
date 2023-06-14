import { useSelector, shallowEqual } from 'react-redux';

export function useIntls() {
  const lang = useSelector((state) => state.intl.locale, shallowEqual);
  return lang;
}
