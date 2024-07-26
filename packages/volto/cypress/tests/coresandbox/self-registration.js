describe('Self registration Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setRegistry('plone.enable_self_reg', true);
    cy.setRegistry('plone.use_email_as_login', true);
  });
  it('As an anonymous user, I can request a self registration from the navigation bar', function () {
    cy.findByText('Register').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/register');

    cy.findByLabelText(/Full name/i).type('Placeholder name');
    cy.findByLabelText(/e[-]?mail/i).type('test@example.com{enter}');
  });
});
