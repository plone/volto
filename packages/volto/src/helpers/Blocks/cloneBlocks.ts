// @ts-nocheck
import { v4 as uuid } from 'uuid';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import config from '@plone/registry';

export function cloneBlocks(blocksData) {
  if (hasBlocksData(blocksData)) {
    const blocksFieldname = getBlocksFieldname(blocksData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(blocksData);

    const cloneWithIds = Object.keys(blocksData.blocks)
      .map((key) => {
        const block = blocksData.blocks[key];
        const blockConfig = config.blocks.blocksConfig[blocksData['@type']];
        return blockConfig?.cloneData
          ? blockConfig.cloneData(block)
          : [uuid(), cloneBlocks(block)];
      })
      .filter((info) => !!info); // some blocks may refuse to be copied

    const newBlockData = {
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

    return newBlockData;
  }

  return blocksData;
}
