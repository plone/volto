context('Conditional Blocks and Variations Acceptance Tests', () => {
  describe('Conditional blocks', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');
      cy.intercept('GET', '/**/News%20Item').as('schemaNews');
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.createContent({
        contentType: 'News Item',
        contentId: 'news-item',
        contentTitle: 'Test news item',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'folder',
        contentTitle: 'Test folder document',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test folder document in a path /folder',
        path: '/folder',
      });
      cy.visit('/');
      cy.wait('@content');
    });

    it('As editor I can add a block restricted only to News Items', function () {
      cy.navigate('/news-item');
      cy.wait('@content');

      cy.navigate('/news-item/edit');
      cy.wait('@schemaNews');

      cy.getSlateTitle();

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlockConditional').click({
        force: true,
      });
    });

    it('As editor I cannot add a block restricted only to News Items in a Document', function () {
      cy.navigate('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      cy.getSlateTitle();

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlockConditional').should(
        'not.exist',
      );
    });

    it('As editor I cannot add a block restricted only to /folder path', function () {
      cy.navigate('/folder/document');
      cy.wait('@content');

      cy.navigate('/folder/document/edit');
      cy.wait('@schema');

      cy.getSlateTitle();

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlockConditional').click({
        force: true,
      });
    });
  });

  describe('Variations field', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');
      cy.intercept('GET', '/**/Event').as('schemaEvent');
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.visit('/');
      cy.wait('@content');

      cy.navigate('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

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

    it('As editor I can change a variation for a block (that has conditional variations) but not in a Document', function () {
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get(
        '.blocks-chooser .mostUsed .button.testBlockWithConditionalVariations',
      ).click();

      cy.get('#field-variation').click();
      cy.findByText('Custom').click();
      cy.findByText('Custom');
    });

    it('As editor I can change a variation for a block (that has conditional variations)', function () {
      cy.createContent({
        contentType: 'Event',
        contentId: 'event',
        contentTitle: 'Test event',
      });
      cy.navigate('/event');
      cy.wait('@content');
      cy.navigate('/event/edit');
      cy.wait('@schemaEvent');

      cy.getSlateTitle();

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get(
        '.blocks-chooser .mostUsed .button.testBlockWithConditionalVariations',
      ).click();

      cy.get('#field-variation').click();
      cy.findByText('Custom modified variation').click();
      cy.findByText('Custom modified variation');
    });
  });
});
