import { useSelector ,shallowEqual } from 'react-redux';

export function useemailNotification() {
  const error=useSelector((state)=>state.emailNotification.error);
  const loading=useSelector((state)=>state.emailNotification.loading);
  const loaded=useSelector((state)=>state.emailNotification.loaded);

  return {error,loaded,loading};
}

