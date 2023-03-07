import React from 'react';
import config from '@plone/volto/registry';

import boldIcon from '@plone/volto/icons/bold.svg';
import codeIcon from '@plone/volto/icons/code.svg';
import formatClearIcon from '@plone/volto/icons/format-clear.svg';
import headingIcon from '@plone/volto/icons/heading.svg';
import italicIcon from '@plone/volto/icons/italic.svg';
import listBulletIcon from '@plone/volto/icons/list-bullet.svg';
import listNumberedIcon from '@plone/volto/icons/list-numbered.svg';
import subheadingIcon from '@plone/volto/icons/subheading.svg';
import subTextIcon from '@plone/volto/icons/subtext.svg';
import underlineIcon from '@plone/volto/icons/underline.svg';
import strikethroughIcon from '@plone/volto/icons/strikethrough.svg';
import subindexIcon from '@plone/volto/icons/subindex.svg';
import superindexIcon from '@plone/volto/icons/superindex.svg';

import { createEmptyParagraph } from '@plone/volto-slate/utils';

import {
  MarkButton,
  MarkElementButton,
  BlockButton,
  ClearFormattingButton,
  Separator,
  Expando,
} from './ui';
import { highlightSelection } from './decorate'; // highlightByType,
import {
  insertData,
  isInline,
  withDeleteSelectionOnEnter,
  withDeserializers,
  normalizeNode,
  normalizeExternalData,
} from './extensions';
import {
  // inlineTagDeserializer,
  bodyTagDeserializer,
  blockTagDeserializer,
  preTagDeserializer,
  spanTagDeserializer,
  bTagDeserializer,
  codeTagDeserializer,
} from './deserialize';

// Registry of available buttons
export const buttons = {
  bold: (props) => (
    <MarkElementButton
      title="Bold"
      format="strong"
      icon={boldIcon}
      {...props}
    />
  ),
  italic: (props) => (
    <MarkElementButton
      title="Italic"
      format="em"
      icon={italicIcon}
      {...props}
    />
  ),
  underline: (props) => (
    <MarkElementButton
      title="Underline"
      format="u"
      icon={underlineIcon}
      {...props}
    />
  ),
  strikethrough: (props) => (
    <MarkElementButton
      title="Strikethrough"
      format="del"
      icon={strikethroughIcon}
      {...props}
    />
  ),
  sub: (props) => (
    <MarkElementButton
      title="Subscript"
      format="sub"
      icon={subindexIcon}
      {...props}
    />
  ),
  sup: (props) => (
    <MarkElementButton
      title="Superscript"
      format="sup"
      icon={superindexIcon}
      {...props}
    />
  ),
  code: (props) => (
    <MarkButton title="Code" format="code" icon={codeIcon} {...props} />
  ),
  'heading-two': (props) => (
    <BlockButton
      title="Title"
      format="h2"
      allowedChildren={config.settings.slate.allowedHeadlineElements}
      icon={headingIcon}
      {...props}
    />
  ),
  'heading-three': (props) => (
    <BlockButton
      title="Subtitle"
      format="h3"
      allowedChildren={config.settings.slate.allowedHeadlineElements}
      icon={subheadingIcon}
      {...props}
    />
  ),
  'heading-four': (props) => (
    <BlockButton
      title="Heading 4"
      allowedChildren={config.settings.slate.allowedHeadlineElements}
      format="h4"
      icon={subTextIcon}
      {...props}
    />
  ),
  clearformatting: (props) => (
    <ClearFormattingButton title="Clear formatting" icon={formatClearIcon} />
  ),
  'numbered-list': (props) => (
    <BlockButton
      title="Numbered list"
      format="ol"
      icon={listNumberedIcon}
      {...props}
    />
  ),
  'bulleted-list': (props) => (
    <BlockButton title="Bulleted list" format="ul" icon={listBulletIcon} />
  ),
  separator: (props) => <Separator />,
  expando: (props) => <Expando />,
};

export const defaultToolbarButtons = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'separator',
  'heading-two',
  'heading-three',
  'heading-four',
  'separator',
  'clearformatting',
  'separator',
  'sub',
  'sup',
  'separator',
  'bulleted-list',
  'numbered-list',
];

export const toolbarButtons = [...defaultToolbarButtons];

export const expandedToolbarButtons = [...defaultToolbarButtons];

// These components are rendered in the toolbar on demand, as configured by
// plugins.  They are rendered as "context" buttons, when there is no selection
// Each one is a function (editor) => (<Component/> or null). It is important
// to be able to tell if a plugin would return something because we don't want
// to render the toolbar at all if there's no children (due to CSS reasons).
export const contextToolbarButtons = [];

// Each Element node type available in the editor can be configured to have
// specific toolbar buttons shown above the element of that type when it
// contains the selection. The Table plugin of SlateEditor uses this to put a
// Delete table button above the currently selected table.
export const elementToolbarButtons = {};

// A set of components that are always rendered, unlike the button variety.
// They make it possible to orchestrate form-based editing of components
export const persistentHelpers = [];

