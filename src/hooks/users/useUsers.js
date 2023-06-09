import { useSelector, shallowEqual } from 'react-redux';

export function useUsers() {
  const error = useSelector((state) => state.users.create.error);
  const loading = useSelector((state) => state.users.create.loading);
  const loaded = useSelector((state) => state.users.create.loaded);

  return { error, loaded, loading };
}
