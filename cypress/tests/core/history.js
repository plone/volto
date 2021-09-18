describe('History Tests', () => {
  beforeEach(() => {
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });
  it('As editor I can add a page and access history', function () {
    // I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('My Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Page');

    // then a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.get('.navigation .item.active').should('have.text', 'My Page');

    // then I click on the Toolbar > More
    cy.get('#toolbar-more').click();
    cy.get('.menu-more').contains('History');

    // and then I click on History
    cy.get('.menu-more a[href*="/history"]').contains('History').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page/history');
    cy.contains('History of');
  });
});
