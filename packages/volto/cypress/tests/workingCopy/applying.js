describe('Working Copy Tests - Applying', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
    });
    cy.visit('/');
    cy.wait('@content');

    cy.navigate('/document');
    cy.wait('@content');
  });

  it('Basic apply operation', function () {
    cy.intercept('PATCH', '*').as('save');
    // As a user I create a working copy from a document
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Create working copy').click();
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/working_copy_of_document',
    );

    // When I change the title of the working copy and save it
    cy.findByLabelText('Edit').click();
    cy.clearSlateTitle().type('New title');
    cy.get('#toolbar-save').click();
    cy.wait('@save');

    // and I apply the changes of the working copy on the baseline
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Apply working copy').click();

    cy.wait('@content');
    // Then rhe URL is the one of the baseline
    cy.url().should('eq', Cypress.config().baseUrl + '/document');

    // and the Title has changed and there's a success message on screen
    cy.get('h1.documentFirstHeading').contains('New title');
    cy.contains('Changes applied');

    // and I can also create another working copy now
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Create working copy');
  });

  it('Apply operation from baseline is not possible', function () {
    cy.intercept('PATCH', '*').as('save');
    // As a user I create a working copy from a document
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Create working copy').click();
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/working_copy_of_document',
    );

    // When I change the title of the working copy and save it
    cy.findByLabelText('Edit').click();
    cy.clearSlateTitle().type('New title');
    cy.get('#toolbar-save').click();
    cy.wait('@save');

    // and I navigate to the baseline and click on the more menu
    cy.navigate('/document');
    cy.wait('@content');
    cy.get('#toolbar-more').click();

    // Then the Apply menu should not be there
    cy.get('.menu-more').contains('View working copy').should('exist');
    cy.get('.menu-more').contains('Apply working copy').should('not.exist');
  });
});
