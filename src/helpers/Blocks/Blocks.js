/**
 * Blocks helper.
 * @module helpers/Blocks
 */

import { omit, without, endsWith, find, isObject, keys, merge } from 'lodash';
import move from 'lodash-move';
import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';
import { applySchemaEnhancer } from '@plone/volto/helpers';

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

/**
 * Pluggable method to test if a block has a set value (any non-empty value)
 * @function blockHasValue
 * @param {Object} data Block data
 * @return {boolean} True if block has a non-empty value
 */
export function blockHasValue(data) {
  const { blocks } = config;
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

/**
 * Move block to different location index within blocks_layout
 * @function moveBlock
 * @param {Object} formData Form data
 * @param {number} source index within form blocks_layout items
 * @param {number} destination index within form blocks_layout items
 * @return {Object} New form data
 */
export function moveBlock(formData, source, destination) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: move(formData[blocksLayoutFieldname].items, source, destination),
    },
  };
}

/**
 * Delete block by id
 * @function deleteBlock
 * @param {Object} formData Form data
 * @param {string} blockId Block uid
 * @return {Object} New form data
 */
export function deleteBlock(formData, blockId) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  let newFormData = {
    ...formData,
    [blocksLayoutFieldname]: {
      items: without(formData[blocksLayoutFieldname].items, blockId),
    },
    [blocksFieldname]: omit(formData[blocksFieldname], [blockId]),
  };

  if (newFormData[blocksLayoutFieldname].items.length === 0) {
    newFormData = addBlock(newFormData, config.settings.defaultBlockType, 0);
  }

  return newFormData;
}

/**
 * Add block
 * @function addBlock
 * @param {Object} formData Form data
 * @param {string} type Block type
 * @param {number} index Destination index
 * @return {Array} New block id, New form data
 */
export function addBlock(formData, type, index) {
  const { settings } = config;
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
      selected: id,
    },
  ];
}

/**
 * Mutate block
 * @function mutateBlock
 * @param {Object} formData Form data
 * @param {string} id Block uid to mutate
 * @param {number} value Block's new value
 * @return {Object} New form data
 */
export function mutateBlock(formData, id, value) {
  const { settings } = config;
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

/**
 * Insert new block before another block
 * @function insertBlock
 * @param {Object} formData Form data
 * @param {string} id Insert new block before the block with this id
 * @param {number} value New block's value
 * @return {Array} New block id, New form data
 */
export function insertBlock(formData, id, value, current = {}, offset = 0) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const index = formData[blocksLayoutFieldname].items.indexOf(id);

  const newBlockId = uuid();
  return [
    newBlockId,
    {
      ...formData,
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [newBlockId]: value || null,
        [id]: {
          ...formData[blocksFieldname][id],
          ...current,
        },
      },
      [blocksLayoutFieldname]: {
        items: [
          ...formData[blocksLayoutFieldname].items.slice(0, index + offset),
          newBlockId,
          ...formData[blocksLayoutFieldname].items.slice(index + offset),
        ],
      },
    },
  ];
}

/**
 * Change block
 * @function changeBlock
 * @param {Object} formData Form data
 * @param {string} id Block uid to change
 * @param {number} value Block's new value
 * @return {Object} New form data
 */
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

/**
 * Get the next block UID within form
 * @function nextBlockId
 * @param {Object} formData Form data
 * @param {string} currentBlock Block uid
 * @return {string} Next block uid
 */
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

/**
 * Get the previous block UID within form
 * @function previousBlockId
 * @param {Object} formData Form data
 * @param {string} currentBlock Block uid
 * @return {string} Previous block uid
 */
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

/**
 * Generate empty block form
 * @function emptyBlocksForm
 * @param {Object} formData Form data
 * @return {Object} Empty blocks form with one defaultBlockType block
 */
