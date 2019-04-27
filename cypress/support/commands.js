Cypress.Commands.add('autologin', () => {
  let api_url;
  if (Cypress.env('API') === 'guillotina') {
    api_url = 'http://localhost:8081/db/container';
  } else {
    api_url = 'http://localhost:55001/plone';
  }

  cy.request({
    method: 'POST',
    url: `${api_url}/@login`,
    headers: { Accept: 'application/json' },
    body: { login: 'admin', password: 'secret' },
  }).then(response => cy.setCookie('auth_token', response.body.token));
});
