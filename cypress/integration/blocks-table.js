if (Cypress.env('API') !== 'guillotina') {
  describe('Table Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');
      cy.get(`.block.title [data-contents]`);
    });

    it('As editor I can add a Table Block', () => {
      // when I add a Table Block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.ui.buttons .button.table').click();
      cy.get('.celled.fixed.table tr th:first-child()')
        .click()
        .type('column 1 / row 1');
      cy.get('.celled.fixed.table tr th:nth-child(2)')
        .click()
        .type('column 2 / row 1');
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()')
        .click()
        .type('column 1 / row 2');
      cy.get('.celled.fixed.table tr:nth-child(2) td:nth-child(2)')
        .click()
        .type('column 2 / row 2');
      cy.get('button[title="Insert col after"]').click();
      cy.get('button[title="Insert row after"]').click();
      cy.get('button[title="Insert row before"]').click();
      cy.get('button[title="Insert col before"]').click();

      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

      // then a new Table Block has been added to the page
      cy.get('.celled.fixed.table tr th:first-child()').contains(
        'column 1 / row 1',
      );
      cy.get('.celled.fixed.table tr th:nth-child(3)').contains(
        'column 2 / row 1',
      );
      cy.get('.celled.fixed.table tr:nth-child(3) td:first-child()').contains(
        'column 1 / row 2',
      );
      cy.get('.celled.fixed.table tr:nth-child(3) td:nth-child(3)').contains(
        'column 2 / row 2',
      );

      // Edit
      cy.visit('/my-page/edit');
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click();

      // without the second click the test fails. so this makes the test green.
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click();

      cy.get('button[title="Delete col"]').click();
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(3)').click();
      cy.get('button[title="Delete col"]').click();
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()').click();
      cy.get('button[title="Delete row"]').click();
      cy.get('.celled.fixed.table tr:nth-child(3) td:first-child()').click();
      cy.get('button[title="Delete row"]').click();

      // Save
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

      //View
      cy.get('.celled.fixed.table tr th:first-child()').contains(
        'column 1 / row 1',
      );
      cy.get('.celled.fixed.table tr th:nth-child(2)').contains(
        'column 2 / row 1',
      );
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()').contains(
        'column 1 / row 2',
      );
      cy.get('.celled.fixed.table tr:nth-child(2) td:nth-child(2)').contains(
        'column 2 / row 2',
      );
    });
  });
}
