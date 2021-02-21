// import { getBaseUrl } from '@plone/volto/helpers';
// import config from '@plone/volto/registry';
// import {
//   getBreadcrumbs,
//   getContent,
//   getNavigation,
//   getTypes,
//   getWorkflow,
// } from '@plone/volto/actions';

const AsyncInitialProps = [
  {
    route: {
      path: '/**',
    },
    asyncProps: [
      // {
      //   key: 'breadcrumbs',
      //   promise: ({ location, store: { dispatch } }) => {
      //     return (
      //       __SERVER__ &&
      //       dispatch(getBreadcrumbs(getBaseUrl(location.pathname)))
      //     );
      //   },
      // },
      // {
      //   key: 'content',
      //   promise: ({ location, store: { dispatch } }) =>
      //     __SERVER__ && dispatch(getContent(getBaseUrl(location.pathname))),
      // },
      // {
      //   key: 'navigation',
      //   promise: ({ location, store: { dispatch } }) =>
      //     __SERVER__ &&
      //     dispatch(
      //       getNavigation(
      //         getBaseUrl(location.pathname),
      //         config.settings.navDepth,
      //       ),
      //     ),
      // },
      // {
      //   key: 'types',
      //   promise: ({ location, store: { dispatch } }) =>
      //     __SERVER__ && dispatch(getTypes(getBaseUrl(location.pathname))),
      // },
      // {
      //   key: 'workflow',
      //   promise: ({ location, store: { dispatch } }) =>
      //     __SERVER__ && dispatch(getWorkflow(getBaseUrl(location.pathname))),
      // },
    ],
  },
];

export default AsyncInitialProps;