export function emptyBlocksForm() {
  const { settings } = config;
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

/**
 * Recursively discover blocks in data and call the provided callback
 * @function visitBlocks
 * @param {Object} content A content data structure (an object with blocks and blocks_layout)
 * @param {Function} callback A function to call on each discovered block
 */
export function visitBlocks(content, callback) {
  const queue = getBlocks(content);
  while (queue.length > 0) {
    const [id, blockdata] = queue.shift();
    callback([id, blockdata]);

    // assumes that a block value is like: {blocks, blocks_layout} or
    // { data: {blocks, blocks_layout}}
    if (Object.keys(blockdata || {}).indexOf('blocks') > -1) {
      queue.push(...getBlocks(blockdata));
    }
    if (Object.keys(blockdata?.data || {}).indexOf('blocks') > -1) {
      queue.push(...getBlocks(blockdata.data));
    }
  }
}

let _logged = false;

/**
 * Initializes data with the default values coming from schema
 */
export function applySchemaDefaults({ data = {}, schema, intl }) {
  if (!intl && !_logged) {
    // Old code that doesn't pass intl doesn't get ObjectWidget defaults
    // eslint-disable-next-line no-console
    console.warn(
      `You should pass intl to any applySchemaDefaults call. By failing to pass
      the intl object, your ObjectWidget fields will not get default values
      extracted from their schema.`,
    );
    _logged = true;
  }

  const derivedData = merge(
    Object.keys(schema.properties).reduce((accumulator, currentField) => {
      return typeof schema.properties[currentField].default !== 'undefined'
        ? {
            ...accumulator,
            [currentField]: schema.properties[currentField].default,
          }
        : intl &&
          schema.properties[currentField].schema &&
          !(schema.properties[currentField].widget === 'object_list') // TODO: this should be renamed as itemSchema
        ? {
            ...accumulator,
            [currentField]: {
              ...applySchemaDefaults({
                data: { ...data[currentField], ...accumulator[currentField] },
                schema:
                  typeof schema.properties[currentField].schema === 'function'
                    ? schema.properties[currentField].schema({
                        data: accumulator[currentField],
                        formData: accumulator[currentField],
                        intl,
                      })
                    : schema.properties[currentField].schema,
                intl,
              }),
            },
          }
        : accumulator;
    }, {}),
    data,
  );

  return derivedData;
}

/**
 * Apply the block's default (as defined in schema) to the block data.
 *
 * @function applyBlockDefaults
 * @param {Object} params An object with data, intl and anything else
 * @return {Object} Derived data, with the defaults extracted from the schema
 */
export function applyBlockDefaults({ data, intl, ...rest }, blocksConfig) {
  // We pay attention to not break on a missing (invalid) block.
  const block_type = data?.['@type'];
  const { blockSchema } =
    (blocksConfig || config.blocks.blocksConfig)[block_type] || {};
  if (!blockSchema) return data;

  let schema =
    typeof blockSchema === 'function'
      ? blockSchema({ data, intl, ...rest })
      : blockSchema;
  schema = applySchemaEnhancer({ schema, formData: data, intl });

  return applySchemaDefaults({ data, schema, intl });
}

/**
 * Converts a name+value style pair (ex: color/red) to a classname,
 * such as "has--color--red"
 *
 * This can be expanded via the style names, by suffixing them with special
 * converters. See config.settings.styleClassNameConverters. Examples:
 *
 * styleToClassName('theme:noprefix', 'primary') returns "primary"
 * styleToClassName('inverted:bool', true) returns 'inverted'
 * styleToClassName('inverted:bool', false) returns ''
 */
export const styleToClassName = (key, value, prefix = '') => {
  const converters = config.settings.styleClassNameConverters;
  const [name, ...convIds] = key.split(':');

  return (convIds.length ? convIds : ['default'])
    .map((id) => converters[id])
    .reduce((acc, conv) => conv(acc, value, prefix), name);
};

export const buildStyleClassNamesFromData = (obj = {}, prefix = '') => {
  // styles has the form:
  // const styles = {
  //   color: 'red',
  //   backgroundColor: '#AABBCC',
  // }
  // Returns: ['has--color--red', 'has--backgroundColor--AABBCC']

  return Object.entries(obj)
    .reduce(
      (acc, [k, v]) => [
        ...acc,
        ...(isObject(v)
          ? buildStyleClassNamesFromData(v, `${prefix}${k}--`)
          : [styleToClassName(k, v, prefix)]),
      ],
      [],
    )
    .filter((v) => !!v);
};

/**
 * Generate classNames from extenders
 *
 * @function buildStyleClassNamesExtenders
 * @param {Object} params An object with data, content and block (current block id)
 * @return {Array} Extender classNames resultant array
 */
export const buildStyleClassNamesExtenders = ({
  block,
  content,
  data,
  classNames,
}) => {
  return config.settings.styleClassNameExtenders.reduce(
    (acc, extender) => extender({ block, content, data, classNames: acc }),
    classNames,
  );
};

/**
 * Return previous/next blocks given the content object and the current block id
 *
 * @function getPreviousNextBlock
 * @param {Object} params An object with the content object and block (current block id)
 * @return {Array} An array with the signature [previousBlock, nextBlock]
 */
export const getPreviousNextBlock = ({ content, block }) => {
  const previousBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(block) - 1
      ]
    ];
  const nextBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(block) + 1
      ]
    ];

  return [previousBlock, nextBlock];
};
