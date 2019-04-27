context('Actions', () => {
  beforeEach(() => {
    cy.autologin();
  });
  it('As a site administrator I can add a page', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');

    cy.get('#toolbar-save').click();
    cy.get('.navigation .item.active').should('have.text', 'This is a page');
  });
});
