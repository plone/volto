import superagent from 'superagent';

export async function setup() {
  const APIPATH = 'http://localhost:55001/plone';
  const data =
    '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_setup</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>';
  const request = superagent.post(`${APIPATH}/RobotRemote`);
  request.accept('text/xml');
  request.set('content-type', 'text/xml');
  request.send(data);
  return await request;
}

export async function teardown() {
  const APIPATH = 'http://localhost:55001/plone';
  const data =
    '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_teardown</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>';
  const request = superagent.post(`${APIPATH}/RobotRemote`);
  request.accept('text/xml');
  request.set('content-type', 'text/xml');
  request.send(data);
  return await request;
}
