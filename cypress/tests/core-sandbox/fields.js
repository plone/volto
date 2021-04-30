context('Special fields Acceptance Tests', () => {
  describe('ObjectListWidget', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.visit('/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');
      cy.navigate('/document/edit');
      cy.get(`.block.title [data-contents]`);
    });

    it('As editor I can add a block with an objectListWidget and interact with it', function () {
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();

      // Create a new item and test it's there
      cy.findByLabelText('Add item').click();
      cy.findAllByText('Item #1').should('have.length', 1);

      // Create a new item and test it's there
      cy.findByLabelText('Add item').click();
      cy.findAllByText('Item #2').should('have.length', 1);

      // Create a new item and test it's there and the fields inside visible
      cy.findByLabelText('Add item').click();
      cy.findAllByText('Item #3').should('have.length', 1);
      cy.get(
        '[aria-labelledby="fieldset-default-field-label-href-0-slides-2"]',
      ).should('be.visible');

      // Click on the Item #2
      cy.findByText('Item #2').click();
      cy.get(
        '[aria-labelledby="fieldset-default-field-label-href-0-slides-1"]',
      ).should('be.visible');
      cy.get(
        '[aria-labelledby="fieldset-default-field-label-href-0-slides-2"]',
      ).should('not.be.visible');

      // Remove Item #3
      cy.findByLabelText('Remove item #3').click();
      cy.findAllByText('Item #3').should('have.length', 0);
    });
  });
  describe('Variation field', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.visit('/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');
      cy.navigate('/document/edit');
      cy.get(`.block.title [data-contents]`);
    });

    it('As editor I can change a variation for a block (that has variations)', function () {
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();

      cy.get('#field-variation').click();
      cy.findByText('Custom').click();
      cy.findByText('Custom');
    });
  });
  describe('ObjectBrowserWidget', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.createContent({
        contentType: 'Image',
        contentId: 'my-image',
        contentTitle: 'My Image',
        path: '/document',
      });
      cy.visit('/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');
      cy.navigate('/document/edit');
      cy.get(`.block.title [data-contents]`);
    });
    it('As editor I can add a block with an objetBrowserWidget and the context path is preserved', function () {
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();

      cy.get(
        '[aria-labelledby="fieldset-default-field-label-href"] [aria-label="Open object browser"]',
      ).click();
      cy.findByText('My Image');
      cy.findByText('/document');
    });
  });
});
