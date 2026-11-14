context('ObjectListWidget table layout Acceptance Tests', () => {
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

    cy.navigate('/document/edit');
    cy.wait('@schema');

    cy.getSlateTitle();
  });

  // Scoped to the object list that renders the table, so another object list
  // on the page (or in the sidebar) can never match.
  const table = () => cy.get('.objectlist-widget:has(.objectlist-table)');

  const addTestBlock = () => {
    cy.getSlate().click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.wait(100);
    cy.get('.blocks-chooser .mostUsed .button.testBlockTable').click();
  };

  const addItem = (title) => {
    table().within(() => {
      cy.findByLabelText('Add link').click();
    });
    cy.get('.modal').within(() => {
      cy.findByLabelText('Title').type(title);
      cy.findByRole('button', { name: 'Save' }).click();
    });
  };

  it('As an editor I can add an item to the table, edit it in the dialog and save it', () => {
    addTestBlock();

    addItem('First link');

    table().within(() => {
      cy.get('.objectlist-table-row').should('have.length', 1);
      cy.get('.objectlist-table-row').first().should('contain', 'First link');
    });
  });

  it('As an editor I can cancel an edit and nothing changes', () => {
    addTestBlock();

    table().within(() => {
      cy.findByLabelText('Add link').click();
    });
    cy.get('.modal').within(() => {
      cy.findByLabelText('Title').type('Discarded');
      cy.findByRole('button', { name: 'Cancel' }).click();
    });

    table().within(() => {
      cy.get('.objectlist-table-row').should('have.length', 0);
    });
  });

  it('As an editor I can move an item with the item menu', () => {
    addTestBlock();

    addItem('First');
    addItem('Second');

    table().within(() => {
      cy.findByLabelText('Actions for item #2').click();
      cy.findByRole('menuitem', { name: 'Move up' }).click();
      cy.get('.objectlist-table-row').first().should('contain', 'Second');
    });
  });

  it('As an editor I am asked to confirm before I remove an item', () => {
    addTestBlock();

    addItem('Kept');

    table().within(() => {
      cy.findByLabelText('Actions for item #1').click();
      cy.findByRole('menuitem', { name: 'Remove' }).click();
    });
    cy.contains('Remove this item?').should('be.visible');
    cy.get('.modal').contains('button', 'Cancel').click();
    table().within(() => {
      cy.get('.objectlist-table-row').should('have.length', 1);
    });

    table().within(() => {
      cy.findByLabelText('Actions for item #1').click();
      cy.findByRole('menuitem', { name: 'Remove' }).click();
    });
    cy.get('.modal').contains('button', 'Remove').click();
    table().within(() => {
      cy.get('.objectlist-table-row').should('have.length', 0);
    });
  });

  it('As an editor I see the table inside the block settings sidebar as a list of rows', () => {
    addTestBlock();

    cy.get('#sidebar').within(() => {
      cy.get('.objectlist-table').should('exist');
    });
  });

  it('As an editor I am shown the item with errors after a failed save', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'table-document',
      contentTitle: 'Table document',
      bodyModifier: (body) => ({
        ...body,
        blocks: {
          tbl: {
            '@type': 'testBlockTable',
            tableItems: [{ '@id': 'item-1', href: 'https://example.org' }],
          },
        },
        blocks_layout: { items: ['tbl'] },
      }),
    });
    // Visit the new document first, as the other cases do, then open its edit
    // view. The intercepts are registered in beforeEach, before any visit.
    cy.visit('/table-document');
    cy.wait('@content');
    cy.navigate('/table-document/edit');
    cy.wait('@schema');
    cy.get('.block-editor-testBlockTable', { timeout: 10000 }).click();

    cy.get('#toolbar-save').click();

    cy.get('.modal').within(() => {
      cy.contains('Link #1').should('be.visible');
      cy.contains('Title: Required input is missing.').should('be.visible');
    });
  });
});
