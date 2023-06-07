import { useSelector } from 'react-redux';

export function useError() {
  return useSelector((state) => state.emailNotification.error);
}
