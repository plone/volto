Cypress.Commands.add('autologin', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:55001/plone/@login',
    headers: { Accept: 'application/json' },
    body: { login: 'admin', password: 'secret' },
  }).then(response => cy.setCookie('auth_token', response.body.token));
});
