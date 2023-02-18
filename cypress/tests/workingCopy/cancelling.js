describe('Working Copy Tests - Cancelling', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
    });
    cy.visit('/document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');
  });

  it('Basic cancelling operation', function () {
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

    // and I cancel the changes of the working copy
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Remove working copy').click();

    // The URL is the one of the baseline
    cy.url().should('eq', Cypress.config().baseUrl + '/document');

    // The Title hasn't changed and there's a success message on screen
    cy.get('h1.documentFirstHeading').should('contain', 'Test document');
    cy.contains('The working copy was discarded');

    // I can also create another working copy now
    cy.get('#toolbar-more').click();
    cy.findByLabelText('Create working copy');
  });
});
