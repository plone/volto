import xmlrpc from 'xmlrpc';

beforeEach(function() {
  cy.log('Setup API fixture');

  // create a client
  const client = xmlrpc.createClient({
    host: 'localhost',
    port: 55001,
    path: '/plone/RobotRemote',
  });

  // Setup site
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_setup',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
});

afterEach(function() {
  cy.log('Tearing down API fixture');

  // create a client
  const client = xmlrpc.createClient({
    host: 'localhost',
    port: 55001,
    path: '/plone/RobotRemote',
  });

  // Tearing down
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_teardown',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
});
