import { ploneAuth } from '../../../support/constants';

describe('Autologin Tests', () => {
  it('Autologin as an standalone test', function () {
    const api_url = 'http://127.0.0.1:55001/plone';
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.request({
      method: 'POST',
      url: `${api_url}/@login`,
      headers: { Accept: 'application/json' },
      body: { login: user, password: password },
    }).then((response) => cy.setCookie('auth_token', response.body.token));

    cy.visit('/');
    cy.get('#toolbar-personal').click();
    cy.get('#toolbar-logout');
  });
});
