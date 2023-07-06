import { useSelector, shallowEqual } from 'react-redux';

/**
 * useContent hook
 *
 * This hook returns the current content that is stored in the Redux store in the
 * `content` reducer, and returns it along with the related state (loading/loaded/error/deleteRequest).
 *
 * @export
 * @return {{ data: ContentData }}
 */
export function useContent() {
  const data = useSelector((state) => state.content?.data, shallowEqual);

  return { data };
}
