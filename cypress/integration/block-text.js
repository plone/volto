if (Cypress.env('API') !== 'guillotina') {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
    });

    it('As editor I can add a link to a text block', function() {
      // given
      cy.wait(2000);
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block');

      // when
      cy.get('.block.inner.text .public-DraftEditor-content')
        .type('Colorless green ideas sleep furiously.')
        .setSelection('furiously');
      cy.get(
        '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
      ).click();
      cy.get('.link-form-container input').type('https://google.com{enter}');
      cy.get('#toolbar-save').click();

      // then
      cy.get('.block.text').contains('Colorless green ideas sleep furiously.');
      cy.get('.block.text a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });
  });
}
