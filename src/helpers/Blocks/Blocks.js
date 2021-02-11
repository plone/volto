/**
 * Blocks helper.
 * @module helpers/Blocks
 */

import { omit, without, endsWith, find, keys } from 'lodash';
import move from 'lodash-move';
import { v4 as uuid } from 'uuid';

import { settings, blocks } from '~/config';

/**
 * Get blocks field.
 * @function getBlocksFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks
 */
export function getBlocksFieldname(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) || null
  );
}

/**
 * Get blocks layout field.
 * @function getBlocksLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks layout
 */
export function getBlocksLayoutFieldname(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks_layout'),
    ) || null
  );
}

/**
 * Has blocks data.
 * @function hasBlocksData
 * @param {Object} props Properties.
 * @return {boolean} True if it has blocks data.
 */
export function hasBlocksData(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) !== undefined
  );
}

/*
 * Pluggable method to test if a block has a set value (any non-empty value)
 * @function blockHasValue
 * @param {Object} data Block data
 * @return {boolean} True if block has a non-empty value
 */
export function blockHasValue(data) {
  const blockType = data['@type'];
  const check = blocks.blocksConfig[blockType]?.blockHasValue;
  if (!check) {
    return true;
  }
  return check(data);
}

/**
 * Get block pairs of [id, block] from content properties
 * @function getBlocks
 * @param {Object} properties
 * @return {Array} a list of block [id, value] pairs, in order from layout
 */
export const getBlocks = (properties) => {
  const blocksFieldName = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
  return (
    properties[blocksLayoutFieldname]?.items?.map((n) => [
      n,
      properties[blocksFieldName][n],
    ]) || []
  );
};

export function moveBlock(formData, source, destination) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: move(formData[blocksLayoutFieldname].items, source, destination),
    },
  };
}

export function deleteBlock(formData, blockId) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: without(formData[blocksLayoutFieldname].items, blockId),
    },
    [blocksFieldname]: omit(formData[blocksFieldname], [blockId]),
  };
}

export function addBlock(formData, type, index) {
  const id = uuid();
  const idTrailingBlock = uuid();
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const totalItems = formData[blocksLayoutFieldname].items.length;
  const insert = index === -1 ? totalItems : index;

  return [
    id,
    {
      ...formData,
      [blocksLayoutFieldname]: {
        items: [
          ...formData[blocksLayoutFieldname].items.slice(0, insert),
          id,
          ...(type !== settings.defaultBlockType ? [idTrailingBlock] : []),
          ...formData[blocksLayoutFieldname].items.slice(insert),
        ],
      },
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [id]: {
          '@type': type,
        },
        ...(type !== settings.defaultBlockType && {
          [idTrailingBlock]: {
            '@type': settings.defaultBlockType,
          },
        }),
      },
    },
  ];
}

export function mutateBlock(formData, id, value) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const index = formData[blocksLayoutFieldname].items.indexOf(id) + 1;

  // Test if block at index is already a placeholder (trailing) block
  const trailId = formData[blocksLayoutFieldname].items[index];
  if (trailId) {
    const block = formData[blocksFieldname][trailId];
    if (!blockHasValue(block)) {
      return {
        ...formData,
        [blocksFieldname]: {
          ...formData[blocksFieldname],
          [id]: value || null,
        },
      };
    }
  }

  const idTrailingBlock = uuid();
  return {
    ...formData,
    [blocksFieldname]: {
      ...formData[blocksFieldname],
      [id]: value || null,
      [idTrailingBlock]: {
        '@type': settings.defaultBlockType,
      },
    },
    [blocksLayoutFieldname]: {
      items: [
        ...formData[blocksLayoutFieldname].items.slice(0, index),
        idTrailingBlock,
        ...formData[blocksLayoutFieldname].items.slice(index),
      ],
    },
  };
}

export function changeBlock(formData, id, value) {
  const blocksFieldname = getBlocksFieldname(formData);
  return {
    ...formData,
    [blocksFieldname]: {
      ...formData[blocksFieldname],
      [id]: value || null,
    },
  };
}

export function nextBlockId(formData, currentBlock) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const currentIndex = formData[blocksLayoutFieldname].items.indexOf(
    currentBlock,
  );

  if (currentIndex === formData[blocksLayoutFieldname].items.length - 1) {
    // We are already at the bottom block don't do anything
    return null;
  }

  const newIndex = currentIndex + 1;
  return formData[blocksLayoutFieldname].items[newIndex];
}

export function previousBlockId(formData, currentBlock) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const currentIndex = formData[blocksLayoutFieldname].items.indexOf(
    currentBlock,
  );

  if (currentIndex === 0) {
    // We are already at the top block don't do anything
    return null;
  }
  const newindex = currentIndex - 1;
  return formData[blocksLayoutFieldname].items[newindex];
}

export function emptyBlocksForm() {
  const id = uuid();
  return {
    blocks: {
      [id]: {
        '@type': settings.defaultBlockType,
      },
    },
    blocks_layout: { items: [id] },
  };
}
