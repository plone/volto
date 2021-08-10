describe('Object Browser Tests', () => {
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
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Second Page',
    });
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/my-page-1',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
    cy.get(`.block.title [data-contents]`);
  });

  it('As editor I can add the relative url in search box in sidebar', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('/my-page-1');
    cy.findByLabelText('Select my-image').dblclick();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('eq', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I can add the full url in search box in sidebar', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('http://localhost:55001/my-page-1');
    cy.findByLabelText('Select my-image').dblclick();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('eq', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I get focus on search box in sidebar when clicking on lens icon', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').should('be.focused');
  });
});
