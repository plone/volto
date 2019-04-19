context('Actions', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Login').click();
  });
  it('As a site administrator I can add a page', function() {
    cy.get('#login')
      .type('admin')
      .should('have.value', 'admin');
    cy.get('#password')
      .type('secret')
      .should('have.value', 'secret');
    cy.get('#login-form-submit').click();

    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');

    cy.get('#toolbar-save').click();
    cy.get('.documentFirstHeading').contains('This is a page');
  });
});
