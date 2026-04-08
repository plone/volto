context('Block Default View / Edit Acceptance Tests', () => {
  describe('Block Default View / Edit', () => {
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

      cy.visit('/');
      cy.wait('@content');

      cy.navigate('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      cy.getSlateTitle();
    });

    it('I can add a block with Default View / Edit based on schema and interact with it', function () {
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlockDefaultView').click({
        force: true,
      });

      cy.get('#field-fieldAfterObjectList')
        .click()
        .type('Colorless green ideas sleep furiously.');

      cy.get('.page-block').contains('Colorless green ideas sleep furiously.');

      cy.get('#toolbar-save').click();
      cy.get('[id="page-document"]').contains(
        'Colorless green ideas sleep furiously.',
      );
    });
  });
});
