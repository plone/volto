describe('Basic Cypress Test', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'page',
      contentTitle: 'A page',
      transition: 'publish',
    });
    cy.visit('/');
  });

  it('should visit the @@edit URL', () => {
    cy.visit('/@@edit/page');
    cy.url().should('eq', Cypress.config().baseUrl + '/@@edit/page');
    cy.get('h1[data-placeholder="Type a title…"]')
      .should('exist')
      .should('have.text', 'A page');
    cy.get('.slate-editor').should('exist').click();
    cy.get(
      '.slate-editor[contenteditable="true"] [data-slate-node="element"]',
    ).type('This is the body text{enter}');
    cy.getPlateEditor('[data-slate-editor]').then((editor) => {
      // editor is the same object stored in EDITABLE_TO_EDITOR
    });

    cy.plateSetSelection({
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 5 },
    }); // or pass { editable: '.some-editor' } if multiple

    cy.get('[role="toolbar"]').should('be.visible');
  });
});
