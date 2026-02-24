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

    cy.get('.block-editor-slateTable [role=textbox]').should('be.visible');

    // No border in input
    cy.get('.block-editor-slateTable [role=textbox]')
      .first()
      .click()
      .should('have.css', 'outline', 'rgba(0, 0, 0, 0.87) none 0px');

    cy.get(
      '.celled.fixed.table thead tr th:first-child() [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 1 / row 1')
      .should('have.text', 'column 1 / row 1');

    cy.get(
      '.celled.fixed.table thead tr th:nth-child(2) [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 2 / row 1')
      .should('have.text', 'column 2 / row 1');

    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:first-child() [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 1 / row 2')
      .should('have.text', 'column 1 / row 2');

    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:nth-child(2) [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 2 / row 2')
      .should('have.text', 'column 2 / row 2');

    cy.get('button[title="Insert col after"]').click();
    cy.get('button[title="Insert row after"]').click();
    cy.get('button[title="Insert row before"]').click();
    cy.get('button[title="Insert col before"]').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

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

    cy.intercept('GET', `/**/*?expand*`).as('content2');
    cy.intercept('GET', '/**/Document').as('schema2');
    cy.intercept('GET', '**/Widgets.chunk.js').as('widgets');

    cy.visit('/my-page/edit');
    cy.wait('@schema2');
    cy.wait('@content2');

    cy.wait('@widgets');

    cy.get('#toolbar-save').should('be.visible');
    cy.get('.celled.fixed.table').should('be.visible');
    cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)')
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
    cy.wait('@content2');
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
