import type { Content } from '@plone/types';

export function hasBlocksData(content: Content) {
  return (
    Object.keys(content).find(
      (key) => key !== 'volto.blocks' && key.endsWith('blocks'),
    ) !== undefined
  );
}
