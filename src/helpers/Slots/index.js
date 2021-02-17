import { matchPath } from 'react-router-dom';

export function restrictToPath(match) {
  return ({ pathname }) => matchPath(pathname, match);
}

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
