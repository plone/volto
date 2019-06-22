context('Actions', () => {
  beforeEach(() => {
    cy.autologin();
  });

  it.only('As a site administrator I can add a page with text', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');
    cy.get('.documentDescription > .public-DraftStyleDefault-block')
      .type('This is the text')
      .type('{shift}{enter}')
      .type('line one')
      .type('{shift}{enter}')
      .type('line two')
      .type('{shift}{enter}')
      .type('line three');
    const expectedMultiLine = [
      'This is the text',
      'line one',
      'line two',
      'line three',
    ].join('\n');
    cy.get('.ui.description > .tile').should($div =>
      expect($div[0].innerText).equal(expectedMultiLine),
    );

    cy.get('#toolbar-save').click();
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'This is a page');
      cy.get('.documentDescription').should($div =>
        expect($div[0].innerText).equal(expectedMultiLine),
      );
    } else {
      cy.contains('This is a page');
      cy.contains('This is the text');
    }
  });
});
