import { slateBeforeEach } from '../../../support/volto-slate';

describe('Block Tests: pasting content in table block', () => {
  beforeEach(slateBeforeEach);

  it('should paste text', function () {
    cy.intercept('PATCH', '/**/my-page').as('save');

    // Paste
    cy.getTableSlate(true)
      .focus()
      .click()
      .pasteClipboard('Some Text from Clipboard');

    cy.getTableSlate()
      .focus()
      .click()
      .pasteClipboard('Some Text from Clipboard');

    // Save
    cy.toolbarSave();
    cy.wait('@save');

    // View
    cy.get('.celled.fixed.table thead tr th:first').contains(
      'Some Text from Clipboard',
    );
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:first-child()',
    ).contains('Some Text from Clipboard');
  });

  it('should paste external text containing html', function () {
    // Paste
    cy.getTableSlate(true)
      .focus()
      .click()
      .pasteClipboard(
        '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
      );

    cy.getTableSlate()
      .focus()
      .click()
      .pasteClipboard(
        '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
      );

    // Save
    cy.toolbarSave();

    // View
    cy.get('[id="page-document"] p').should('have.length', 2);
  });
});
