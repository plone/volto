import { v4 as uuid } from 'uuid';

export function getSimpleDefaultBlocks(initialBlocksConfig: string[]) {
  let initialBlocksLayout;
  let initialBlocks;
  if (initialBlocksConfig) {
    initialBlocksLayout = initialBlocksConfig.map(() => uuid());
    initialBlocks = initialBlocksLayout.reduce(
      (acc, value, index) => ({
        ...acc,
        [value]: { '@type': initialBlocksConfig[index] },
      }),
      {},
    );
  } else {
    return null;
  }

  return [initialBlocks, initialBlocksLayout];
}

export function getDefaultBlocks(initialBlocksConfig: object[]) {
  let initialBlocksLayout;
  let initialBlocks;
  if (initialBlocksConfig) {
    initialBlocksLayout = initialBlocksConfig.map(() => uuid());
    initialBlocks = initialBlocksLayout.reduce(
      (acc, value, index) => ({
        ...acc,
        [value]: initialBlocksConfig[index],
      }),
      {},
    );
  } else {
    return null;
  }

  return [initialBlocks, initialBlocksLayout];
}
