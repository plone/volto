import { useSelector, shallowEqual } from 'react-redux';

/**
 * useComment hook
 *
 * This hook returns the current comments that are stored in the Redux store in the
 * `comments` reducer, and returns it along with the related state (request).
 *
 * @export
 * @return {{ request }}
 */
export function useComments() {
  const request = useSelector((state) => state.comments.update, shallowEqual);

  return request;
}
