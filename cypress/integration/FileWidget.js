if (Cypress.env('API') !== 'guillotina') {
  describe('FileWidget Test', () => {
    beforeEach(() => {
      cy.autologin();
      cy.visit('/');
    });

    it('As editor I am able to see the preview of uploading image', () => {
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-news-item').click();
      cy.fixture('image.png').then((fileContent) => {
        cy.get('input[type="file"]').upload(
          {
            fileContent,
            fileName: 'image.png',
            mimeType: 'image/png',
          },
          { subjectType: 'input' },
        );
      });

      cy.get('#field-image-image').should('have.attr', 'src');
    });
  });
}
