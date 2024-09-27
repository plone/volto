import loadable from '@loadable/component';

export const Sidebar = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/Sidebar'
    ),
);

export const ObjectBrowserBody = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/ObjectBrowserBody'
    ),
);

export const ObjectBrowserNav = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/ObjectBrowserNav'
    ),
);

export const SidebarPopup = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/SidebarPopup'
    ),
);

export const SidebarPortal = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/SidebarPortal'
    ),
);

export const AlignBlock = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sidebar/AlignBlock'
    ),
);
