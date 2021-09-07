describe('Document locking', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.createUser({ username: 'editor1', fullname: 'Editor 1' });
    cy.createUser({ username: 'editor2', fullname: 'Editor 2' });
    cy.visit('/');
  });

  afterEach(() => {
    cy.removeUser('editor1');
    cy.removeUser('editor2');
  });

  it('As editor, a page is locked for other users when I edit that page', function () {
    // As an editor I can add a document
    cy.autologin('editor1');
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

    // As an editor I can lock a document when Edit
    cy.findByLabelText('Edit').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document/edit');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.visit('/logout');

    // As another editor I can see the locked document
    cy.autologin('editor2');
    cy.visit('/document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('This item was locked by Editor 1 on');
  });

  it('As editor, I can see when a page is currently edited by another user', function () {
    // As an editor I can add a document
    cy.autologin('editor1');
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

    // As an editor I can lock a document when Edit
    cy.findByLabelText('Edit').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document/edit');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.visit('/logout');

    // As another editor I can see the locked document
    cy.autologin('editor2');
    cy.visit('/document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('This item was locked by Editor 1 on');
    cy.findByLabelText('Unlock');
  });

  it('As editor, I can unlock a locked page', function () {
    // As an editor I can add a document
    cy.autologin('editor1');
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

    // As an editor I can lock a document when Edit
    cy.findByLabelText('Edit').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document/edit');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.visit('/logout');

    // As another editor I can see the locked document
    cy.autologin('editor2');
    cy.visit('/document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('This item was locked by Editor 1 on');

    // As another editor I can unlock the document
    cy.findByLabelText('Unlock').click();
    cy.findByLabelText('Edit').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document/edit');

    // As another editor I can edit the document
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .clear()
      .type('New title by Editor 2');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document');
    cy.get('h1.documentFirstHeading').contains('New title by Editor 2');
  });
});
