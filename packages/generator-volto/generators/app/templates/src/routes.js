/**
 * Routes.
 * @module routes
 */

import App from '@plone/volto/components/theme/App/App';
import { defaultRoutes } from '@plone/volto/routes';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Add your routes here
      ...defaultRoutes,
    ],
  },
];

export default routes;
