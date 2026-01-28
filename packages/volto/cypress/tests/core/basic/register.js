describe('Register new user', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });
  it('Register a new user', function () {
    const api_url = 'http://127.0.0.1:55001/plone';

    cy.visit('/register');
    cy.get('#field-fullname').type('plone-dev');
    cy.get('#field-email').type('plone@local.dev');
    cy.get('button[title="Register"]').click();
    cy.request({
      method: 'POST',
      url: `${api_url}/@users`,
      headers: { Accept: 'application/json' },
      body: {
        username: 'plone-dev',
        fullname: 'plone-dev',
        email: 'plone@local.dev',
        password: 'password',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
