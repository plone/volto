import type { GetContentResponse } from '@plone/types/content/get';
import { find, keys, endsWith } from 'lodash';

export function hasBlocksData(content: GetContentResponse) {
  return (
    find(
      keys(content),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) !== undefined
  );
}
