import config from '@plone/volto/registry';

export * from './backspaceInList';
export * from './breakBlocks';
export * from './indentListItems';
export * from './joinBlocks';
export * from './moveListItems';
export * from './softBreak';
export * from './traverseBlocks';
export * from './unwrapEmptyString';
export * from './slashMenu';
export * from './cancelEsc';

/**
 * Takes all the handlers from `slate.textblockKeyboardHandlers` that are
 * associated with the key that was pressed to generate the `event` and runs
 * them all until one of them returns `true`, moment when the rest of the
 * handlers are skipped.
 * @param {Editor} editor
 * @param {KeyboardEvent} event
 */
export function handleKey({ editor, event }) {
  const { slate } = config.settings;

  const handlers = slate.textblockKeyboardHandlers[event.key];

  if (handlers) {
    // a handler can return `true` to signify it has handled the event in this
    // case, the execution flow is stopped
    return handlers.find((handler) => handler({ editor, event }));
  }
}

/**
 * Takes all the handlers from `slate.textblockDetachedKeyboardHandlers` that are
 * associated with the key that was pressed to generate the `event` and runs
 * them all until one of them returns `true`, moment when the rest of the
 * handlers are skipped.
 * @param {Editor} editor
 * @param {KeyboardEvent} event
 */
export function handleKeyDetached({ editor, event }) {
  const { slate } = config.settings;

  const handlers = slate.textblockDetachedKeyboardHandlers[event.key];

  if (handlers) {
    // a handler can return `true` to signify it has handled the event in this
    // case, the execution flow is stopped
    return handlers.find((handler) => handler({ editor, event }));
  }
}
