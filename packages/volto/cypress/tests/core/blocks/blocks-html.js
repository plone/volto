describe('Table Block Tests', () => {
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

  it('Add HTML block', () => {
    // when I add a maps block
    cy.addNewBlock('html');
    cy.get(`.block.html .npm__react-simple-code-editor__textarea`).type(
      `<pre>This is HTML</pre>`,
    );
    cy.get(`.block.html [aria-label="Preview"]`).click();
    cy.get(`.block.html pre`).contains('This is HTML');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // Check if HTML is present in the page view
    cy.get('#page-document pre').should('have.text', 'This is HTML');
  });
});
