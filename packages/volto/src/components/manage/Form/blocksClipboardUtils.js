import { load } from 'redux-localstorage-simple';
import config from '@plone/volto/registry';
import { cloneBlocks } from '@plone/volto/helpers/Blocks/cloneBlocks';

const fallbackBlocksClipboardStates = [
  'blocksClipboard.cut',
  'blocksClipboard.copy',
];

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

export { cloneBlocks };
