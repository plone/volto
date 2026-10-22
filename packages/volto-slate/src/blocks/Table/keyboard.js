import { Editor, Transforms } from 'slate';

/**
 * Determines which cell should receive the focus when the Tab key is pressed
 * while editing a cell of a table block, mimicking the behavior of common
 * table and spreadsheet editors (Excel, Google Sheets, Word, LibreOffice):
 * Tab moves to the next cell, wrapping to the first cell of the next row
 * when the current cell is the last cell of its row, and Shift+Tab moves to
 * the previous cell, wrapping to the last cell of the previous row.
 *
 * @param {object} table The data of the table block, with a `rows` array
 * (whose first row holds the header cells) and a `hideHeaders` flag.
 * @param {number} row The zero-based row index of the current cell.
 * @param {number} cell The zero-based column index of the current cell.
 * @param {boolean} backwards Whether the focus moves backwards (Shift+Tab).
 * @returns {object|null} The `{ row, cell }` position of the target cell, or
 * `null` when there is no cell to navigate to (currently at the table
 * edges). When `null` is returned the event is not prevented, so the browser
 * default Tab behavior (moving the focus out of the table) is kept.
 */
export function getCellFocusTarget({ table, row, cell, backwards = false }) {
  const rows = table?.rows;
  if (!rows?.length) return null;

  const colCount = rows[0].cells?.length;
  if (!colCount) return null;

  // When the header row is hidden it is not rendered, so it cannot be
  // reached through the UI and the navigation must not target its cells.
  const firstEditableRow = table?.hideHeaders ? 1 : 0;

  let nextRow = row;
  let nextCell = backwards ? cell - 1 : cell + 1;

  if (nextCell < 0) {
    // The focus wraps to the last cell of the previous row.
    if (nextRow <= firstEditableRow) return null;
    nextRow -= 1;
    nextCell = colCount - 1;
  } else if (nextCell >= colCount) {
    // The focus wraps to the first cell of the next row.
    if (nextRow >= rows.length - 1) return null;
    nextRow += 1;
    nextCell = 0;
  }

  return { row: nextRow, cell: nextCell };
}

/**
 * Selects the whole content of a Slate editor. Used when the focus is moved
 * between cells with the Tab key, so the editor behaves like a spreadsheet:
 * the content of the target cell gets selected and can be overwritten by
 * typing.
 *
 * @param {Editor} editor The Slate editor of the target cell.
 */
export function selectCellContent(editor) {
  Transforms.select(editor, {
    anchor: Editor.start(editor, []),
    focus: Editor.end(editor, []),
  });
}
