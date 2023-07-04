import { useSelector, shallowEqual } from 'react-redux';

/**
 * useContent hook
 *
 * This hook returns the current content that is stored in the Redux store in the
 * `content` reducer, and returns it along with the related state (loading/loaded/error).
 *
 * @export
 * @return {{ data: ContentData, loading: boolean, loaded: boolean, error: Error , }}
 */
export function useContent() {
  const data = useSelector((state) => state.content?.data, shallowEqual);
  const loading = useSelector((state) => state.content.get?.loading);
  const loaded = useSelector((state) => state.content.get?.loaded);
  const error = useSelector((state) => state.content.get?.error, shallowEqual);
  const unlockRequest = useSelector((state) => state.content?.unlock);
  return { data, loading, loaded, error, unlockRequest };
}

// For reference purposes: Potential future useQuery version
// export function useContent() {
//   // the cache will need to know the current location
//   const pathname = useLocation();
//   const query = useQuery(getContentQuery({ path }))

//   // This might not be needed if we rename the properties
//   const {isLoading: loading, isSuccess: loaded, ...rest} = query;

//   return { loading, loaded, ...rest };
// }
