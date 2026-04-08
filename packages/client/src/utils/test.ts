import PloneClient from '../client';
import { createUser } from '../restapi/users/add';
import { v4 as uuid } from 'uuid';

export const loginWithCreate = async (
  cli: PloneClient,
  {
    username,
    password,
    email,
    roles,
  }: {
    username: string;
    email?: string;
    password: string;
    roles?: string[];
  },
) => {
  if (!email) {
    return cli.login({ username, password });
  }

  try {
    await createUser({
      data: { username, password, email, roles },
      config: cli.config,
    });
  } catch (e) {
    // handle error if the user has already been creatd in previous invocations
  }

  return cli.login({ username, password });
};

export const getUniqueEntityName = (baseName: string) =>
  `${baseName}${uuid().replaceAll('-', '')}`;

export const stripExtraSlash = (path: string) => {
  const pathSegments = path.split('/').filter((segment) => segment !== ''); // Split path and remove empty segments
  const cleanedPath = '/' + pathSegments.join('/'); // Rejoin the path segments with a single slash
  return cleanedPath;
};

export const getPathFromPageTitle = (title: string) =>
  stripExtraSlash(`/${title.toLocaleLowerCase().split(' ').join('-')}`);
