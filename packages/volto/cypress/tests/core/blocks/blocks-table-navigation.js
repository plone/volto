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
 * in `cy.type()`, so the keydown is triggered manually. The cell navigation
 * handlers call `event.preventDefault()` when they handle the key, keeping
 * the focus inside the table; otherwise the browser default (moving the
 * focus out of the table) would happen in a real browser.
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
  });

  it('clears the selection when Tab leaves the table through its edge', () => {
    cy.get(HEADER_CELL_1).click().type('column 1 / row 1');
    cy.get(HEADER_CELL_2).click().type('column 2 / row 1');
    cy.get(BODY_ROW_1_CELL_1).click().type('column 1 / row 2');
    cy.get(BODY_ROW_1_CELL_2).click().type('column 2 / row 2');

    // Record whether the Tab keydown keeps the browser default behavior
    // (moving the focus out of the table), as observed by a listener that
    // runs after the React handlers.
    cy.window().then((win) => {
      win.__tabKeptBrowserDefault = null;
      win.document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          win.__tabKeptBrowserDefault = !event.defaultPrevented;
        }
      });
    });

    // Place the caret in the first cell
    cy.get(HEADER_CELL_1).click();

    /**
     * Presses Tab in the currently focused cell. Unlike `pressTab`, this
     * does not click the cell, so it matches the way a user tabbing through
     * the table works: the focus moves with the Tab key alone and the
     * selection keeps its state between presses.
     */
    const pressTabOnFocused = () => {
      cy.focused().trigger('keydown', {
        key: 'Tab',
        keyCode: 9,
        which: 9,
        bubbles: true,
      });
    };

    // Tab through all the cells: each one gets the focus and its content
    // is selected
    pressTabOnFocused();
    expectWindowSelection('column 2 / row 1');
    pressTabOnFocused();
    expectWindowSelection('column 1 / row 2');
    pressTabOnFocused();
    expectWindowSelection('column 2 / row 2');

    // Pressing Tab in the last cell of the table leaves the table: the
    // keydown is not prevented, so the browser moves the focus out of the
    // table (to the block toolbar), and the content of the last cell is no
    // longer highlighted, so the focus location is evident
    pressTabOnFocused();
    cy.window().should((win) => {
      expect(
        win.__tabKeptBrowserDefault,
        'the browser default behavior is kept, moving the focus out of the table',
      ).to.equal(true);
      expect(
        win.getSelection().isCollapsed,
        'the cell content is not selected anymore',
      ).to.equal(true);
    });
  });
});
