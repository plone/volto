context('Widgets Acceptance Tests', () => {
  describe('Image widget', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');
      // given a logged in editor and a page in edit mode
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
      cy.visit('/');
      cy.wait('@content');

      cy.navigate('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      cy.getSlateTitle();
    });

    it('As an editor I can add an existing image content using the image widget', () => {
      cy.intercept('PATCH', '/**/document').as('save');
      cy.intercept('GET', '/**/@types/Document').as('schema');
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.wait(100);
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();
      cy.findByLabelText('Add item').click();
      cy.findByLabelText('Enter a URL to an image').click();
      cy.get('input[placeholder="Enter a URL to an image"]').type(
        '/plone/document/my-image{enter}',
      );

      cy.get('.image-upload-widget-image > img')
        .should('have.attr', 'src')
        .and('include', '/document/my-image/@@images/image/teaser');
      cy.get('.image-upload-widget-toolbar svg').click();
      cy.get('.image-upload-widget-image > img').should('not.exist');
    });

    it('As an editor I can add an external image using the image widget', () => {
      cy.intercept('PATCH', '/**/document').as('save');
      cy.intercept('GET', '/**/@types/Document').as('schema');
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.wait(100);
      cy.get('.blocks-chooser .mostUsed .button.testBlock').click();
      cy.findByLabelText('Add item').click();
      cy.findByLabelText('Enter a URL to an image').click();
      cy.get('input[placeholder="Enter a URL to an image"]').type(
        'https://github.com/plone/volto/raw/main/logos/volto-colorful.png{enter}',
      );
      cy.get('.image-upload-widget-image > img')
        .should('have.attr', 'src')
        .and(
          'include',
          'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
        );
      cy.get('.image-upload-widget-toolbar svg').click();
      cy.get('.image-upload-widget-image > img').should('not.exist');
    });
  });
});
