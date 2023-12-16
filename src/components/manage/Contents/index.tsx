import loadable from '@loadable/component';

export const Contents = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/Contents'
    ),
);

export const ContentsRenameModal = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsRenameModal'
    ),
);

export const ContentsBreadcrumbs = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsBreadcrumbs'
    ),
);

export const ContentsIndexHeader = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsIndexHeader'
    ),
);

export const ContentsItem = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsItem'
    ),
);

export const ContentsUploadModal = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsUploadModal'
    ),
);

export const ContentsPropertiesModal = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsPropertiesModal'
    ),
);

export const ContentsWorkflowModal = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsWorkflowModal'
    ),
);

export const ContentsTagsModal = loadable(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsTagsModal'
    ),
);
