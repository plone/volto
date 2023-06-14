import { useSelector, shallowEqual } from 'react-redux';

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
