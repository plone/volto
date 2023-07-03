import { useSelector } from 'react-redux';

/**
 * useUsers hook
 *
 * This hook returns the current users state that is stored in the Redux store in the
 * `users` reducer, and returns it along with the related state (loading/loaded/error).
 *
 * @export
 * @return {{ users }}
 */
export function useUsers() {
  const user = useSelector((state) => state.users.user);

  return { user };
}
