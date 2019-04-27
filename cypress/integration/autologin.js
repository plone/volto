context('Actions', () => {
  it('As a site administrator I can add a page', function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:55001/plone/@login',
      headers: { Accept: 'application/json' },
      body: { login: 'admin', password: 'secret' },
    }).then(response => cy.setCookie('auth_token', response.body.token));

    cy.visit('/');

    cy.get('#toolbar-personal').click();
    cy.get('#toolbar-logout').contains('Log out');
  });
});
