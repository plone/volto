import { useSelector ,shallowEqual } from 'react-redux';

export function useBreadcrumbs() {

  const items=useSelector((state)=>state.breadcrumbs.items, shallowEqual);
  const root=useSelector((state)=>state.breadcrumbs.root);

  return { items , root };
}
