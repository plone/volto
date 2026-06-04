import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import {
  addBlock,
  changeBlock,
  insertBlock,
  blockHasValue,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers/Blocks/Blocks';
import { Transforms, Editor, Node } from 'slate';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import omit from 'lodash/omit';
import config from '@plone/volto/registry';

function fromEntries(pairs) {
  const res = {};
  pairs.forEach((p) => {
    res[p[0]] = p[1];
  });
  return res;
}

export function mergeSlateWithBlockBackward(editor, prevBlock, event) {
  // Merge the current block content into the previous block
  // The current block content should be appended to the previous block
  // and the cursor should be positioned at the start of what was the current block content

  const prevValue = [...prevBlock.value];
  const currentValue = [...editor.children];

  const lastNode = prevValue[prevValue.length - 1];
  const firstNode = currentValue[0];
  let merged;
  let cursor;

  if (lastNode && firstNode && lastNode.type === firstNode.type) {
    // If the last node of previous block and first node of current block have the same type,
    // merge their children together
    const mergedFirstNode = {
      ...lastNode,
      children: [...lastNode.children, ...firstNode.children],
    };

    merged = [
      ...prevValue.slice(0, -1),
      mergedFirstNode,
      ...currentValue.slice(1),
    ];

    cursor = {
      anchor: {
        path: [prevValue.length - 1, lastNode.children.length],
        offset: 0,
      },
      focus: {
        path: [prevValue.length - 1, lastNode.children.length],
        offset: 0,
      },
    };
  } else {
    // Otherwise, just append the current block content to the previous block
    merged = [...prevValue, ...currentValue];
    // Position cursor at the start of the merged content (where current block was inserted)
    // The current block content starts at index prevValue.length in the merged array
    cursor = {
      anchor: {
        path: [prevValue.length, 0],
        offset: 0,
      },
      focus: {
        path: [prevValue.length, 0],
        offset: 0,
      },
    };
  }

  // Update the editor with the merged content
  editor.children = merged;

  return cursor;
}

export function mergeSlateWithBlockForward(editor, nextBlock, event) {
  // To work around current architecture limitations, read the value from next
  // block. Replace it in the current editor (over which we have control), join
  // with current block value, then use this result for next block, delete
  // current block

  const next = nextBlock?.value;
  // Safeguard: if next block has no value or an empty value, there is nothing to merge
  if (!Array.isArray(next) || next.length === 0) {
    return;
  }

  // collapse the selection to its start point
  Transforms.collapse(editor, { edge: 'end' });
  Transforms.insertNodes(editor, next, {
    at: Editor.end(editor, []),
  });

  Editor.deleteForward(editor, { unit: 'character' });
}

export function syncCreateSlateBlock(value) {
  const id = uuid();
  const block = {
    '@type': 'slate',
    value: JSON.parse(JSON.stringify(value)),
    plaintext: serializeNodesToText(value),
  };
  return [id, block];
}

export function createImageBlock(url, index, props, intl) {
  const { properties, onChangeField, onSelectBlock } = props;
  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const currBlockId = properties.blocks_layout.items[index];
  const currBlockHasValue = blockHasValue(properties.blocks[currBlockId]);
  let id, newFormData;

  if (currBlockHasValue) {
    [id, newFormData] = addBlock(properties, 'image', index + 1, null, intl);
    newFormData = changeBlock(newFormData, id, { '@type': 'image', url });
  } else {
    [id, newFormData] = insertBlock(properties, currBlockId, {
      '@type': 'image',
      url,
    });
  }

  ReactDOM.unstable_batchedUpdates(() => {
    onChangeField(blocksFieldname, newFormData[blocksFieldname]);
    onChangeField(blocksLayoutFieldname, newFormData[blocksLayoutFieldname]);
    onSelectBlock(id);
  });
}

export const createAndSelectNewBlockAfter = (editor, blockValue, intl) => {
  const blockProps = editor.getBlockProps();

  const { onSelectBlock, properties, index, onChangeField } = blockProps;

  const [blockId, formData] = addBlock(
    properties,
    'slate',
    index + 1,
    null,
    intl,
  );

  const options = {
    '@type': 'slate',
    value: JSON.parse(JSON.stringify(blockValue)),
    plaintext: serializeNodesToText(blockValue),
  };

  const newFormData = changeBlock(formData, blockId, options);

  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
  // console.log('layout', blocksLayoutFieldname, newFormData);

  ReactDOM.unstable_batchedUpdates(() => {
    blockProps.saveSlateBlockSelection(blockId, 'start');
    onChangeField(blocksFieldname, newFormData[blocksFieldname]);
    onChangeField(blocksLayoutFieldname, newFormData[blocksLayoutFieldname]);
    onSelectBlock(blockId);
  });
};

export function getNextVoltoBlock(index, properties) {
  // TODO: look for any next slate block
  // join this block with previous block, if previous block is slate
  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const blocks_layout = properties[blocksLayoutFieldname];

  if (index === blocks_layout.items.length) return;

  const nextBlockId = blocks_layout.items[index + 1];
  const nextBlock = properties[blocksFieldname][nextBlockId];

  return [nextBlock, nextBlockId];
}

export function getPreviousVoltoBlock(index, properties) {
  // TODO: look for any prev slate block
  if (index === 0) return;

  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const blocks_layout = properties[blocksLayoutFieldname];
  const prevBlockId = blocks_layout.items[index - 1];
  const prevBlock = properties[blocksFieldname][prevBlockId];

  return [prevBlock, prevBlockId];
}

// //check for existing img children
// const checkContainImg = (elements) => {
//   var check = false;
//   elements.forEach((e) =>
//     e.children.forEach((c) => {
//       if (c && c.type && c.type === 'img') {
//         check = true;
//       }
//     }),
//   );
//   return check;
// };

// //check for existing table children
// const checkContainTable = (elements) => {
//   var check = false;
//   elements.forEach((e) => {
//     if (e && e.type && e.type === 'table') {
//       check = true;
//     }
//   });
//   return check;
// };

/**
 * The editor has the properties `dataTransferHandlers` (object) and
 * `dataTransferFormatsOrder` and in `dataTransferHandlers` are functions which
 * sometimes must call this function. Some types of data storeable in Slate
 * documents can be and should be put into separate Volto blocks. The
 * `deconstructToVoltoBlocks` function scans the contents of the Slate document
 * and, through configured Volto block emitters, it outputs separate Volto
 * blocks into the same Volto page form. The `deconstructToVoltoBlocks` function
 * should be called only in key places where it is necessary.
 *
 * @example See the `src/editor/extensions/insertData.js` file.
 *
 * @param {Editor} editor The Slate editor object which should be deconstructed
 * if possible.
 *
 * @returns {Promise}
 */
export function deconstructToVoltoBlocks(editor) {
  // Explodes editor content into separate blocks
  // If the editor has multiple top-level children, split the current block
  // into multiple slate blocks. This will delete and replace the current
  // block.
  //
  // It returns a promise that, when resolved, will pass a list of Volto block
  // ids that were affected
  //
  // For the Volto blocks manipulation we do low-level changes to the context
  // form state, as that ensures a better performance (no un-needed UI updates)

  if (!editor.getBlockProps) return;

  const blockProps = editor.getBlockProps();
  const { slate } = config.settings;
  const { voltoBlockEmiters } = slate;

  return new Promise((resolve, reject) => {
    if (!editor?.children) return;

    if (editor.children.length === 1) {
      return resolve([blockProps.block]);
    }
    const { properties, onChangeField, onSelectBlock } = editor.getBlockProps();
    const blocksFieldname = getBlocksFieldname(properties);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

    const { index } = blockProps;
    let blocks = [];

    // TODO: should use Editor.levels() instead of Node.children
    const pathRefs = Array.from(Node.children(editor, [])).map(([, path]) =>
      Editor.pathRef(editor, path),
    );

    for (const pathRef of pathRefs) {
      // extra nodes are always extracted after the text node
      let extras = voltoBlockEmiters
        .map((emit) => emit(editor, pathRef))
        .flat(1);

      // The node might have been replaced with a Volto block
      if (pathRef.current) {
        const [childNode] = Editor.node(editor, pathRef.current);
        if (childNode && !Editor.isEmpty(editor, childNode))
          blocks.push(syncCreateSlateBlock([childNode]));
      }
      blocks = [...blocks, ...extras];
    }

    const blockids = blocks.map((b) => b[0]);

    // TODO: add the placeholder block, because we remove it
    // (when we remove the current block)

    const blocksData = omit(
      {
        ...properties[blocksFieldname],
        ...fromEntries(blocks),
      },
      blockProps.block,
    );
    const layoutData = {
      ...properties[blocksLayoutFieldname],
      items: [
        ...properties[blocksLayoutFieldname].items.slice(0, index),
        ...blockids,
        ...properties[blocksLayoutFieldname].items.slice(index),
      ].filter((id) => id !== blockProps.block),
    };

    // TODO: use onChangeFormData instead of this API style
    ReactDOM.unstable_batchedUpdates(() => {
      onChangeField(blocksFieldname, blocksData);
      onChangeField(blocksLayoutFieldname, layoutData);
      onSelectBlock(blockids[blockids.length - 1]);
      // resolve(blockids);
      // or rather this?
      Promise.resolve().then(resolve(blockids));
    });
  });
}
