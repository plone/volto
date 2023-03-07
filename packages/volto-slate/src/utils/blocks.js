/* eslint no-console: ["error", { allow: ["error", "warn"] }] */
import { Editor, Transforms, Text } from 'slate'; // Range, RangeRef
import config from '@plone/volto/registry';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import _ from 'lodash';
import { makeEditor } from './editor';

// case sensitive; first in an inner array is the default and preffered format
// in that array of formats
const formatAliases = [
  ['strong', 'b'],
  ['em', 'i'],
  ['del', 's'],
];

/**
 * Excerpt from Slate documentation, kept here for posterity:
 * See https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints

## Built-in Constraints

Slate editors come with a few built-in constraints out of the box. These
constraints are there to make working with content much more predictable than
standard contenteditable. All of the built-in logic in Slate depends on these
constraints, so unfortunately you cannot omit them. They are...

- All Element nodes must contain at least one Text descendant. If an element node
does not contain any children, an empty text node will be added as its only
child. This constraint exists to ensure that the selection's anchor and focus
points (which rely on referencing text nodes) can always be placed inside any
node. With this, empty elements (or void elements) wouldn't be selectable.

- Two adjacent texts with the same custom properties will be merged. If two
adjacent text nodes have the same formatting, they're merged into a single text
node with a combined text string of the two. This exists to prevent the text
nodes from only ever expanding in count in the document, since both adding and
removing formatting results in splitting text nodes.

- Block nodes can only contain other blocks, or inline and text nodes. For
example, a paragraph block cannot have another paragraph block element and
a link inline element as children at the same time. The type of children
allowed is determined by the first child, and any other non-conforming children
are removed. This ensures that common richtext behaviors like "splitting
a block in two" function consistently.

- Inline nodes cannot be the first or last child of a parent block, nor can it
be next to another inline node in the children array. If this is the case, an
empty text node will be added to correct this to be in compliance with the
constraint.

- The top-level editor node can only contain block nodes. If any of the
top-level children are inline or text nodes they will be removed. This ensures
that there are always block nodes in the editor so that behaviors like
"splitting a block in two" work as expected.

- These default constraints are all mandated because they make working with
Slate documents much more predictable.

Although these constraints are the best we've come up with now, we're always
looking for ways to have Slate's built-in constraints be less constraining if
possible—as long as it keeps standard behaviors easy to reason about. If you
come up with a way to reduce or remove a built-in constraint with a different
approach, we're all ears!
 *
 */

export const normalizeExternalData = (editor, nodes) => {
  let fakeEditor = makeEditor({ extensions: editor._installedPlugins });
  fakeEditor.children = nodes;
  // put all the non-blocks (e.g. images which are inline Elements) inside p-s
  Editor.withoutNormalizing(fakeEditor, () => {
    //for htmlSlateWidget compatibility
    if (nodes && !Editor.isBlock(fakeEditor, nodes[0]))
      Transforms.wrapNodes(
        fakeEditor,
        { type: 'p' },
        {
          at: [],
          match: (node, path) =>
            (!Editor.isEditor(node) && !Editor.isBlock(fakeEditor, node)) ||
            fakeEditor.isInline(node),
          mode: 'highest',
        },
      );
  });

  Editor.normalize(fakeEditor, { force: true });

  return fakeEditor.children;
};

/**
 * Is it text? Is it whitespace (space, newlines, tabs) ?
 *
 */
export const isWhitespace = (c) => {
  return (
    typeof c === 'string' &&
    c.replace(/\s/g, '').replace(/\t/g, '').replace(/\n/g, '').length === 0
  );
};

export function createDefaultBlock(children) {
  return {
    type: config.settings.slate.defaultBlockType,
    children: children || [{ text: '' }],
  };
}

export function createBlock(type, children) {
  return {
    type,
    children: children || [{ text: '' }],
  };
}

export function createEmptyParagraph() {
  // TODO: rename to createEmptyBlock
  return {
    type: config.settings.slate.defaultBlockType,
    children: [{ text: '' }],
  };
}

export const isSingleBlockTypeActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

export const isBlockActive = (editor, format) => {
  const aliasList = _.find(formatAliases, (x) => _.includes(x, format));

  if (aliasList) {
    const aliasFound = _.some(aliasList, (y) => {
      return isSingleBlockTypeActive(editor, y);
    });

    if (aliasFound) {
      return true;
    }
  }

  return isSingleBlockTypeActive(editor, format);
};

export const getBlockTypeContextData = (editor, format) => {
  let isActive, defaultFormat, matcher;

  const aliasList = _.find(formatAliases, (x) => _.includes(x, format));

  if (aliasList) {
    const aliasFound = _.some(aliasList, (y) => {
      return isSingleBlockTypeActive(editor, y);
    });

    if (aliasFound) {
      isActive = true;
      defaultFormat = _.first(aliasList);
      matcher = (n) => _.includes(aliasList, n.type);

      return { isActive, defaultFormat, matcher };
    }
  }

  isActive = isBlockActive(editor, format);
  defaultFormat = format;
  matcher = (n) => n.type === format;

  return { isActive, defaultFormat, matcher };
};

