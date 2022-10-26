const xmlrpc = require('xmlrpc');
const command = process.argv[2];

// create a client
const client = xmlrpc.createClient({
  host: process.env.CYPRESS_BACKEND_HOST || 'localhost',
  port: 55001,
  path: '/plone/RobotRemote',
});

function setup() {
  // Setup site
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_setup',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
}

function teardown() {
  // Tearing down
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_teardown',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
}

switch (command) {
  case 'setup':
    setup();
    break;
  case 'teardown':
    teardown();
    break;
  default:
    setup();
}
