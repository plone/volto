import { useSelector } from 'react-redux';

export function useLoaded() {
  return useSelector((state) => state.emailNotification.loaded);
}
