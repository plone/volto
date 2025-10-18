import type { Content } from '@plone/types';

export function hasBlocksData(content: Content) {
  return (
    Object.keys(content).find(
      (key) => key !== 'volto.blocks' && key.endsWith('blocks'),
    ) !== undefined
  );
}

export function getBlocksFieldName(
  props: Content,
  suffix: string = 'blocks',
): string | null {
  return (
    Object.keys(props).find(
      (key) => key !== 'volto.blocks' && key.endsWith(suffix),
    ) || null
  );
}
