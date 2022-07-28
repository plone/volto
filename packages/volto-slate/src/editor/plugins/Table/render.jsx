import React from 'react';
import {
  TABLE,
  THEAD,
  TFOOT,
  TBODY,
  TR,
  TD,
  TH,
} from '@plone/volto-slate/constants';

export const tableElements = {
  [TABLE]: ({ attributes, children }) => (
    <table {...attributes} className="slate-table">
      {children}
    </table>
  ),
  [THEAD]: ({ attributes, children }) => (
    <thead {...attributes}>{children}</thead>
  ),
  [TFOOT]: ({ attributes, children }) => (
    <tfoot {...attributes}>{children}</tfoot>
  ),
  [TBODY]: ({ attributes, children }) => (
    <tbody {...attributes}>{children}</tbody>
  ),
  [TR]: ({ attributes, children }) => <tr {...attributes}>{children}</tr>,
  [TD]: ({ attributes, children }) => <td {...attributes}>{children}</td>,
  [TH]: ({ attributes, children }) => <th {...attributes}>{children}</th>,
};
