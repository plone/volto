import { lazy } from 'react';

export const AlignWidget = lazy(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone/volto/components/manage/Widgets/AlignWidget'
    ),
);

export const TitleWidget = lazy(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone/volto/components/theme/Widgets/TitleWidget'
    ),
);
// export const ButtonsWidget = loadable(
//   () =>
//     import(
//       /* webpackChunkName: "Widgets" */ '@plone/volto/components/manage/Widgets/ButtonsWidget'
//     ),
// );

export const Moment = import('moment');
