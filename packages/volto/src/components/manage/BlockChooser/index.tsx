import loadable from '@loadable/component';

export const BlockChooser = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/BlockChooser/BlockChooser'
    ),
);
export const BlockChooserButton = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/BlockChooser/BlockChooserButton'
    ),
);
