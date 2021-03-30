import { matchPath } from 'react-router-dom';

export function restrictToPath(match) {
  return ({ pathname }) => matchPath(pathname, match);
}

/**
 * Should a slot be rendered?
 *
 * Based on persistent slot data and slot definitions, this function answers
 * the slot availability question.
 */
export function isSlotAvailable({ slotName, pathname, slotData, slots }) {
  return (
    [
      ...(slotData?.items?.[slotName]?.blocks_layout?.items || []),
      ...[
        slots[slotName]?.items?.filter((reg) =>
          reg.available({ pathname, slotName, slotData, slots }),
        ),
      ],
    ].length > 0
  );
}

/**
 * Set restricted to false for slot fills
 */
export function slotsBlocksConfig(blocksConfig) {
  return Object.assign(
    {},
    ...Object.keys(blocksConfig).map((id) => ({
      [id]: {
        ...blocksConfig[id],
        restricted: blocksConfig[id].isSlotFill
          ? false
          : blocksConfig[id].isSlotFill,
      },
    })),
  );
}
