import loadable from '@loadable/component';

export const Toolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Toolbar/Toolbar'
    ),
);

export const More = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Toolbar/More'
    ),
);

export const PersonalTools = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Toolbar/PersonalTools'
    ),
);

export const Types = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Toolbar/Types'
    ),
);

export const StandardWrapper = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Toolbar/StandardWrapper'
    ),
);
