import { useSelector, shallowEqual } from 'react-redux';

export function useComments() {

  const request = useSelector((state) => state.comments.update, shallowEqual);

  return { request };
}