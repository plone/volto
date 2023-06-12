import { useSelector } from 'react-redux';

export function useUsers() {
  const loading = useSelector((state) => state.users.initial.loading);

  const loaded = useSelector((state) => state.users.initial.loaded);

  const error = useSelector((state) => state.users.initial.error);

  return { loading, loaded, error };
}
