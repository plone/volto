import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation';
import PersistentSlotRenderer from '@plone/volto/components/theme/SlotRenderer/PersistentSlotRenderer';
import { matchPath } from 'react-router-dom';

function restrictToPath(match) {
  return ({ pathname }) => matchPath(pathname, match);
}

const defaultSlots = {
  asideRightSlot: {
    title: 'Right column',
    manage: true,
    items: [
      {
        id: 'ContextNavigation',
        component: ContextNavigation,
        props: {},
        available: restrictToPath({
          path: '/',
          exact: false,
        }),
      },
      {
        id: 'PersistentSlotFills',
        component: PersistentSlotRenderer,
        props: {},
        available: ({ slotData }) =>
          slotData?.asideRightSlot?.blocks_layout?.items,
      },
    ],
    render: (fills) => fills,
  },
};

export default defaultSlots;
