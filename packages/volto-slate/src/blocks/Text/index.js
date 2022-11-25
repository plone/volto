import React from 'react';
import redraft from 'redraft';
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
  slashMenu,
  cancelEsc,
} from './keyboard';
import { withDeleteSelectionOnEnter } from '@plone/volto-slate/editor/extensions';
import {
  breakList,
  withDeserializers,
  withLists,
  withSplitBlocksOnBreak,
  withIsSelected,
  normalizeExternalData,
} from './extensions';
import { extractImages } from '@plone/volto-slate/editor/plugins/Image/deconstruct';
import { extractTables } from '@plone/volto-slate/blocks/Table/deconstruct';

import textSVG from '@plone/volto/icons/subtext.svg';

export { TextBlockView, TextBlockEdit, TextBlockSchema };

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
      normalizeExternalData,
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
        slashMenu,
        unwrapEmptyString,
        softBreak, // Handles shift+Enter as a newline (<br/>)
      ],
      ArrowUp: [
        slashMenu,
        moveListItemUp, // Move up a list with with Ctrl+up
        goUp, // Select previous block
      ],
      ArrowDown: [
        slashMenu,
        moveListItemDown, // Move down a list item with Ctrl+down
        goDown, // Select next block
      ],
      Tab: [
        indentListItems, // <tab> and <c-tab> behaviour for list items
        traverseBlocks,
      ],
      Escape: [cancelEsc],
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

  const slateBlockConfig = {
    id: 'slate',
    title: 'Text',
    icon: textSVG,
    group: 'text',
    view: TextBlockView,
    edit: TextBlockEdit,
    schema: TextBlockSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasValue: (data) => {
      // TODO: this should be handled better
      return data && !!data.plaintext?.trim();
    },
    tocEntry: (block = {}) => {
      const { value, override_toc, entry_text, level, plaintext } = block;
      const type = value?.[0]?.type;
      return override_toc && level
        ? [parseInt(level.slice(1)), entry_text]
        : config.settings.slate.topLevelTargetElements.includes(type)
        ? [parseInt(type.slice(1)), plaintext]
        : null;
    },
  };

  // Make draft js compatible with ToC
  config.blocks.blocksConfig.text = {
    ...config.blocks.blocksConfig.text,
    restricted: true,
    tocEntry: (block = {}) => {
      const draft = redraft(
        block.text,
        config.settings.richtextViewSettings.ToHTMLRenderers,
        config.settings.richtextViewSettings.ToHTMLOptions,
      );
      const type = draft?.[0]?.[0]?.type;

      return config.settings.slate.topLevelTargetElements.includes(type)
        ? [parseInt(type.slice(1)), block.text.blocks[0].text]
        : null;
    },
  };

  config.blocks.blocksConfig.slate = slateBlockConfig;
  config.blocks.blocksConfig.detachedSlate = {
    ...config.blocks.blocksConfig.slate,
    id: 'detachedSlate',
    title: 'Detached Slate',
    edit: (props) => <TextBlockEdit {...props} detached />,
    restricted: true,
  };
  return config;
};
