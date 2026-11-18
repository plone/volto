import { createEditor } from 'slate';
import { getCellFocusTarget, selectCellContent } from './keyboard';

/**
 * Creates a table block data structure with `rowCount` rows of `colCount`
 * cells. The first row holds header cells.
 */
const makeTable = (rowCount, colCount, hideHeaders = false) => ({
  hideHeaders,
  rows: Array.from({ length: rowCount }, (_, rowIndex) => ({
    key: `row${rowIndex}`,
    cells: Array.from({ length: colCount }, (_, cellIndex) => ({
      key: `cell${rowIndex}-${cellIndex}`,
      type: rowIndex === 0 ? 'header' : 'data',
      value: [
        {
          type: 'p',
          children: [{ text: `cell ${rowIndex}-${cellIndex}` }],
        },
      ],
    })),
  })),
});

describe('getCellFocusTarget', () => {
  it('targets the next cell of the same row when Tab is pressed', () => {
    const target = getCellFocusTarget({
      table: makeTable(2, 3),
      row: 0,
      cell: 0,
    });

    expect(target).toEqual({ row: 0, cell: 1 });
  });

  it('targets the first cell of the next row when Tab is pressed in the last cell of a row', () => {
    const target = getCellFocusTarget({
      table: makeTable(3, 2),
      row: 1,
      cell: 1,
    });

    expect(target).toEqual({ row: 2, cell: 0 });
  });

  it('targets nothing when Tab is pressed in the last cell of the table', () => {
    const target = getCellFocusTarget({
      table: makeTable(2, 2),
      row: 1,
      cell: 1,
    });

    expect(target).toBe(null);
  });

  it('targets the previous cell of the same row when Shift+Tab is pressed', () => {
    const target = getCellFocusTarget({
      table: makeTable(2, 3),
      row: 1,
      cell: 2,
      backwards: true,
    });

    expect(target).toEqual({ row: 1, cell: 1 });
  });

  it('targets the last cell of the previous row when Shift+Tab is pressed in the first cell of a row', () => {
    const target = getCellFocusTarget({
      table: makeTable(3, 2),
      row: 2,
      cell: 0,
      backwards: true,
    });

    expect(target).toEqual({ row: 1, cell: 1 });
  });

  it('targets nothing when Shift+Tab is pressed in the first cell of the table', () => {
    const target = getCellFocusTarget({
      table: makeTable(2, 2),
      row: 0,
      cell: 0,
      backwards: true,
    });

    expect(target).toBe(null);
  });

  it('targets nothing when Shift+Tab is pressed in the first cell of the first body row when the header row is hidden', () => {
    const target = getCellFocusTarget({
      table: makeTable(2, 2, true),
      row: 1,
      cell: 0,
      backwards: true,
    });

    expect(target).toBe(null);
  });

  it('targets nothing without a table', () => {
    expect(getCellFocusTarget({ table: undefined, row: 0, cell: 0 })).toBe(
      null,
    );
    expect(getCellFocusTarget({ table: { rows: [] }, row: 0, cell: 0 })).toBe(
      null,
    );
  });
});

describe('selectCellContent', () => {
  it('selects the whole content of the editor', () => {
    const editor = createEditor();
    editor.children = [
      { type: 'p', children: [{ text: 'first line' }] },
      { type: 'p', children: [{ text: 'second line' }] },
    ];

    selectCellContent(editor);

    expect(editor.selection).toEqual({
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [1, 0], offset: 'second line'.length },
    });
    expect(editor.selection.anchor).not.toEqual(editor.selection.focus);
  });

  it('collapses to the editor start when it is empty', () => {
    const editor = createEditor();
    editor.children = [{ type: 'p', children: [{ text: '' }] }];

    selectCellContent(editor);

    expect(editor.selection).toEqual({
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    });
  });
});
