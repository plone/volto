describe('Sharing Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');

    // I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');

    // then a new page has been created
    cy.get('#toolbar-save').click();
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.get('.navigation .item.active').should('have.text', 'My Page');
  });

  it('As editor I can add a page and access sharing', function () {
    // then I click on the Toolbar > More
    cy.get('#toolbar-more').click();
    cy.get('.menu-more').contains('Sharing');

    // and then I click on History
    cy.get('.menu-more a[href*="/sharing"]').contains('Sharing').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page/sharing');
    cy.contains('Sharing for');
  });
});
