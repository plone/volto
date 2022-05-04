import React from 'react';
import codeSVG from '@plone/volto/icons/code.svg';
import TextBlockView from './TextBlockView';
import TextBlockEdit from './TextBlockEdit';
import TextBlockSchema from './TextBlockSchema';

import {
  goDown,
  goUp,
  backspaceInList,
  indentListItems,
  joinWithNextBlock,
  joinWithPreviousBlock,
  softBreak,
  moveListItemDown,
  moveListItemUp,
  traverseBlocks,
  unwrapEmptyString,
} from './keyboard';
import { withDeleteSelectionOnEnter } from 'volto-slate/editor/extensions';
import {
  breakList,
  withDeserializers,
  withLists,
  withSplitBlocksOnBreak,
  withIsSelected,
} from './extensions';
import { extractImages } from 'volto-slate/editor/plugins/Image/deconstruct';
import { extractTables } from 'volto-slate/blocks/Table/deconstruct';

export TextBlockView from './TextBlockView';
export TextBlockEdit from './TextBlockEdit';
export TextBlockSchema from './TextBlockSchema';

export default (config) => {
  config.settings.slate = {
    // TODO: should we inverse order? First here gets executed last
    textblockExtensions: [
      withLists,
      withSplitBlocksOnBreak, // TODO: do we still need this one?
      withDeleteSelectionOnEnter,
      withDeserializers,
      withIsSelected,
      breakList,
    ],

    // Pluggable handlers for the onKeyDown event of <Editable />
    // Order matters here. A handler can return `true` to stop executing any
    // following handler
    textblockKeyboardHandlers: {
      Backspace: [
        unwrapEmptyString,
        backspaceInList, // Backspace in list item lifts node and breaks Volto blocks
        joinWithPreviousBlock, // Backspace at beginning of block joins with previous block
      ],
      Delete: [
        unwrapEmptyString,
        joinWithNextBlock, // Delete at end of block joins with next block
      ],
      Enter: [
        unwrapEmptyString,
        softBreak, // Handles shift+Enter as a newline (<br/>)
      ],
      ArrowUp: [
        moveListItemUp, // Move up a list with with Ctrl+up
        goUp, // Select previous block
      ],
      ArrowDown: [
        moveListItemDown, // Move down a list item with Ctrl+down
        goDown, // Select next block
      ],
      Tab: [
        indentListItems, // <tab> and <c-tab> behaviour for list items
        traverseBlocks,
      ],
    },
    textblockDetachedKeyboardHandlers: {
      Enter: [
        softBreak, // Handles shift+Enter as a newline (<br/>)
      ],
    },
    // Used by deconstructToVoltoBlocks to transform tags such as <img> to a Volto image block
    // These emiters receive (editor, pathRef), emit [blockid, blockoptions] and
    // are allowed to change the editor contents (for the given path)
    voltoBlockEmiters: [
      ...(config.settings.slate.voltoBlockEmiters || []),
      extractImages,
      extractTables,
    ],

    // These elements will get an id, to make them targets in TOC
    topLevelTargetElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    ...config.settings.slate, // TODO: is this correct for volto-slate addons?
  };

  config.settings.integratesBlockStyles = [
    ...(config.settings.integratesBlockStyles || []),
    'slate',
  ];

  config.blocks.blocksConfig.slate = {
    id: 'slate',
    title: 'Slate',
    icon: codeSVG,
    group: 'text',
    view: TextBlockView,
    edit: TextBlockEdit,
    schema: TextBlockSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasValue: (data) => {
      // TODO: this should be handled better
      return data && !!data.plaintext?.trim();
    },
    tocEntry: (block = {}, tocData) => {
      // integration with volto-block-toc
      const { value, override_toc, entry_text, level, plaintext } = block;
      const type = value?.[0]?.type;
      return override_toc && level
        ? [parseInt(level.slice(1)), entry_text]
        : config.settings.slate.topLevelTargetElements.includes(type)
        ? [parseInt(type.slice(1)), plaintext]
        : null;
    },
  };

  config.blocks.blocksConfig.detachedSlate = {
    ...config.blocks.blocksConfig.slate,
    id: 'detachedSlate',
    title: 'Detached Slate',
    edit: (props) => <TextBlockEdit {...props} detached />,
    restricted: true,
  };
  return config;
};
