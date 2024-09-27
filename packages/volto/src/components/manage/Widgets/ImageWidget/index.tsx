import loadable from '@loadable/component';

export const ImageWidget = loadable(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone/volto/components/manage/Widgets/ImageWidget/ImageWidget'
    ),
);

export const ImageInput = loadable(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone/volto/components/manage/Widgets/ImageWidget/ImageInput'
    ),
);

export const ImageToolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone/volto/components/manage/Widgets/ImageWidget/ImageToolbar'
    ),
);
