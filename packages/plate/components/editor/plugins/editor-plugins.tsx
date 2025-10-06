import { CalloutPlugin } from '@udecode/plate-callout/react';
import { DocxPlugin } from '@udecode/plate-docx';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnPlugin } from '@udecode/plate-layout/react';
// import { SlashPlugin } from '@udecode/plate-slash-command/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
// import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
// import { FixedToolbarPlugin } from '@plone/plate/components/editor/plugins/fixed-toolbar-plugin';
import { FloatingToolbarPlugin } from '../../editor/plugins/floating-toolbar-plugin';
// import { BlockDiscussion } from '@plone/plate/components/plate-ui/block-discussion';
// import { SuggestionBelowNodes } from '@plone/plate/components/plate-ui/suggestion-line-break';

import { alignPlugin } from './align-plugin';
import { autoformatPlugin } from './autoformat-plugin';
import { basicNodesPlugins } from './basic-nodes-plugins';
// import { blockMenuPlugins } from './block-menu-plugins';
// import { commentsPlugin } from './comments-plugin';
import { cursorOverlayPlugin } from './cursor-overlay-plugin';
import { deletePlugins } from './delete-plugins';
// import { dndPlugins } from './dnd-plugins';
import { exitBreakPlugin } from './exit-break-plugin';
import { indentListPlugins } from './indent-list-plugins';
import { lineHeightPlugin } from './line-height-plugin';
import { linkPlugin } from './link-plugin';
import { markdownPlugin } from './markdown-plugin';
import { mediaPlugins } from './media-plugins';
// import { mentionPlugin } from './mention-plugin';
import { resetBlockTypePlugin } from './reset-block-type-plugin';
import { skipMarkPlugin } from './skip-mark-plugin';
import { softBreakPlugin } from './soft-break-plugin';
// import { suggestionPlugin } from './suggestion-plugin';
import { tablePlugin } from './table-plugin';
import { tocPlugin } from './toc-plugin';

export const viewPlugins = [
  ...basicNodesPlugins,
  HorizontalRulePlugin,
  linkPlugin,
  // mentionPlugin,
  tablePlugin,
  TogglePlugin,
  tocPlugin,
  ...mediaPlugins,
  CalloutPlugin,
  ColumnPlugin,

  // Marks
  HighlightPlugin,
  KbdPlugin,
  skipMarkPlugin,

  // Block Style
  alignPlugin,
  ...indentListPlugins,
  lineHeightPlugin,

  // Collaboration
  // commentsPlugin.configure({
  //   render: { aboveNodes: BlockDiscussion as any },
  // }),
  // suggestionPlugin.configure({
  //   render: { belowNodes: SuggestionBelowNodes as any },
  // }),
] as const;

export const editorPlugins = [
  // AI
  // ...aiPlugins,

  // Nodes
  ...viewPlugins,

  // Functionality
  // SlashPlugin.extend({
  //   options: {
  //     triggerQuery(editor) {
  //       return !editor.api.some({
  //         match: { type: editor.getType(CodeBlockPlugin) },
  //       });
  //     },
  //   },
  // }),
  autoformatPlugin,
  cursorOverlayPlugin,
  // ...blockMenuPlugins,
  // ...dndPlugins,
  exitBreakPlugin,
  resetBlockTypePlugin,
  ...deletePlugins,
  softBreakPlugin,
  // TrailingBlockPlugin,

  // Deserialization
  DocxPlugin,
  markdownPlugin,

  // UI
  // FixedToolbarPlugin,
  FloatingToolbarPlugin,
];
