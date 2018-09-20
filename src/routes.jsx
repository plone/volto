/**
 * Routes.
 * @module routes
 */
import React from 'react';

import {
  Add,
  ChangePassword,
  Contents,
  Controlpanel,
  Controlpanels,
  Edit,
  Diff,
  Delete,
  History,
  View,
  NotFound,
  Layout,
  Login,
  Logout,
  ModerateComments,
  PasswordReset,
  PersonalInformation,
  PersonalPreferences,
  Register,
  RequestPasswordReset,
  Search,
  Sharing,
  UsersControlpanel,
} from './components';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: View,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/controlpanel',
    component: Controlpanels,
    routes: [
      {
        path: '/controlpanel/moderate-comments',
        component: ModerateComments,
      },
      {
        path: '/controlpanel/users',
        component: UsersControlpanel,
      },
      {
        path: '/controlpanel/:id',
        component: Controlpanel,
      },
    ],
  },
  {
    path: '/change-password',
    component: ChangePassword,
  },
  {
    path: '/personal-information',
    component: PersonalInformation,
  },
  {
    path: '/personal-preferences',
    component: PersonalPreferences,
  },
  {
    path: '/add',
    component: Add,
  },
  {
    path: '/contents',
    component: Contents,
  },
  {
    path: '/sharing',
    component: Sharing,
  },
  {
    path: '/**/add',
    component: Add,
  },
  {
    path: '/**/contents',
    component: Contents,
  },
  {
    path: '/**/sharing',
    component: Sharing,
  },
  {
    path: '/**/delete',
    component: Delete,
  },
  {
    path: '/**/diff',
    component: Diff,
  },
  {
    path: '/**/edit',
    component: Edit,
  },
  {
    path: '/**/history',
    component: History,
  },
  {
    path: '/**/layout',
    component: Layout,
  },
  {
    path: '/**/sharing',
    component: Sharing,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/password-reset',
    component: RequestPasswordReset,
    routes: [
      {
        path: '/password-reset/:token',
        component: PasswordReset,
      },
    ],
  },
  {
    path: '/**',
    component: View,
  },
  {
    path: '*',
    component: NotFound,
  }
];

export default routes;
