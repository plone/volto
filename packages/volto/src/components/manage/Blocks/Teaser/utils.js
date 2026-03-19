import config from '@plone/volto/registry';

export function getTeaserBlockSizes({ data = {}, columns = 1 } = {}) {
  const width = config.settings.defaultWidth;
  return `auto, (max-width: ${width}px) 100vw, ${Math.floor(width / columns)}px`;
}
