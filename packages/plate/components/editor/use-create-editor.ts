import type { Value } from '@udecode/plate';

import { withProps } from '@udecode/cn';
// import { AIPlugin } from '@udecode/plate-ai/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
// import { CommentsPlugin } from '@udecode/plate-comments/react';
import { EmojiInputPlugin } from '@udecode/plate-emoji/react';
// import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  // AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
// import {
//   MentionInputPlugin,
//   MentionPlugin,
// } from '@udecode/plate-mention/react';
// import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
// import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  type CreatePlateEditorOptions,
  createPlatePlugin,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';

import { editorPlugins } from '../editor/plugins/editor-plugins';
import { FixedToolbarPlugin } from '../editor/plugins/fixed-toolbar-plugin';
import { FloatingToolbarPlugin } from '../editor/plugins/floating-toolbar-plugin';
// import { AILeaf } from '../plate-ui/ai-leaf';
import { BlockquoteElement } from '../plate-ui/blockquote-element';
import { CodeBlockElement } from '../plate-ui/code-block-element';
import { CodeLeaf } from '../plate-ui/code-leaf';
import { CodeLineElement } from '../plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '../plate-ui/code-syntax-leaf';
import { ColumnElement } from '../plate-ui/column-element';
import { ColumnGroupElement } from '../plate-ui/column-group-element';
import { CommentLeaf } from '../plate-ui/comment-leaf';
// import { EmojiInputElement } from '../plate-ui/emoji-input-element';
// import { ExcalidrawElement } from '../plate-ui/excalidraw-element';
import { HeadingElement } from '../plate-ui/heading-element';
import { HighlightLeaf } from '../plate-ui/highlight-leaf';
import { HrElement } from '../plate-ui/hr-element';
import { ImageElement } from '../plate-ui/image-element';
import { KbdLeaf } from '../plate-ui/kbd-leaf';
import { LinkElement } from '../plate-ui/link-element';
// import { MediaAudioElement } from '../plate-ui/media-audio-element';
import { MediaEmbedElement } from '../plate-ui/media-embed-element';
import { MediaFileElement } from '../plate-ui/media-file-element';
import { MediaPlaceholderElement } from '../plate-ui/media-placeholder-element';
import { MediaVideoElement } from '../plate-ui/media-video-element';
// import { MentionElement } from '../plate-ui/mention-element';
// import { MentionInputElement } from '../plate-ui/mention-input-element';
import { ParagraphElement } from '../plate-ui/paragraph-element';
import { withPlaceholders } from '../plate-ui/placeholder';
// import { SlashInputElement } from '../plate-ui/slash-input-element';
// import { SuggestionLeaf } from '../plate-ui/suggestion-leaf';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '../plate-ui/table-cell-element';
import { TableElement } from '../plate-ui/table-element';
import { TableRowElement } from '../plate-ui/table-row-element';
import { TocElement } from '../plate-ui/toc-element';
import { ToggleElement } from '../plate-ui/toggle-element';
import UnknownElement from '../plate-ui/unknown-element';

const TitlePlugin = createPlatePlugin({
  key: 'title',
  node: {
    isElement: true,
    type: 'title',
  },
});

const UnknownElementPlugin = createPlatePlugin({
  key: 'unknown',
  node: {
    isElement: true,
    isVoid: true,
    type: 'unknown',
    component: UnknownElement,
  },
});

export const viewComponents = {
  title: withProps(HeadingElement, { as: 'h1', className: 'text-3xl' }),
  // [AudioPlugin.key]: MediaAudioElement,
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  // [CommentsPlugin.key]: CommentLeaf,
  // [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  // [MentionPlugin.key]: MentionElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  // [SuggestionPlugin.key]: SuggestionLeaf,
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
  [VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
  ...viewComponents,
  // [AIPlugin.key]: AILeaf,
  // [EmojiInputPlugin.key]: EmojiInputElement,
  // [MentionInputPlugin.key]: MentionInputElement,
  // [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
  {
    components,
    override,
    readOnly,
    ...options
  }: {
    components?: Record<string, any>;
    plugins?: any[];
    readOnly?: boolean;
  } & Omit<CreatePlateEditorOptions, 'plugins'> = {},
  deps: any[] = [],
) => {
  return usePlateEditor<Value>(
    {
      override: {
        components: {
          ...(readOnly ? viewComponents : withPlaceholders(editorComponents)),
          ...components,
        },
        ...override,
      },
      plugins: [
        // ...copilotPlugins,
        ...editorPlugins,
        TitlePlugin,
        UnknownElementPlugin,
        // FixedToolbarPlugin,
        FloatingToolbarPlugin,
      ],
      value: [
        {
          children: [{ text: 'Playground' }],
          type: 'h1',
        },
        {
          children: [
            { text: 'A rich-text editor with AI capabilities. Try the ' },
            { bold: true, text: 'AI commands' },
            { text: ' or use ' },
            { kbd: true, text: 'Cmd+J' },
            { text: ' to open the AI menu.' },
          ],
          type: ParagraphPlugin.key,
        },
      ],
      ...options,
    },
    deps,
  );
};
