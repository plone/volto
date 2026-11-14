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

  const addTestBlock = () => {
    cy.getSlate().click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.wait(100);
    cy.get('.blocks-chooser .mostUsed .button.testBlock').click();
  };

  it('As an editor I can add an item to the table, edit it in the dialog and save it', () => {
    addTestBlock();

    cy.findByLabelText('Add item').click();
    cy.get('.modal').within(() => {
      cy.findByLabelText('Title').type('First link');
      cy.findByRole('button', { name: 'Save' }).click();
    });

    cy.get('.objectlist-table-row').should('have.length', 1);
    cy.get('.objectlist-table-row').first().should('contain', 'First link');
  });

  it('As an editor I can cancel an edit and nothing changes', () => {
    addTestBlock();

    cy.findByLabelText('Add item').click();
    cy.get('.modal').within(() => {
      cy.findByLabelText('Title').type('Discarded');
      cy.findByRole('button', { name: 'Cancel' }).click();
    });

    cy.get('.objectlist-table-row').should('have.length', 0);
  });

  it('As an editor I can move an item with the item menu', () => {
    addTestBlock();

    ['First', 'Second'].forEach((title) => {
      cy.findByLabelText('Add item').click();
      cy.get('.modal').within(() => {
        cy.findByLabelText('Title').type(title);
        cy.findByRole('button', { name: 'Save' }).click();
      });
    });

    cy.findByLabelText('Actions for item #2').click();
    cy.findByRole('menuitem', { name: 'Move up' }).click();
    cy.get('.objectlist-table-row').first().should('contain', 'Second');
  });

  it('As an editor I am asked to confirm before I remove an item', () => {
    addTestBlock();

    cy.findByLabelText('Add item').click();
    cy.get('.modal').within(() => {
      cy.findByLabelText('Title').type('Kept');
      cy.findByRole('button', { name: 'Save' }).click();
    });

    cy.findByLabelText('Actions for item #1').click();
    cy.findByRole('menuitem', { name: 'Remove' }).click();
    cy.contains('Remove this item?').should('be.visible');
    cy.get('.modal').contains('button', 'Cancel').click();
    cy.get('.objectlist-table-row').should('have.length', 1);

    cy.findByLabelText('Actions for item #1').click();
    cy.findByRole('menuitem', { name: 'Remove' }).click();
    cy.get('.modal').contains('button', 'Remove').click();
    cy.get('.objectlist-table-row').should('have.length', 0);
  });

  it('As an editor I see the table inside the block settings sidebar as a list of rows', () => {
    addTestBlock();

    cy.get('#sidebar .objectlist-table').should('exist');
    cy.get('#sidebar .objectlist-table.narrow').should('exist');
  });
});
