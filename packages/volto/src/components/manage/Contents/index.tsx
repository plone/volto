import { lazy } from 'react';
export const Contents = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/Contents'
    ),
);

export const ContentsRenameModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsRenameModal'
    ),
);

export const ContentsBreadcrumbs = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsBreadcrumbs'
    ),
);

export const ContentsIndexHeader = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsIndexHeader'
    ),
);

export const ContentsItem = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsItem'
    ),
);

export const ContentsUploadModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsUploadModal'
    ),
);

export const ContentsPropertiesModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsPropertiesModal'
    ),
);

export const ContentsWorkflowModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsWorkflowModal'
    ),
);

export const ContentsTagsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Contents" */ '@plone/volto/components/manage/Contents/ContentsTagsModal'
    ),
);
