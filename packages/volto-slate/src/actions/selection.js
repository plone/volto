import { SAVE_SLATE_BLOCK_SELECTION } from '@plone/volto-slate/constants';

/**
 * Action creator for the action to save the selection of a Slate block. The
 * selection is saved into the form's data for later usage.
 *
 * @param {string} blockid The ID of the block that should have its selection
 * saved.
 * @param {object} selection An object implementing the Slate's `Range`
 * interface or a string: 'start', 'end'.
 *
 * @todo Clarify here if the `selection` parameter can be `null` or `undefined`.
 *
 * @returns The action object.
 */
export default function saveSlateBlockSelection(blockid, selection) {
  return {
    type: SAVE_SLATE_BLOCK_SELECTION,
    blockid,
    selection,
  };
}
