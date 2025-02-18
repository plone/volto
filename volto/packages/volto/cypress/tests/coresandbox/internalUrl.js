context('Internal Url ', () => {
  describe('Internal Url Widget is updating after block has been updated with new data via onChangeBlock.', () => {
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
    });

    it('Internal Url Widget is updating after block has been updated with new data via onChangeBlock.', function () {
      cy.visit('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      // Add input block
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title').contains('Common').click();
      cy.get('.blocks-chooser .common')
        .contains('Input')
        .click({ force: true });
      cy.get('#input_block').type('link-test.com');
      cy.get('#add_link').click();
      cy.get('#field-url').should('have.value', 'link-test.com');
    });
  });
});
