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
    cy.log('when I add a text block');
    cy.getSlateEditorAndType('My text').contains('My text');
    cy.toolbarSave();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain the text block
    cy.get('#page-document p').contains('My text');
  });

  it('As editor I can add a link to a text block', function () {
    cy.get('.block.inner.title .documentFirstHeading');

    cy.log('when I create a link');

    cy.getSlateEditorAndType(
      'Colorless green ideas sleep furiously.',
    ).setSlateSelection('furiously');
    cy.clickSlateButton('Add link');
    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );
    cy.toolbarSave();

    cy.log('then the page view should contain a link');

    cy.get('.ui.container p').contains(
      'Colorless green ideas sleep furiously.',
    );
    cy.get('.ui.container p a')
      .should('have.text', 'furiously')
      .and('have.attr', 'href')
      .and('include', 'https://google.com');
  });

  it('As editor I can add a mailto link to a text block', function () {
    cy.getSlateTitle();

    cy.log('when I create a mailto link');
    cy.getSlateEditorAndType(
      'Colorless green ideas sleep furiously.',
    ).setSlateSelection('furiously');

    cy.clickSlateButton('Add link');
    cy.get('.slate-toolbar .link-form-container input').type(
      'mailto:hello@example.com{enter}',
    );
    cy.toolbarSave();

    cy.log('then the page view should contain a mailto link');
    cy.get('.ui.container p').contains(
      'Colorless green ideas sleep furiously.',
    );
    cy.get('.ui.container p a')
      .should('have.text', 'furiously')
      .and('have.attr', 'href')
      .and('include', 'mailto:hello@example.com');
  });
});
