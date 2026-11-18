const HEADER_CELL_1 =
  '.celled.fixed.table thead tr th:first-child() [contenteditable="true"]';
const HEADER_CELL_2 =
  '.celled.fixed.table thead tr th:nth-child(2) [contenteditable="true"]';
const BODY_ROW_1_CELL_1 =
  '.celled.fixed.table tbody tr:nth-child(1) td:first-child() [contenteditable="true"]';
const BODY_ROW_1_CELL_2 =
  '.celled.fixed.table tbody tr:nth-child(1) td:nth-child(2) [contenteditable="true"]';

/**
 * Presses the Tab key in the given cell. Cypress does not support `{tab}`
 * in `cy.type()`, so the keydown is triggered manually.
 */
const pressTab = (cell, shift = false) => {
  cy.get(cell).click().trigger('keydown', {
    key: 'Tab',
    keyCode: 9,
    which: 9,
    shiftKey: shift,
    bubbles: true,
  });
};

describe('Table Block Tab Navigation Tests', () => {
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

    // Add a table block
    cy.addNewBlock('table');
    cy.get('.block-editor-slateTable [role=textbox]').should('be.visible');
  });

  /**
   * Asserts that the whole content of the given cell text is currently
   * selected in the window. The comparison is case insensitive because the
   * header cells are rendered with `text-transform: uppercase` and
   * `Selection.toString()` returns the rendered (transformed) text.
   */
  const expectWindowSelection = (text) => {
    cy.window().should((win) => {
      const selection = win.getSelection();
      expect(selection.isCollapsed, 'selection is not collapsed').to.equal(
        false,
      );
      expect(selection.toString().toLowerCase()).to.equal(
        text.toLowerCase(),
        'the whole cell content is selected',
      );
    });
  };

  it('moves to the next cell selecting its content when Tab is pressed', () => {
    cy.get(HEADER_CELL_1).click().type('column 1 / row 1');
    cy.get(HEADER_CELL_2).click().type('column 2 / row 1');

    // Place the caret in the first cell and press Tab
    pressTab(HEADER_CELL_1);

    // The next cell gets the focus and its content is fully selected
    cy.get(HEADER_CELL_2).should('contain', 'column 2 / row 1');
    cy.focused().should('have.attr', 'contenteditable', 'true');
    expectWindowSelection('column 2 / row 1');

    // Typing replaces the whole cell content (it was selected)
    cy.focused().type('overwritten');
    cy.get(HEADER_CELL_2).should('have.text', 'overwritten');
  });

  it('moves back to the previous cell selecting its content when Shift+Tab is pressed', () => {
    cy.get(HEADER_CELL_1).click().type('column 1 / row 1');
    cy.get(HEADER_CELL_2).click().type('column 2 / row 1');

    // Place the caret in the second cell and press Shift+Tab
    pressTab(HEADER_CELL_2, true);

    // The previous cell gets the focus and its content is fully selected
    cy.focused().should('have.attr', 'contenteditable', 'true');
    expectWindowSelection('column 1 / row 1');
  });

  it('moves to the first cell of the next row when Tab is pressed in the last cell of a row', () => {
    cy.get(HEADER_CELL_1).click().type('column 1 / row 1');
    cy.get(HEADER_CELL_2).click().type('column 2 / row 1');
    cy.get(BODY_ROW_1_CELL_1).click().type('column 1 / row 2');

    // Tab from the last cell of the header row wraps to the first cell of
    // the next row
    pressTab(HEADER_CELL_2);

    cy.focused().should('have.attr', 'contenteditable', 'true');
    expectWindowSelection('column 1 / row 2');

    // Tab in the last cell of the table stays in place (no cell to go to)
    pressTab(BODY_ROW_1_CELL_2);
    cy.get(BODY_ROW_1_CELL_2).should('be.focused');
    cy.window().should((win) => {
      expect(win.getSelection().isCollapsed).to.equal(true);
    });
  });
});
