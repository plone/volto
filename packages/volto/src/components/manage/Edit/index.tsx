import loadable from '@loadable/component';

export const Edit = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Edit/Edit'
    ),
);
