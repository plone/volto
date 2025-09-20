describe('Slate Backspace Behavior', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('Backspace at start of second block deletes it and merges content into first block', () => {
    cy.getSlateEditorAndType('First block text');

    cy.addNewBlock('slate');
    cy.getSlateEditorAndType('Second block text');

    cy.getSlate().setCursorBefore('Second').type('{backspace}');

    cy.get('.content-area .slate-editor [contenteditable=true]')
      .should('have.length', 1)
      .should('contain', 'First block text')
      .should('contain', 'Second block text');
  });
});
