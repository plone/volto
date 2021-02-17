import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation';
import { restrictToPath } from '@plone/volto/helpers';
// import { matchPath } from 'react-router-dom';

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
    ],

    // available: ({ pathname, slotData }) => true,

    // optional
    // computeLayout(staticFills, persistentFills) {
    //   return [...persistentFills, ...staticFills];
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
