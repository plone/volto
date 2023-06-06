import { useSelector} from 'react-redux';

export function useToken() {
    return useSelector((state) => state.userSession.token);
  }

export function useContent(){
      return useSelector((state) => state.content.data);
  }