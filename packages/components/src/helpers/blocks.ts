import type { Content } from '@plone/types';
import find from 'lodash/find';
import keys from 'lodash/keys';
import endsWith from 'lodash/endsWith';

export function hasBlocksData(content: Content) {
  return (
    find(
      keys(content),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) !== undefined
  );
}
