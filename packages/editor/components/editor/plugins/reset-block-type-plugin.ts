'use client';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CalloutPlugin } from '@udecode/plate-callout/react';
import {
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@udecode/plate-code-block';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { HEADING_LEVELS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { ParagraphPlugin } from '@udecode/plate/react';

const resetBlockTypesCommonRule = {
  defaultType: ParagraphPlugin.key,
  types: [
    ...HEADING_LEVELS,
    BlockquotePlugin.key,
    INDENT_LIST_KEYS.todo,
    ListStyleType.Disc,
    ListStyleType.Decimal,
    CalloutPlugin.key,
  ],
};

const resetBlockTypesCodeBlockRule = {
  defaultType: ParagraphPlugin.key,
  types: [CodeBlockPlugin.key],
  onReset: unwrapCodeBlock,
};

export const resetBlockTypePlugin = ResetNodePlugin.configure({
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: (editor) =>
          editor.api.isEmpty(editor.selection, { block: true }),
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: (editor) => editor.api.isAt({ start: true }),
      },
      {
        ...resetBlockTypesCodeBlockRule,
        hotkey: 'Enter',
        predicate: isCodeBlockEmpty,
      },
      {
        ...resetBlockTypesCodeBlockRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtCodeBlockStart,
      },
    ],
  },
});
