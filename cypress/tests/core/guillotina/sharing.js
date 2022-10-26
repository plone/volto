describe('Sharing Tests', () => {
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
  it('As editor I can add a page and access sharing', function () {
    // I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');

    // then a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.contains('My Page');

    // then I click on the Toolbar > More
    cy.get('#toolbar-more').click();
    cy.get('.menu-more').contains('Sharing');

    // and then I click on History
    cy.get('.menu-more a[href*="/sharing"]').contains('Sharing').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page/sharing');
    cy.contains('Sharing for');
  });
});
