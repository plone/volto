context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Login').click();
  });
  it('As registered user I an login', function() {
    cy.get('#login')
      .type('admin')
      .should('have.value', 'admin');
    cy.get('#password')
      .type('admin')
      .should('have.value', 'admin');
    cy.get('#login-form-submit').click();
    cy.get('body').should('have.class', 'has-toolbar');
  });
});
