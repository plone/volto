import loadable from '@loadable/component';

export const Add = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Add/Add'
    ),
);
