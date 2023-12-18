import type { Content } from '@plone/types';
import { find, keys, endsWith } from 'lodash';

export function hasBlocksData(content: Content) {
  return (
    find(
      keys(content),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) !== undefined
  );
}
