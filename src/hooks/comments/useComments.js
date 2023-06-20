import { useSelector, shallowEqual } from 'react-redux';

/**
 * useComment hook
 *
 * This hook returns the current comments that are stored in the Redux store in the
 * `comments` reducer, and returns it along with the related state (items/next/items_total/permissions/addRequest/deleteRquest).
 *
 * @export
 * @return {{ items, next, items_total, permissions, addRequest, deleteRequest }}
 */
export function useComments() {
  const items = useSelector((state) => state.comments.items, shallowEqual);
  const next = useSelector((state) => state.comments.next, shallowEqual);
  const items_total = useSelector(
    (state) => state.comments.items_total,
    shallowEqual,
  );
  const permissions = useSelector(
    (state) => state.comments.permissions || {},
    shallowEqual,
  );
  const addRequest = useSelector((state) => state.comments.add, shallowEqual);
  const deleteRequest = useSelector(
    (state) => state.comments.delete,
    shallowEqual,
  );

  return { items, next, items_total, permissions, addRequest, deleteRequest };
}
