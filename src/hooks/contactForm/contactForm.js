import { useSelector } from 'react-redux';

export function useLoading() {
  return useSelector((state) => state.emailNotification.loading);
}
export function useLoaded() {
  return useSelector((state) => state.emailNotification.loaded);
}
export function useError() {
  return useSelector((state) => state.emailNotification.error);
}
