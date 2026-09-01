import { v4 as uuid } from 'uuid';
import { load } from 'redux-localstorage-simple';
import {
  getBlocks,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import config from '@plone/volto/registry';

const fallbackBlocksClipboardStates = [
  'blocksClipboard.cut',
  'blocksClipboard.copy',
];

export function cloneBlocks(blocksData) {
  if (hasBlocksData(blocksData)) {
    const blocksFieldname = getBlocksFieldname(blocksData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(blocksData);

    const cloneWithIds = getBlocks(blocksData)
      .map(([, block]) => {
        const blockConfig = config.blocks.blocksConfig[block['@type']];
        return blockConfig?.cloneData
          ? blockConfig.cloneData(block)
          : [uuid(), cloneBlocks(block)];
      })
      .filter((info) => !!info); // some blocks may refuse to be copied

    return {
      ...blocksData,
      [blocksFieldname]: {
        ...Object.assign(
          {},
          ...cloneWithIds.map(([id, data]) => ({ [id]: data })),
        ),
      },
      [blocksLayoutFieldname]: {
        ...blocksData[blocksLayoutFieldname],
        items: [...cloneWithIds.map(([id]) => id)],
      },
    };
  }

  return blocksData;
}

const getBlocksClipboardStates = () => {
  const persistentReducers = config.settings?.persistentReducers || [];
  const blocksClipboardStates = persistentReducers.filter(
    (state) =>
      state === 'blocksClipboard' || state.startsWith('blocksClipboard.'),
  );

  return blocksClipboardStates.length
    ? blocksClipboardStates
    : fallbackBlocksClipboardStates;
};

export const loadBlocksClipboardFromStorage = () =>
  load({
    states: getBlocksClipboardStates(),
    disableWarnings: true,
  })?.blocksClipboard ||
  load({
    states: ['blocksClipboard'],
    disableWarnings: true,
  })?.blocksClipboard;
