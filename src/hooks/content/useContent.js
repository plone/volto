import { useSelector, shallowEqual } from 'react-redux';

export function useContent() {
  const data = useSelector((state) => state.content.data, shallowEqual);
  const loading = useSelector((state) => state.content.get.loading);
  const loaded = useSelector((state) => state.content.get.loaded);
  const error = useSelector((state) => state.content.get.error, shallowEqual);

  return { data, loading, loaded, error };
}

// Potential future useQuery version
// export function useGetContent() {
//   // the cache will need to know the current location
//   const pathname = useLocation();
//   const query = useQuery(getContentQuery({ path }))

//   // This might not be needed if we rename the properties
//   const {isLoading: loading, isSuccess: loaded, ...rest} = query;

//   return { loading, loaded, ...rest };
// }
