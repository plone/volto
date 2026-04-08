import axios from 'axios';

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