// The slate editor is "decorated" with the capabilities from this list.
// While Slate calls them plugins, we use "extension" to avoid confusion.
// A Volto Slate editor plugins adds more functionality: buttons, new elements,
// etc.
// Each extension is a simple mutator function with signature: `editor => editor`.
// See https://docs.slatejs.org/concepts/07-plugins and
// https://docs.slatejs.org/concepts/06-editor
//
// First here gets executed last, so if you want to override behavior, push new
// extensions to the end of this list, to rely on default behavior implemented
// here.
export const extensions = [
  withDeleteSelectionOnEnter,
  withDeserializers,
  insertData,
  isInline,
  normalizeNode,
  normalizeExternalData,
];

// Default hotkeys and the format they trigger
export const hotkeys = {
  'mod+b': { format: 'strong', type: 'inline' },
  'mod+i': { format: 'em', type: 'inline' },
  'mod+u': { format: 'u', type: 'inline' },
  'mod+s': { format: 'del', type: 'inline' },
  // 'mod+`': { format: 'code', type: 'inline' },
  // TODO: more hotkeys, including from plugins!
};

// Raw shortcut/keydown handlers
export const keyDownHandlers = {};

// Paragraphs (as default type of blocks) and lists need special handling
export const listTypes = ['ul', 'ol'];
export const listItemType = 'li';
export const tableTypes = [
  'table',
  'tbody',
  'thead',
  'tfoot',
  'tr',
  'td',
  'th',
];
export const defaultBlockType = 'p';

// Default rendered elements
// TODO: expose the IDs in constants.js, for uniformity
export const elements = {
  default: ({ attributes, children }) => <p {...attributes}>{children}</p>,

  h1: ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
  h2: ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
  h3: ({ attributes, children }) => <h3 {...attributes}>{children}</h3>,
  h4: ({ attributes, children }) => <h4 {...attributes}>{children}</h4>,

  li: ({ attributes, children }) => <li {...attributes}>{children}</li>,
  ol: ({ attributes, children }) => <ol {...attributes}>{children}</ol>,
  ul: ({ attributes, children }) => {
    return <ul {...attributes}>{children}</ul>;
  },

  div: ({ attributes, children }) => <div {...attributes}>{children}</div>,
  p: ({ attributes, children, element }) => <p {...attributes}>{children}</p>,

  // While usual slate editor consider these to be Leafs, we treat them as
  // inline elements because they can sometimes contain elements (ex:
  // <b><a/></b>
  em: ({ children }) => <em>{children}</em>,
  i: ({ children }) => <i>{children}</i>,
  b: ({ children }) => {
    return <b>{children}</b>;
  },
  strong: ({ children }) => {
    return <strong>{children}</strong>;
  },
  u: ({ children }) => <u>{children}</u>,
  s: ({ children }) => <del>{children}</del>,
  del: ({ children }) => <del>{children}</del>,
  sub: ({ children }) => <sub>{children}</sub>,
  sup: ({ children }) => <sup>{children}</sup>,
  code: ({ children }) => <code>{children}</code>,
};

export const inlineElements = [
  'em',
  'i',
  'b',
  'strong',
  'u',
  'del',
  'sub',
  'sup',
  'code',
];

// Order of definition here is important (higher = inner element)
export const leafs = {
  // code: ({ children }) => {
  //   return <code>{children}</code>;
  // },
};

export const defaultValue = () => {
  return [createEmptyParagraph()];
};

// HTML deserialization (html -> slate data conversion)
// These are used in clipboard paste handling
// Any tag that is not listed here (or added by a plugin) will be stripped
// (its children will be rendered, though)
export const htmlTagsToSlate = {
  B: bTagDeserializer,
  BODY: bodyTagDeserializer,
  CODE: codeTagDeserializer,
  PRE: preTagDeserializer,
  SPAN: spanTagDeserializer,

  BLOCKQUOTE: blockTagDeserializer('blockquote'),
  DEL: blockTagDeserializer('del'),
  EM: blockTagDeserializer('em'),
  H1: blockTagDeserializer('h1'),
  H2: blockTagDeserializer('h2'),
  H3: blockTagDeserializer('h3'),
  H4: blockTagDeserializer('h4'),
  H5: blockTagDeserializer('h5'),
  H6: blockTagDeserializer('h6'),
  I: blockTagDeserializer('i'),
  P: blockTagDeserializer('p'),
  S: blockTagDeserializer('del'),
  STRONG: blockTagDeserializer('strong'),
  SUB: blockTagDeserializer('sub'),
  SUP: blockTagDeserializer('sup'),
  U: blockTagDeserializer('u'),

  OL: blockTagDeserializer('ol'),
  UL: blockTagDeserializer('ul'),
  LI: blockTagDeserializer('li'),
};

// Adds "highlight" decoration in the editor. Used by `highlightByType`
// See the Footnote plugin for an example.
export const nodeTypesToHighlight = [];

// "Runtime" decorator functions. These are transient decorations that are
// applied in the editor. They are not persisted in the final value, so they
// are useful for example to highlight search results or a certain type of node
// Signature: ([node, path], ranges) => ranges
export const runtimeDecorators = [highlightSelection]; // , highlightByType

// Only these types of element nodes are allowed in the headlines
export const allowedHeadlineElements = ['em', 'i'];

// Scroll into view when typing
export const scrollIntoView = true;

// In inline toolbar only one tag should be active at a time.
export const exclusiveElements = [['sup', 'sub']];
