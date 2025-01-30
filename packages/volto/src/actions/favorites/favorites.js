import { cloneBlocks } from '@plone/volto/helpers/Blocks/cloneBlocks';
import config from '@plone/volto/registry';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

export function loadFavorites() {
  return {
    type: LOAD_FAVORITES,
  };
}

export function addToFavorites(blockData) {
  const { id, type, data } = blockData;
  const blockConfig = config.blocks.blocksConfig[type];
  const clonedData = blockConfig?.cloneData
    ? blockConfig.cloneData(data)
    : cloneBlocks(data);

  return {
    type: ADD_TO_FAVORITES,
    block: {
      id,
      type,
      data: clonedData,
    },
  };
}

export function removeFromFavorites(blockId) {
  return {
    type: REMOVE_FROM_FAVORITES,
    blockId,
  };
}
