const xmlrpc = require('xmlrpc');

// const args = process.argv;
const command = process.argv[2];

// create a client
const client = xmlrpc.createClient({
  host: 'localhost',
  port: 55001,
  path: '/plone/RobotRemote',
});

export function setup() {
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

export function teardown() {
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

function main() {
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
}

// This is the equivalent of `if __name__ == '__main__'` in Python :)
if (require.main === module) {
  main();
}
