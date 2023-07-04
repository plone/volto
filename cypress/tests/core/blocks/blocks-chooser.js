describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '*').as('saveImage');
    cy.intercept('GET', '/**/image.png/@@images/image').as('getImage');
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

  it('Add image block', () => {
    // when I add an image block
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.block.image .ui.input input[type="text"]').type(
      `https://github.com/plone/volto/raw/master/logos/volto-colorful.png{enter}`,
    );
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain the image block
    cy.get('#page-document img').should(
      'have.attr',
      'src',
      'https://github.com/plone/volto/raw/master/logos/volto-colorful.png',
    );

    cy.get('#page-document img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Press Enter on a listing block adds new autofocused default block', () => {
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.blocks-chooser .common')
      .contains('Listing')
      .click({ force: true });
    cy.get('.block-editor-listing').first().click().type('{enter}');
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });
});
