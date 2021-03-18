describe('Login Tests', () => {
  it('As registered user I can login', function () {
    cy.visit('/login');
    cy.get('#login').type('admin').should('have.value', 'admin');
    cy.get('#password').type('admin').should('have.value', 'admin');
    cy.get('#login-form-submit').click();
    cy.get('body').should('have.class', 'has-toolbar');
  });
});
