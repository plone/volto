describe('Table Block Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('Add table block', () => {
    cy.intercept('PATCH', '*').as('save');

    // Edit
    cy.addNewBlock('table');

    // Wait for table editor to appear instead of hardcoded wait
    cy.get('.block-editor-slateTable [role=textbox]').should('be.visible');

    // No border in input
    cy.get('.block-editor-slateTable [role=textbox]')
      .first()
      .click()
      .should('have.css', 'outline-style', 'none');

    cy.get(
      '.celled.fixed.table thead tr th:first-child() [contenteditable="true"]',
    )
      .click()
      .type('column 1 / row 1');

    cy.get(
      '.celled.fixed.table thead tr th:nth-child(2) [contenteditable="true"]',
    )
      .click()
      .type('column 2 / row 1');

    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:first-child() [contenteditable="true"]',
    )
      .click()
      .type('column 1 / row 2');

    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:nth-child(2) [contenteditable="true"]',
    )
      .click()
      .type('column 2 / row 2');

    cy.get('button[title="Insert col after"]').click();
    cy.get('button[title="Insert row after"]').click();
    cy.get('button[title="Insert row before"]').click();
    cy.get('button[title="Insert col before"]').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    // Wait for table to be visible before asserting
    cy.get('.celled.fixed.table').should('be.visible');

    // View
    cy.get('.celled.fixed.table thead tr th:first-child()').should(
      'contain',
      'column 1 / row 1',
    );
    cy.get('.celled.fixed.table thead tr th:nth-child(3)').should(
      'contain',
      'column 2 / row 1',
    );
    cy.get('.celled.fixed.table tbody tr:nth-child(2) td:first-child()').should(
      'contain',
      'column 1 / row 2',
    );
    cy.get('.celled.fixed.table tbody tr:nth-child(2) td:nth-child(3)').should(
      'contain',
      'column 2 / row 2',
    );

    // Edit
    cy.visit('/my-page/edit');
    cy.wait('@schema');
    cy.wait('@content');

    // Wait for toolbar to be visible — this is the last reliable signal
    // that all async chunks have finished loading
    cy.get('#toolbar-save').should('be.visible');

    // Wait for the table and the target cell to be fully interactive.
    // Using a generous timeout since chunk loading in CI can be slow.
    cy.get('.celled.fixed.table', { timeout: 15000 }).should('be.visible');
    cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)', {
      timeout: 15000,
    })
      .should('be.visible')
      .and('not.be.disabled');

    cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click({
      waitForAnimations: false,
    });

    // without the second click the test fails. so this makes the test green.
    cy.get(
      '.celled.fixed.table thead tr:first-child() th:nth-child(2)',
    ).click();

    cy.get('button[title="Delete col"]').click();
    cy.get(
      '.celled.fixed.table thead tr:first-child() th:nth-child(3)',
    ).click();
    cy.get('button[title="Delete col"]').click();
    cy.get(
      '.celled.fixed.table tbody tr:first-child() td:first-child()',
    ).click();
    cy.get('button[title="Delete row"]').click();
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(2) td:first-child()',
    ).click();
    cy.get('button[title="Delete row"]').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    // Wait for table to be visible before asserting
    cy.get('.celled.fixed.table').should('be.visible');

    // View
    cy.get('.celled.fixed.table thead tr th:first-child()').should(
      'contain',
      'column 1 / row 1',
    );
    cy.get('.celled.fixed.table thead tr th:nth-child(2)> p ').should(
      'have.text',
      'column 2 / row 1',
    );
    cy.get(
      '.celled.fixed.table tbody tr:first-child() td:first-child()',
    ).should('contain', 'column 1 / row 2');
    cy.get('.celled.fixed.table tbody tr:first-child() td:nth-child(2)').should(
      'contain',
      'column 2 / row 2',
    );
  });
});
