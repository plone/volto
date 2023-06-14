import { useSelector, shallowEqual } from 'react-redux';

export function useContent() {
  const content = useSelector((state) => state.content?.data, shallowEqual);
  const deleteRequest=useSelector((state)=>state.content?.delete);
  const error = useSelector((state) => state.content.get?.error);
  return { content, deleteRequest, error };
}
