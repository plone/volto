describe('Text Block Tests', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  it('As editor I can add a text block', () => {
    // when I add a text block
    cy.getSlate().focus().click().type('My text').contains('My text');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');

    // then the page view should contain the text block
    cy.get('#page-document p').contains('My text');
  });

  // TODO: Use link from volto-slate
  // it('As editor I can add a link to a text block', function () {
  //   cy.get('.block.inner.title .documentFirstHeading');

  //   // when I create a link
  //   cy.getSlate()
  //     .focus()
  //     .click()
  //     .type('Colorless green ideas sleep furiously.')
  //     .setSlateSelection('furiously');
  //   // TODO: LINK
  //   cy.get(
  //     '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
  //   ).click();
  //   cy.get('.link-form-container input').type('https://google.com{enter}');
  //   cy.get('#toolbar-save').click();
  //   cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
  //   cy.waitForResourceToLoad('@navigation');
  //   cy.waitForResourceToLoad('@breadcrumbs');
  //   cy.waitForResourceToLoad('@actions');
  //   cy.waitForResourceToLoad('@types');
  //   cy.waitForResourceToLoad('my-page');

  //   // then the page view should contain a link
  //   cy.get('.ui.container p').contains(
  //     'Colorless green ideas sleep furiously.',
  //   );
  //   cy.get('.ui.container p a')
  //     .should('have.attr', 'href')
  //     .and('include', 'https://google.com');
  // });

  // it('As editor I can add a mailto link to a text block', function () {
  //   cy.getSlateTitle()

  //   // when I create a mailto link
  //   cy.getSlate()
  //     .focus()
  //     .click()
  //     .type('Colorless green ideas sleep furiously.')
  //     .setSlateSelection('furiously');
  //   // TODO: LINK
  //   cy.get(
  //     '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
  //   ).click();
  //   cy.get('.link-form-container input').type(
  //     'mailto:hello@example.com{enter}',
  //   );
  //   cy.get('#toolbar-save').click();
  //   cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
  //   cy.waitForResourceToLoad('@navigation');
  //   cy.waitForResourceToLoad('@breadcrumbs');
  //   cy.waitForResourceToLoad('@actions');
  //   cy.waitForResourceToLoad('@types');
  //   cy.waitForResourceToLoad('my-page');

  //   // then the page view should contain a mailto link
  //   cy.get('.ui.container p').contains(
  //     'Colorless green ideas sleep furiously.',
  //   );
  //   cy.get('.ui.container p a')
  //     .should('have.attr', 'href')
  //     .and('include', 'mailto:hello@example.com');
  // });
});
