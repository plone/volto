describe('Title Block Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
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

  it('Title block has focus when editing the page a second time', () => {
    cy.get('.ui.button.cancel').click();
    cy.get('.toolbar-actions .edit').click();
    cy.get('.block-editor-title [role=textbox]').should('be.focused');
    cy.get('.block-editor-title [role=textbox]').type('{enter}');
    cy.get('.block-editor-title [role=textbox]').should('not.be.focused');
  });
});
