import config from '@plone/volto/registry';

export function getTeaserBlockSizes({
  data = {},
  inGrid = false,
  columns = 1,
} = {}) {
  const { tabletBreakpoint, defaultContainerWidth } = config.settings.layout;
  const desktopImageWidth = Math.floor(
    defaultContainerWidth / (inGrid ? columns : 2),
  );
  return `auto, (max-width: ${tabletBreakpoint}px) 100vw, ${desktopImageWidth}px`;
}
