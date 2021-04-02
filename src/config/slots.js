import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation';
import { restrictToPath } from '@plone/volto/helpers';

const defaultSlots = {
  asideRightSlot: {
    title: 'Right column',
    manage: true,

    items: [
      // {
      //   id: 'ContextNavigation',
      //   component: ContextNavigation,
      //   props: {},
      //   available: restrictToPath({
      //     path: '/',
      //     exact: false,
      //   }),
      // },
    ],

    available: ({ pathname, slotData, slotName, slots }) => {
      return !!slotData?.items?.length;
    },

    // optional
    // computeLayout({staticFills, persistentFills}) {
    //   return [...persistentFillsIds, ...staticFillsIds];
    // },

    // optional
    // RenderChild: (props) => {
    //   return <div className="portlet"></div>;
    // },

    // optional
    // component: FooterSlotRenderer,
  },
};

export default defaultSlots;
