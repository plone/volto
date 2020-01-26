if (Cypress.env('API') !== 'guillotina') {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.createContent('Document', 'link-target', 'Link Target');
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });

    it('As editor I can add a remote link to a text block', function() {
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

    it('As editor I can add an internal link to a text block', function() {
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
      cy.get('.link-form-container input').type('Link Target');
      cy.get('.link-form-container button')
        .contains('Link Target')
        .click();
      cy.get('#toolbar-save').click();

      // then
      cy.get('#view').contains('Colorless green ideas sleep furiously.');
      cy.get('#view a')
        .should('have.attr', 'href')
        .and('include', '/link-target');

      // follow the link
      cy.get('#view a').click();
      cy.url().should('include', '/link-target');
    });
  });
}
