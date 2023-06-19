import { useSelector } from 'react-redux';

/**
 * useUsers hook
 *
 * This hook returns the current user state that is stored in the Redux store in the
 * `users` reducer, and returns it along with the related state (loading/loaded/error).
 *
 * @export
 * @return {{ loading: boolean, loaded: boolean, error: Error }}
 */

export function useUsers() {
  const loading = useSelector((state) => state.users.initial.loading);
  const loaded = useSelector((state) => state.users.initial.loaded);
  const error = useSelector((state) => state.users.initial.error);
  return { loading, loaded, error };
}
