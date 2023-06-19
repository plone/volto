import { useSelector } from 'react-redux';

/**
 * useUsers hook
 *
 * This hook returns the current users state that is stored in the Redux store in the
 * `users` reducer, and returns it along with the related state (loading/loaded/error).
 *
 * @export
 * @return {{  error: Error  , loaded: boolean, loading: boolean }}
 */
export function useUsers() {
  const error = useSelector((state) => state.users.create.error);
  const loading = useSelector((state) => state.users.create.loading);
  const loaded = useSelector((state) => state.users.create.loaded);

  return { error, loaded, loading };
}
