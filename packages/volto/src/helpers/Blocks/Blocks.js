/**
 * Blocks helper.
 * @module helpers/Blocks
 */

import omit from 'lodash/omit';
import without from 'lodash/without';
import endsWith from 'lodash/endsWith';
import find from 'lodash/find';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import move from 'lodash-move';
import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';
import { applySchemaEnhancer } from '@plone/volto/helpers/Extensions';
import {
  insertInArray,
  removeFromArray,
} from '@plone/volto/helpers/Utils/Utils';

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
 * Pluggable method to test if a block has a set value (any non-empty value)
 * @function hideHandler
 * @param {Object} data Block data
 * @param {boolean} editable Indicates if is editable
 * @return {boolean} True if block is fixed
 */
export const hideHandler = (data, editable) => {
  return (
    !!data?.fixed ||
    (!config.experimental.addBlockButton.enabled &&
      !(data && blockHasValue(data) && !!editable))
  );
};

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
 * Adds a block to the blocks form
 * @function addBlock
 * @param {Object} formData Form data
 * @param {string} type Block type
 * @param {number} index Destination index
 * @return {Array} New block id, New form data
 */
export function addBlock(formData, type, index, blocksConfig) {
  const { settings } = config;
  const id = uuid();
  const idTrailingBlock = uuid();
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const totalItems = formData[blocksLayoutFieldname].items.length;
  const insert = index === -1 ? totalItems : index;

  let value = applyBlockDefaults({
    data: {
      '@type': type,
    },
    intl: _dummyIntl,
  });

  return [
    id,
    applyBlockInitialValue({
      id,
      value,
      blocksConfig,
      formData: {
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
          [id]: value,
          ...(type !== settings.defaultBlockType && {
            [idTrailingBlock]: {
              '@type': settings.defaultBlockType,
            },
          }),
        },
        selected: id,
      },
    }),
  ];
}

/**
 * Gets an initial value for a block, based on configuration
 *
 * This allows blocks that need complex initial data structures to avoid having
 * to call `onChangeBlock` at their creation time, as this is prone to racing
 * issue on block data storage.
 */
export const applyBlockInitialValue = ({
  id,
  value,
  blocksConfig,
  formData,
}) => {
  const type = value['@type'];
  blocksConfig = blocksConfig || config.blocks.blocksConfig;

  if (blocksConfig[type]?.initialValue) {
    value = blocksConfig[type].initialValue({
      id,
      value,
      formData,
    });
    const blocksFieldname = getBlocksFieldname(formData);
    formData[blocksFieldname][id] = value;
  }

  return formData;
};

/**
 * Mutate block, changes the block @type
 * @function mutateBlock
 * @param {Object} formData Form data
 * @param {string} id Block uid to mutate
 * @param {number} value Block's new value
 * @return {Object} New form data
 */
export function mutateBlock(formData, id, value, blocksConfig) {
  const { settings } = config;
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const index = formData[blocksLayoutFieldname].items.indexOf(id) + 1;

  value = applyBlockDefaults({
    data: value,
    intl: _dummyIntl,
  });
  let newFormData;

  // Test if block at index is already a placeholder (trailing) block
  const trailId = formData[blocksLayoutFieldname].items[index];
  if (trailId) {
    const block = formData[blocksFieldname][trailId];
    newFormData = applyBlockInitialValue({
      id,
      value,
      blocksConfig,
      formData: {
        ...formData,
        [blocksFieldname]: {
          ...formData[blocksFieldname],
          [id]: value || null,
        },
      },
    });
    if (!blockHasValue(block)) {
      return newFormData;
    }
  }

  const idTrailingBlock = uuid();
  newFormData = applyBlockInitialValue({
    id,
    value,
    blocksConfig,
    formData: {
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
    },
  });
  return newFormData;
}

/**
 * Insert new block before another block
 * @function insertBlock
 * @param {Object} formData Form data
 * @param {string} id Insert new block before the block with this id
 * @param {number} value New block's value
 * @return {Array} New block id, New form data
 */
