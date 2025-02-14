export const cancelEsc = ({ editor, event }) => {
  // TODO: this doesn't work, escape canceling doesn't work.
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
  event.preventDefault();
  return true;
};
