import { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { deleteContent, getContent } from '@plone/volto/actions';

/**
 * useContent hook
 *
 * This hook returns the current content that is stored in the Redux store in the
 * `content` reducer, and returns it along with the related state (loading/loaded/error/deleteRequest).
 *
 * @export
 * @return {{ data: ContentData, loading: boolean, loaded: boolean, error: Error , deleteRequest }}
 */
export function useContent() {
  const deleteRequest = useSelector((state) => state.content?.delete);
  const data = useSelector((state) => state.content?.data, shallowEqual);
  const loading = useSelector((state) => state.content.get?.loading);
  const loaded = useSelector((state) => state.content.get?.loaded);
  const error = useSelector((state) => state.content.get?.error);

  return { data, loading, loaded, error, deleteRequest };
}

// Below hooks return a function that matches the action name (e.g. actions/content/content.js exports getContent)
// Should allow for easier migration to `useMutation`

/**
 *
 * @param {string} pathname
 * @todo Support URL object being passed in here
 */
export function useGetContent(pathname) {
  const dispatch = useDispatch();
  const mutate = useCallback(
    (pathname) => {
      dispatch(getContent(pathname));
    },
    [dispatch],
  );
  return {
    getContent: mutate,
  };
}

/**
 *
 * @param {string|Array} urls Content url(s).
 * @todo Support URL object being passed in here
 */
export function useDeleteContent(urls) {
  const dispatch = useDispatch();
  const mutate = useCallback(
    (urls) => {
      dispatch(deleteContent(urls));
    },
    [dispatch],
  );
  return {
    deleteContent: mutate,
  };
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
