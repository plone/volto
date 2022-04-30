describe('Form Undo/Redo', () => {
  const clickUndo = () => {
    cy.get('.toolbar-bottom [aria-label=Undo]').click();
  };

  const clickRedo = () => {
    cy.get('.toolbar-bottom [aria-label=Redo]').click();
  };

  beforeEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');

    // // Waiting for the lazy loading draftJS to happen
    cy.get('.block.inner.text .public-DraftEditor-content').should('exist');
  });

  it('Undo/Redo form', () => {
    // when I add a text block
    cy.get('.block.inner.text .public-DraftEditor-content')
      .click()
      .type('My text')
      .get('span[data-text]')
      .contains('My text');

    clickUndo();

    cy.get('.block.inner.text .public-DraftEditor-content')
      .should('have.text', 'My tex')
      .and('not.have.text', 'My text');

    clickUndo();

    cy.get('.block.inner.text .public-DraftEditor-content')
      .should('have.text', 'My te')
      .and('not.have.text', 'My tex');

    clickRedo();

    cy.get('.block.inner.text .public-DraftEditor-content')
      .should('have.text', 'My tex')
      .and('not.have.text', 'My text');

    clickRedo();

    cy.get('.block.inner.text .public-DraftEditor-content').should(
      'have.text',
      'My text',
    );

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');

    // then the page view should contain the text block
    cy.get('#page-document p').contains('My text');
  });
});