export const toggleInlineFormat = (editor, format) => {
  const { isActive, defaultFormat, matcher } = getBlockTypeContextData(
    editor,
    format,
  );

  if (isActive) {
    const rangeRef = Editor.rangeRef(editor, editor.selection);

    Transforms.unwrapNodes(editor, {
      match: matcher,
      split: false,
    });

    const newSel = JSON.parse(JSON.stringify(rangeRef.current));

    Transforms.select(editor, newSel);
    editor.setSavedSelection(newSel);
    // editor.savedSelection = newSel;
    return;
  }

  const exclusiveElements = config.settings.slate.exclusiveElements;
  const matchedElements = exclusiveTags(exclusiveElements, format);
  let alreadyOneIsActive =
    !!matchedElements &&
    (matchedElements.indexOf(format) === 0
      ? isBlockActive(editor, matchedElements[1])
      : isBlockActive(editor, matchedElements[0]));

  if (alreadyOneIsActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) => matchedElements.includes(n.type),
      split: false,
    });

    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block, { split: true });
    return;
  }

  // `children` property is added automatically as an empty array then
  // normalized
  const block = { type: defaultFormat };
  Transforms.wrapNodes(editor, block, { split: true });
};

const exclusiveTags = (exclusiveElements, format) => {
  let elements = null;
  for (const item of exclusiveElements) {
    if (item.includes(format)) {
      elements = item;
      break;
    }
  }

  return elements;
};

export const toggleBlock = (editor, format, allowedChildren) => {
  // We have 6 boolean variables which need to be accounted for.
  // See https://docs.google.com/spreadsheets/d/1mVeMuqSTMABV2BhoHPrPAFjn7zUksbNgZ9AQK_dcd3U/edit?usp=sharing
  const { slate } = config.settings;
  const { listTypes } = slate;

  const isListItem = isBlockActive(editor, slate.listItemType);
  const isActive = isBlockActive(editor, format);
  const wantsList = listTypes.includes(format);

  if (isListItem && !wantsList) {
    toggleFormatAsListItem(editor, format);
  } else if (isListItem && wantsList && !isActive) {
    switchListType(editor, format);
  } else if (!isListItem && wantsList) {
    changeBlockToList(editor, format);
  } else if (!isListItem && !wantsList) {
    toggleFormat(editor, format, allowedChildren);
  } else if (isListItem && wantsList && isActive) {
    clearFormatting(editor);
  } else {
    console.warn('toggleBlock case not covered, please examine:', {
      wantsList,
      isActive,
      isListItem,
    });
  }
};

/*
 * Applies a block format to a list item. Will split the list
 */
export const toggleFormatAsListItem = (editor, format) => {
  Transforms.setNodes(editor, {
    type: format,
  });

  Editor.normalize(editor);
};

/*
 * Toggles between list types by exploding the block
 */
export const switchListType = (editor, format) => {
  const { slate } = config.settings;
  Transforms.unwrapNodes(editor, {
    match: (n) => slate.listTypes.includes(n.type),
    split: true,
  });
  const block = { type: format, children: [] };
  Transforms.wrapNodes(editor, block);
};

export const changeBlockToList = (editor, format) => {
  const { slate } = config.settings;
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === slate.listItemType,
  });

  if (!match) {
    Transforms.setNodes(editor, {
      type: slate.listItemType,
      // id: nanoid(8),
    });
  }

  // `children` property is added automatically as an empty array then
  // normalized
  const block = { type: format };
  Transforms.wrapNodes(editor, block);
};

export const toggleFormat = (editor, format, allowedChildren) => {
  const { slate } = config.settings;
  const isActive = isBlockActive(editor, format);
  const type = isActive ? slate.defaultBlockType : format;
  Transforms.setNodes(editor, {
    type,
  });
  allowedChildren?.length &&
    Transforms.unwrapNodes(editor, {
      mode: 'all',
      at: [0],
      match: (n, path) => {
        const isMatch =
          path.length > 1 && // we don't deal with the parent nodes
          !(Text.isText(n) || allowedChildren.includes(n?.type));
        return isMatch;
      },
    });
};

/**
 * @param {object} properties A prop received by the View component
 *  which is read by the `getBlocksFieldname` and
 * `getBlocksLayoutFieldname` Volto helpers to produce the return value.
 * @returns {Array} All the blocks data taken from the Volto form.
 */
export const getAllBlocks = (properties, blocks) => {
  const blocksFieldName = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  for (const n of properties?.[blocksLayoutFieldname]?.items || []) {
    const block = properties[blocksFieldName][n];
    // TODO Make this configurable via block config getBlocks
    if (
      block?.data?.[blocksLayoutFieldname] &&
      block?.data?.[blocksFieldName]
    ) {
      getAllBlocks(block.data, blocks);
    } else if (block?.[blocksLayoutFieldname] && block?.[blocksFieldName]) {
      getAllBlocks(block, blocks);
    }
    blocks.push({
      id: n,
      ...block,
    });
  }
  return blocks;
};

export const clearFormatting = (editor) => {
  const { slate } = config.settings;
  Transforms.setNodes(editor, {
    type: slate.defaultBlockType,
  });
  Transforms.unwrapNodes(editor, {
    match: (n) => n.type && n.type !== slate.defaultBlockType,
    mode: 'all',
    split: false,
  });
};
