import './storybook-base.css';
import '../../theming/styles/theme.css';
import '../styles/main.css';
import config from '@plone/registry';
import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  type RouteObject,
} from 'react-router';
import installSlots from '../index';

config.set('slots', {});
config.set('utilities', {});
installSlots(config);

type RouterParams = {
  initialEntries?: string[]; // e.g. ['/users/42']
  path?: string; // e.g. '/users/:id'
  parentId?: string; // e.g. 'root' if your code calls useRouteLoaderData('root')
  routeId?: string; // id for the story route if your code reads child data
  parentLoaderData?: any; // mocked data for the parent (root) route
  loaderData?: any; // mocked data for the story route
};

const withRR7FrameworkRouter = (Story: any, context: any) => {
  const {
    initialEntries = ['/'],
    path = '/',
    parentId = 'root',
    routeId = 'story',
    parentLoaderData,
    loaderData,
  } = (context.parameters.router as RouterParams) ?? {};

  const routes: RouteObject[] = [
    {
      id: parentId,
      path: '/',
      element: <Outlet />, // <-- IMPORTANT: renders children via Outlet
      children: [
        {
          id: routeId,
          path, // absolute works fine here
          element: <Story />, // render the story
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries,
    hydrationData: {
      loaderData: {
        [parentId]: parentLoaderData,
        [routeId]: loaderData,
      },
    },
  });

  return <RouterProvider router={router} />;
};

export const decorators = [withRR7FrameworkRouter];

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
