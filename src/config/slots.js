import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation';

const defaultSlots = {
  asideRightSlot: {
    title: 'Right column',
    persistent: true,
    staticFills: [
      { path: '/', component: ContextNavigation, props: {}, exact: false },
    ],
  },
};

export default defaultSlots;
