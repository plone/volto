import { useSelector } from 'react-redux';

/**
 * useEmailNotification hook
 *
 * This hook returns the current email Notification  that is stored in the Redux store in the
 * `emailNotification` reducer, and returns loading/loaded/error state values.
 *
 * @export
 * @return {{ loading: boolean, loaded: boolean, error: Error }}
 */
export function useEmailNotification() {
  const loading = useSelector((state) => state.emailNotification.loading);
  const loaded = useSelector((state) => state.emailNotification.loaded);
  const error = useSelector((state) => state.emailNotification.error);

  return { loading, loaded, error };
}
