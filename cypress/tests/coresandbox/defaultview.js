context('Block Default View / Edit Acceptance Tests', () => {
  describe('Block Default View / Edit', () => {
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

    it('I can add a block with Default View / Edit based on schema and interact with it', function () {
      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.testBlockDefaultView').click();

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
