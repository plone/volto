import { v4 as uuid } from 'uuid';
import { Editor, Transforms } from 'slate';
import {
  TABLE,
  THEAD,
  TBODY,
  TFOOT,
  TD,
  TH,
  TR,
} from '@plone/volto-slate/constants';

/**
 * @param {Array} rows The array of rows that almost completely defines a
 * `table`-typed block.
 * @returns {Array} A tuple `[id, block]` where `id` is the new block's ID and
 * the `block` is all the block's data.
 */
export function syncCreateTableBlock(rows) {
  const id = uuid();
  const block = {
    '@type': 'table',
    table: {
      rows,
    },
  };
  return [id, block];
}

/**
 * @param {Editor} editor The Slate Editor from which to extract tables.
 * @param {PathRef} pathRef Has the current value a `Path` so that the search is
 * done just inside nodes in that `Path`.
 * @returns Extracts tables from a Slate `Editor` into an array of detached
 * `table` blocks.
 */
export const extractTables = (editor, pathRef) => {
  const tableNodes = Array.from(
    Editor.nodes(editor, {
      at: pathRef.current,
      match: (node) => node.type === TABLE,
    }),
  );
  const tables = tableNodes.map(([node]) => extractVoltoTable(node));

  Transforms.removeNodes(editor, {
    at: pathRef.current,
    match: (node) => node.type === TABLE,
  });

  return tables.map((el) => syncCreateTableBlock(el));
};

/**
 * @param {Node[]} fragment A Slate document fragment.
 * @returns {Array} An array of rows in the format requested by `table`
 * blocks.
 */
function collectRowsFrom(fragment) {
  let rows = [];
  fragment.children.forEach((y) => {
    if (y.type === TR) {
      let row = { key: uuid(), cells: [] };

      y.children.forEach((z) => {
        let val = JSON.parse(JSON.stringify(z.children));
        if (z.type === TD) {
          row.cells.push({
            key: uuid(),
            type: 'data',
            value: val,
          });
        } else if (z.type === TH) {
          row.cells.push({
            key: uuid(),
            type: 'header',
            value: val,
          });
        }
      });

      rows.push(row);
    }
  });
  return rows;
}

/**
 * @param {HTMLElement} el The <table> element from which to extract rows.
 * @returns {Array} A rows array that contains rows in the format required by
 * `table` blocks.
 */
function extractVoltoTable(el) {
  let thead = [],
    tfoot = [],
    tbody = [];

  el.children.forEach((fragment) => {
    if (fragment.type === THEAD) {
      // not supported by View fully, so prepend this to tbody below
      thead = collectRowsFrom(fragment);
    } else if (fragment.type === TBODY) {
      tbody = collectRowsFrom(fragment);
    } else if (fragment.type === TFOOT) {
      // not supported by View fully, so append this to tbody below
      tfoot = collectRowsFrom(fragment);
    }
  });

  const rows = [...thead, ...tbody, ...tfoot];

  return rows;
}
