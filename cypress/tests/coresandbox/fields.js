context('Special fields Acceptance Tests', () => {
  describe('Form with default values', () => {
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
      cy.getSlateTitle();
    });

    it('As an editor I can add a block that has default values', () => {
      cy.intercept('PATCH', '/**/document').as('save');
      cy.intercept('GET', '/**/@types/Document').as('schema');
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.wait(100);
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();

      cy.findByLabelText('Field with default').click();
      cy.get('#field-firstWithDefault').should(
        'have.value',
        'Some default value',
      );

      cy.findByLabelText('Add item').click();
      cy.findAllByText('Item #1').should('have.length', 1);

      cy.findByLabelText('Extra').should('have.value', 'Extra default');
      cy.get('#toolbar-save').click();
      cy.wait('@save');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      cy.findAllByText('Test Block Edit').click();

      cy.get('#field-firstWithDefault').should(
        'have.value',
        'Some default value',
      );
      cy.findByLabelText('Extra').should('have.value', 'Extra default');

      cy.getContent({ path: '/document' }).should((response) => {
        const { body } = response;
        const [, testBlock] = Object.entries(body.blocks).find(
          ([, block]) => block['@type'] === 'testBlock',
        );
        expect(testBlock.style).to.deep.equal({ color: 'red' });
        expect(testBlock.slides[0].extraDefault).to.deep.equal('Extra default');
      });
    });
  });

  describe('HTML Richtext Widget', () => {
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
      cy.getSlateTitle();
    });

    it('Handles whitespaces properly', () => {
      cy.intercept('PATCH', '/**/document').as('save');
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();
      cy.get('#fieldset-default-field-label-html').click();
      cy.get('.slate_wysiwyg_box [contenteditable=true]').type(
        '   hello   world   ',
      );
      cy.get('#toolbar-save').click();
      cy.wait('@save');

      cy.get('.test-block').should(
        'contain.text',
        '<p>   hello   world   </p>',
      );
    });
  });

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
      cy.getSlateTitle();
    });

    it('As editor I can add a block with an objectListWidget and interact with it', function () {
      cy.getSlate().click();
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
      cy.getSlateTitle();
    });

    it('As editor I can change a variation for a block (that has variations)', function () {
      cy.getSlate().click();
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
      cy.getSlateTitle();
    });

    it('As editor I can add a block with an objetBrowserWidget and the context path is preserved', function () {
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();

      cy.get(
        '[aria-labelledby="fieldset-default-field-label-href"] [aria-label="Open object browser"]',
      ).click();
      cy.findByText('My Image');
      cy.findByText('document');
    });
  });
});