export function insertBlock(
  formData,
  id,
  value,
  current = {},
  offset = 0,
  blocksConfig,
) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const index = formData[blocksLayoutFieldname].items.indexOf(id);

  value = applyBlockDefaults({
    data: value,
    intl: _dummyIntl,
  });

  const newBlockId = uuid();
  const newFormData = applyBlockInitialValue({
    id: newBlockId,
    value,
    blocksConfig,
    formData: {
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
  });

  return [newBlockId, newFormData];
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
  const currentIndex =
    formData[blocksLayoutFieldname].items.indexOf(currentBlock);

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
  const currentIndex =
    formData[blocksLayoutFieldname].items.indexOf(currentBlock);

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
 * Generate empty blocks blocks/blocks_layout pair given the type
 * (could be empty, if not type given) and the number of blocks
 * @function blocksFormGenerator
 * @param {number} number How many blocks to generate of the type (could be "empty", if no type provided)
 * @param {string} type The type of the blocks
 * @return {Object} blocks/blocks_layout pair filled with the generated blocks
 */
export function blocksFormGenerator(number, type) {
  const idMap = [...Array(number).keys()].map(() => uuid());
  const start = {
    blocks: {},
    blocks_layout: { items: idMap },
  };

  return {
    ...start,
    blocks: Object.fromEntries(
      start.blocks_layout.items.map((item) => [
        item,
        { '@type': type || 'empty' },
      ]),
    ),
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
export function applyBlockDefaults(
  { data, intl, navRoot, contentType, ...rest },
  blocksConfig,
) {
  // We pay attention to not break on a missing (invalid) block.
  const block_type = data?.['@type'];
  const { blockSchema } =
    (blocksConfig || config.blocks.blocksConfig)[block_type] || {};
  if (!blockSchema) return data;

  let schema =
    typeof blockSchema === 'function'
      ? blockSchema({ data, intl, ...rest })
      : blockSchema;
  schema = applySchemaEnhancer({
    schema,
    formData: data,
    intl,
    navRoot,
    contentType,
  });

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
  // style wrapper object has the form:
  // const styles = {
  //   color: 'red',
  //   backgroundColor: '#AABBCC',
  // }
  // Returns: ['has--color--red', 'has--backgroundColor--AABBCC']

  return Object.entries(obj)
    .filter(([k, v]) => !k.startsWith('--'))
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
 * Converts a name+value style pair (ex: color/red) to a pair of [k, v],
 * such as ["color", "red"] so it can be converted back to an object.
 * For now, only covering the 'CSSProperty' use case.
 */
export const styleDataToStyleObject = (key, value, prefix = '') => {
  if (prefix) {
    return [`--${prefix}${key.replace('--', '')}`, value];
  } else {
    return [key, value];
  }
};

/**
 * Generate styles object from data
 *
 * @function buildStyleObjectFromData
 * @param {Object} data A block data object
 * @param {string} prefix The prefix (could be dragged from a recursive call, initially empty)
 * @return {Object} The style object ready to be passed as prop
 */
export const buildStyleObjectFromData = (data = {}, prefix = '') => {
  // style wrapper object has the form:
  // const styles = {
  //   color: 'red',
  //   '--background-color': '#AABBCC',
  // }
  // Returns: {'--background-color: '#AABBCC'}

  function recursiveBuildStyleObjectFromData(obj, prefix) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([k, v]) => k.startsWith('--') || isObject(v))
        .reduce(
          (acc, [k, v]) => [
            ...acc,
            // Kept for easy debugging
            // ...(() => {
            //   if (isObject(v)) {
            //     return Object.entries(
            //       buildStyleObjectFromData(
            //         v,
            //         `${k.endsWith(':noprefix') ? '' : `${prefix}${k}--`}`,
            //       ),
            //     );
            //   }
            //   return [styleDataToStyleObject(k, v, prefix)];
            // })(),
            ...(isObject(v)
              ? Object.entries(
                  recursiveBuildStyleObjectFromData(
                    v,
                    `${k.endsWith(':noprefix') ? '' : `${prefix}${k}--`}`, // We don't add a prefix if the key ends with the marker suffix
                  ),
                )
              : [styleDataToStyleObject(k, v, prefix)]),
          ],
          [],
        )
        .filter((v) => !!v),
    );
  }

  // If the block has a `@type`, it's a full data block object
  // Then apply the style enhancers
  if (data['@type']) {
    const styleObj = data.styles || {};
    const stylesFromCSSproperties = recursiveBuildStyleObjectFromData(
      styleObj,
      prefix,
    );

    let stylesFromObjectStyleEnhancers = {};
    const enhancers = config.getUtilities({
      type: 'styleWrapperStyleObjectEnhancer',
    });

    enhancers.forEach(({ method }) => {
      stylesFromObjectStyleEnhancers = {
        ...stylesFromObjectStyleEnhancers,
        ...method(data),
      };
    });

    return { ...stylesFromCSSproperties, ...stylesFromObjectStyleEnhancers };
  } else {
    return recursiveBuildStyleObjectFromData(data, prefix);
  }
};

/**
 * Find a matching style by name given a style definition
 *
 * @function findStyleByName
 * @param {Object} styleDefinitions An object with the style definitions
 * @param {string} name The name of the style to find
 * @return {Object} The style object of the matching name
 */
export function findStyleByName(styleDefinitions, name) {
  return styleDefinitions.find((color) => color.name === name)?.style;
}

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

/**
 * Check if a block is a container block
 * check blocks from data as well since some add-ons use that
 * such as @eeacms/volto-tabs-block
 */
export function isBlockContainer(block) {
  return (
    block &&
    (hasBlocksData(block) ||
      (block.hasOwnProperty('data') && hasBlocksData(block.data)))
  );
}

/**
 * Given a `block` object and a list of block types, return a list of block ids matching the types
 *
 * @function findBlocks
 * @param {Object} types A list with the list of types to be matched
 * @return {Array} An array of block ids
 */
export function findBlocks(blocks = {}, types, result = []) {
  Object.keys(blocks).forEach((blockId) => {
    const block = blocks[blockId];
    // check blocks from data as well since some add-ons use that
    // such as @eeacms/volto-tabs-block
    const child_blocks = block.blocks || block.data?.blocks;
    if (types.includes(block['@type'])) {
      result.push(blockId);
    } else if (isBlockContainer(block)) {
      findBlocks(child_blocks, types, result);
    }
  });

  return result;
}

/**
 * Build a block's hierarchy that the order tab can understand and uses
 */
export const getBlocksHierarchy = (properties) => {
  const blocksFieldName = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
  return properties[blocksLayoutFieldname]?.items?.map((n) => ({
    id: n,
    title: properties[blocksFieldName][n]?.['@type'],
    data: properties[blocksFieldName][n],
    children: isBlockContainer(properties[blocksFieldName][n])
      ? getBlocksHierarchy(properties[blocksFieldName][n])
      : [],
  }));
};

/**
 * Move block to different location index within blocks_layout
 * @function moveBlock
 * @param {Object} formData Form data
 * @param {number} source index within form blocks_layout items
 * @param {number} destination index within form blocks_layout items
 * @return {Object} New form data
 */
export function moveBlockEnhanced(formData, { source, destination }) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const blocksFieldName = getBlocksFieldname(formData);

  // If either one of source and destination are present
  // (Moves intra-container or container <-> main container)
  if (source.parent || destination.parent) {
    // Move from a container to the main container
    if (source.parent && !destination.parent) {
      let clonedFormData = { ...formData };

      clonedFormData[blocksFieldName][source.id] =
        formData[blocksFieldName][source.parent][blocksFieldName][source.id];

      clonedFormData[blocksLayoutFieldname].items = insertInArray(
        formData[blocksLayoutFieldname].items,
        source.id,
        destination.position,
      );

      // Remove the source block from the source parent
      const sourceContainer = findContainer(clonedFormData, {
        containerId: source.parent,
      });
      delete sourceContainer[blocksFieldName][source.id];
      sourceContainer[blocksLayoutFieldname].items = removeFromArray(
        sourceContainer[blocksLayoutFieldname].items,
        source.position,
      );

      return clonedFormData;
    }

    // Move from the main container to an inner container
    if (!source.parent && destination.parent) {
      let clonedFormData = { ...formData };

      const destinationContainer = findContainer(clonedFormData, {
        containerId: destination.parent,
      });
      destinationContainer[blocksFieldName][source.id] =
        clonedFormData[blocksFieldName][source.id];
      destinationContainer[blocksLayoutFieldname].items = insertInArray(
        destinationContainer[blocksLayoutFieldname].items,
        source.id,
        destination.position,
      );

      // Remove the source block from the source parent
      delete clonedFormData[blocksFieldName][source.id];
      clonedFormData[blocksLayoutFieldname].items = removeFromArray(
        clonedFormData[blocksLayoutFieldname].items,
        source.position,
      );

      return clonedFormData;
    }

    // Move within the same container (except moves within the main container)
    if (source.parent === destination.parent) {
      let clonedFormData = { ...formData };

      const destinationContainer = findContainer(clonedFormData, {
        containerId: destination.parent,
      });

      destinationContainer[blocksLayoutFieldname].items = move(
        destinationContainer[blocksLayoutFieldname].items,
        source.position,
        destination.position,
      );
      return clonedFormData;
    }

    // Move between containers
    if (source.parent !== destination.parent) {
      let clonedFormData = { ...formData };

      const destinationContainer = findContainer(clonedFormData, {
        containerId: destination.parent,
      });
      destinationContainer[blocksFieldName][source.id] =
        formData[blocksFieldName][source.parent][blocksFieldName][source.id];

      destinationContainer[blocksLayoutFieldname].items = insertInArray(
        destinationContainer[blocksLayoutFieldname].items,
        source.id,
        destination.position,
      );

      // Remove the source block from the source parent
      const sourceContainer = findContainer(clonedFormData, {
        containerId: source.parent,
      });
      delete sourceContainer[blocksFieldName][source.id];
      sourceContainer[blocksLayoutFieldname].items = removeFromArray(
        sourceContainer[blocksLayoutFieldname].items,
        source.position,
      );

      return clonedFormData;
    }
  }

  // Default catch all, no source/destination parent specified
  // Move within the main container
  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: move(
        formData[blocksLayoutFieldname].items,
        source.position,
        destination.position,
      ),
    },
  };
}

/**
 * Finds the container with the specified containerId in the given formData.
 *
 * @param {object} formData - The form data object.
 * @param {object} options - The options object.
 * @param {string} options.containerId - The ID of the container to find.
 * @returns {object|undefined} - The container object if found, otherwise undefined.
 */
export const findContainer = (formData, { containerId }) => {
  if (
    formData.blocks[containerId] &&
    Object.keys(formData.blocks[containerId]).includes('blocks') &&
    Object.keys(formData.blocks[containerId]).includes('blocks_layout')
  ) {
    return formData.blocks[containerId];
  }

  let container;
  Object.keys(formData.blocks).every((blockId) => {
    const block = formData.blocks[blockId];
    if (
      formData.blocks[blockId] &&
      Object.keys(formData.blocks[blockId]).includes('blocks') &&
      Object.keys(formData.blocks[blockId]).includes('blocks_layout')
    ) {
      container = findContainer(block, { containerId });
    }
    if (container) {
      return false;
    } else {
      return true;
    }
  });

  return container;
};

const _dummyIntl = {
  formatMessage() {},
};
