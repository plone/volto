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

    // I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');

    // then a new page has been created
    cy.get('#toolbar-save').click();
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

  it('As editor, I can share a page to another user', function () {
    cy.intercept('/**/@logout').as('logout');
    cy.intercept('/**/@sharing').as('sharing');

    // Click on the Toolbar > More
    cy.findByRole('button', { name: /more/i }).click();
    cy.findByRole('link', { name: /sharing/i }).click();
    cy.wait('@sharing');

    // TODO: Need a unique label here. Site search name is also 'SearchableText'
    // Search for the test user
    cy.findByPlaceholderText(/search for user or group/i)
      .type('test')
      .closest('form')
      .submit();

    // Give the test user view permissions
    cy.findByRole('cell', { name: 'test_user_1_ (test-user)' })
      .parents('tr')
      .within(() => {
        // TODO: Manually pressing the label is needed because the label isn't associated with the input!
        // See https://github.com/plone/volto/pull/1415 for a fix.
        // The 'view' role is the 2nd row. Cypress isn't great with tables
        cy.findAllByRole('checkbox', { value: 'test_user_1_:Reviewer' })
          .eq(2)
          .parents('.checkbox')
          .click();
      });

    cy.findByRole('button', { name: /save/i }).click();
    cy.wait('@sharing');

    cy.visit('/logout');
    cy.wait('@logout');

    cy.autologin('test-user', 'correct horse battery staple');
    cy.visit('/my-page');
    cy.findByRole('heading', { name: /my page/i }).should('exist');
  });
});
