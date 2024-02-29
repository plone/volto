context('Slots', () => {
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
      cy.createContent({
        contentType: 'Document',
        contentId: 'hello',
        contentTitle: 'Test document Hello',
      });

      cy.visit('/');
      cy.wait('@content');
    });

    it('[ContentTypeCondition(["Document"]), RouteCondition("/hello")] only renders when the predicates are true', function () {
      cy.get('body').should(
        'not.include.text',
        'This is a test slot component',
      );

      cy.navigate('/document');
      cy.wait('@content');

      cy.get('body').should(
        'not.include.text',
        'This is a test slot component',
      );

      cy.navigate('/hello');
      cy.wait('@content');

      cy.get('body').should('include.text', 'This is a test slot component');
    });
  });
});
