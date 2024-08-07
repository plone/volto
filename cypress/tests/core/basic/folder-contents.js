describe('Folder Contents Tests', () => {
  beforeEach(() => {
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
      path: 'my-folder',
    });
    cy.visit('/my-folder/contents');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
  });

  it('Renaming via folder contents view', () => {
    // when I rename a content object
    cy.get('svg[class="icon unchecked"]').click();
    cy.get('svg[class="icon rename"]').click();
    cy.get('input[name="0_title"]').clear().type('Brand new document title');
    cy.get('input[name="0_id"]').clear().type('brand-new-document-title');
    cy.get('.modal button[title="Save"]').click();

    // then the new document title and ID should show up in the folder contents view
    cy.get('#content-core table')
      .contains('Brand new document title')
      .should('have.attr', 'href')
      .and('eq', '/my-folder/brand-new-document-title/contents');
  });

  it('Copying the content in the same folder', () => {
    cy.get('svg[class="icon unchecked"]').click();
    cy.get('svg[class="icon copy"]').click();
    cy.get('svg[class="icon paste"]').click();
    cy.get('.icon.unchecked').should('have.length', 2);
  });

  it('Cuting the item and pasting into others', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder',
    });
    cy.visit('my-folder/contents');
    cy.get('tbody>tr:nth-child(2) .unchecked').click();
    cy.get('svg[class="icon cut"]').click();
    cy.get('tbody>tr:nth-child(1) .expire-align > span').click();
    cy.get('svg[class="icon paste"]').click();

    //then their should be a My child
    cy.get('#content-core table').contains('My Child');
  });

  it('Deleting a item from a folder', () => {
    cy.get('svg[class="icon unchecked"]').click();
    cy.get('svg[class="icon delete"]').click();
    cy.get('.ui.primary.button').click();

    // then the folder content must be empty
    cy.get('.icon.unchecked').should('have.length', 0);
  });

  it('Changing Content State', () => {
    // when changing the state from private to publish
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder/my-document',
    });
    cy.get('svg[class="icon unchecked"]').click();
    cy.get('svg[class="icon semaphore"]').click();
    cy.get('#field-state').click().type('Publish{enter}');
    cy.get('.checkbox').click();
    cy.get('button[title="Save"]').click();

    // then the content must change its state from private to publish
    // and its child also
    cy.get('#content-core table').contains('Published');
    cy.visit('/my-folder/my-document/contents');
    cy.get('#content-core table').contains('Published');
  });

  it('Sort method by creation field', () => {
    // when sort method invoked using creation field
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder',
    });
    cy.visit('my-folder/contents');
    cy.get('.icon.configuration-svg').click();
    cy.get('.sort_CreationDate').invoke('trigger', 'mouseover');
    cy.get('.item.sort_created_descending').click({ force: true });

    // then the last document created must be the firs element
    cy.get('tbody>tr:nth-child(1) .expire-align > span').should(
      'have.text',
      ' My Child',
    );
  });

  it('Remember indexes', () => {
    // Add the tags index.
    cy.visit('my-folder/contents')
      .get('.selectIndex > .icon')
      .click()
      .get('.icon.Creator')
      .click()
      .get('thead tr')
      .contains('Creator');

    // Tags index shows up on visiting another folder-contents view.
    cy.get('.folder-contents .breadcrumb a.section').first().click();
    cy.url().should('eq', Cypress.config().baseUrl + '/contents');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.get('thead tr').contains('Creator');
  });
  it('Move items to top of folder and bottom of folder', () => {
    // creating a Document
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder',
    });

    // doing copy paste for dummy data
    cy.get('svg[class="icon unchecked"]').click();
    cy.get('svg[class="icon copy"]').click();
    var genArr = Array.from({ length: 56 }, (v, k) => k + 1);
    cy.wrap(genArr).each((index) => {
      cy.get('svg[class="icon paste"]').click({ force: true });
    });
    cy.wait(2000); // just for clearing of toast

    // after adding 56 page I need to add a final page to move around.
    // when I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle()
      .focus()
      .click()
      .type('last and first page')
      .contains('last and first page');

    // then a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/my-folder/last-and-first-page',
    );
    cy.visit('my-folder/contents');
    cy.get('.contents-pagination .menu').findByText('2').click();

    cy.get(
      'tr[aria-label="/my-folder/last-and-first-page"] svg[class="icon dropdown-popup-trigger"]',
    ).click();
    cy.findByText('Move to top of folder').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-folder/contents');
    cy.wait(1000); // waiting for settling of odering or search return

    // Checking if move to top of folder works or not.
    cy.get('table tbody tr:first-child a span').findByText(
      'last and first page',
    );
    cy.get(
      'tr[aria-label="/my-folder/last-and-first-page"] svg[class="icon dropdown-popup-trigger"]',
    ).click();
    cy.findByText('Move to bottom of folder').click();

    // Checking whether moving to bottom of folder works or not.
    cy.get('.contents-pagination .menu').findByText('2').click();
    cy.get('table tbody tr:last-child a span').findByText(
      'last and first page',
    );

    // Now doing for filtering by searhing content and moving them
    cy.visit('my-folder/contents');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-folder/contents');
    cy.get('.ui.small.transparent.input input').type('last');
    cy.get(
      'tr[aria-label="/my-folder/last-and-first-page"] svg[class="icon dropdown-popup-trigger"]',
    ).click();
    // cy.intercept('GET', '/plone/++api++/my-folder/@search').as('getSearch'); // I don't know proper way to wait
    cy.findByText('Move to top of folder').click();
    cy.get('.search.item button').click();

    // Checking if move to top of folder works or not.
    cy.get('table tbody tr:first-child a span').findByText(
      'last and first page',
    );
    cy.get(
      'tr[aria-label="/my-folder/last-and-first-page"] svg[class="icon dropdown-popup-trigger"]',
    ).click();
    cy.findByText('Move to bottom of folder').click();
    cy.get('.contents-pagination .menu').findByText('2').click();

    // Checking whether moving to bottom of folder works or not.
    cy.get('table tbody tr:last-child a span').findByText(
      'last and first page',
    );
  });
});
