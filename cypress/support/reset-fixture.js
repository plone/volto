function setup() {
  const api_url = Cypress.env('API_PATH') || 'http://localhost:55001/plone';
  cy.request({
    method: 'POST',
    url: `${api_url}/RobotRemote`,
    headers: { Accept: 'text/xml', 'content-type': 'text/xml' },
    body:
      '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_setup</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>',
  }).then(() => cy.log('Setting up API fixture'));
}

function teardown() {
  const api_url = Cypress.env('API_PATH') || 'http://localhost:55001/plone';
  cy.request({
    method: 'POST',
    url: `${api_url}/RobotRemote`,
    headers: { Accept: 'text/xml', 'content-type': 'text/xml' },
    body:
      '<?xml version="1.0"?><methodCall><methodName>run_keyword</methodName><params><param><value><string>remote_zodb_teardown</string></value></param><param><value><array><data><value><string>plone.app.robotframework.testing.PLONE_ROBOT_TESTING</string></value></data></array></value></param></params></methodCall>',
  }).then(() => cy.log('Tearing down API fixture'));
}

function main() {
  const command = process.argv[2];
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

module.exports = {
  setup,
  teardown,
};
