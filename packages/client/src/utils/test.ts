import PloneClient from '../client';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

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
    await cli.createUser({
      data: { username, password, email, roles },
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

export async function setup() {
  const APIPATH = 'http://localhost:55001/plone';
  const data =
    '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_setup</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>';

  try {
    const response = await axios.post(`${APIPATH}/RobotRemote`, data, {
      headers: {
        Accept: 'text/xml',
        'Content-Type': 'text/xml',
      },
    });

    return response;
  } catch (error) {
    throw error as Error;
  }
}

export async function teardown() {
  const APIPATH = 'http://localhost:55001/plone';
  const data =
    '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_teardown</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>';

  try {
    const response = await axios.post(`${APIPATH}/RobotRemote`, data, {
      headers: {
        Accept: 'text/xml',
        'Content-Type': 'text/xml',
      },
    });

    return response;
  } catch (error) {
    throw error as Error;
  }
}
