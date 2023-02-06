import { Login } from '../interfaces/login';
import { handleRequest, ApiRequestParams } from '../API';

export const login = async (
  username: string,
  password: string,
): Promise<Login> => {
  const options: ApiRequestParams = {
    data: { login: username, password },
  };
  return handleRequest('post', '/@login', options);
};

export const loginQuery = (username: string, password: string) => ({
  queryKey: [username, password, 'login'],
  queryFn: async () => login(username, password),
});
