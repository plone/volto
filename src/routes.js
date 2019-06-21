/**
 * Routes.
 * @module routes
 */
import React from 'react';
// import posed from 'react-pose';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  Add,
  App,
  ChangePassword,
  ContactForm,
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
 * Default routes array.
 * @array
 * @returns {array} Routes.
 */
export const defaultRoutes = [
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
    path: '/contact-form',
    component: ContactForm,
  },
  {
    path: '/controlpanel',
    exact: true,
    component: Controlpanels,
  },
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
    path: '/edit',
    component: Edit,
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
    path: '/**/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/password-reset',
    component: RequestPasswordReset,
    exact: true,
  },
  {
    path: '/password-reset/:token',
    component: PasswordReset,
    exact: true,
  },
  {
    path: '/**',
    component: View,
  },
  {
    path: '*',
    component: NotFound,
  },
];

// const Div = posed.div({
//   enter: { y: 0, opacity: 1, beforeChildren: true },
//   exit: { y: 500, opacity: 0 },
// });

// const WrappedComponent = ({ component }) => <Div>{component}</Div>;

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
// const routes = [
//   {
//     path: '/',
//     component: App,
//     routes: defaultRoutes.map(route => ({
//       ...route,
//       component: props => (
//         <CSSTransition classNames="fade">
//           <route.component {...props} />
//         </CSSTransition>
//       ),
//     })),
//   },
// ];
const routes = [
  {
    path: '/',
    component: App,
    routes: defaultRoutes,
  },
];
// debugger;
// component: <WrappedComponent component={route.component} />,

export default routes;
