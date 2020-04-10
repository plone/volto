if (Cypress.env('API') !== 'guillotina') {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.get(`.block.title [data-contents]`);
    });

    it('As editor I can add a link to a text block', function() {
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block');

      // when I create a link
      cy.get('.block.inner.text .public-DraftEditor-content')
        .type('Colorless green ideas sleep furiously.')
        .setSelection('furiously');
      cy.get(
        '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
      ).click();
      cy.get('.link-form-container input').type('https://google.com{enter}');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the page view should contain a link
      cy.get('.ui.container p').contains(
        'Colorless green ideas sleep furiously.',
      );
      cy.get('.ui.container p a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });

    it('As editor I can add a mailto link to a text block', function() {
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block');

      // when I create a mailto link
      cy.get('.block.inner.text .public-DraftEditor-content')
        .type('Colorless green ideas sleep furiously.')
        .setSelection('furiously');
      cy.get(
        '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
      ).click();
      cy.get('.link-form-container input').type(
        'mailto:hello@example.com{enter}',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the page view should contain a mailto link
      cy.get('.ui.container p').contains(
        'Colorless green ideas sleep furiously.',
      );
      cy.get('.ui.container p a')
        .should('have.attr', 'href')
        .and('include', 'mailto:hello@example.com');
    });
  });
}
