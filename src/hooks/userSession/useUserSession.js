import { useSelector } from 'react-redux';

export function useUserSession() {
  const error= useSelector((state) => state.userSession.login.error); 
  const loading= useSelector((state) => state.userSession.login.loading);
  return {loading,error};
}
