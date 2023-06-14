import { useSelector } from 'react-redux';

export function useIntls() {
  const lang = useSelector((state) => state.intl.locale);
  return lang;
}
