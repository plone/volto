/**
 * Routes.
 * @module routes
 */
import loadable from '@loadable/component';

// import {
// Add,
// App,
// ChangePassword,
// ContactForm,
// Contents,
// Controlpanel,
// Controlpanels,
// Edit,
// Diff,
// Delete,
// History,
// View,
// NotFound,
// Login,
// Logout,
// ModerateComments,
// PasswordReset,
// Register,
// RequestPasswordReset,
// Search,
// Sharing,
// UsersControlpanel,
// } from './components';

const Add = loadable(() => import('./components/manage/Add/Add'));
const App = loadable(() => import('./components/theme/App/App'));
const ChangePassword = loadable(() =>
  import('./components/manage/Preferences/ChangePassword'),
);
const ContactForm = loadable(() =>
  import('./components/theme/ContactForm/ContactForm'),
);
const Contents = loadable(() =>
  import('./components/manage/Contents/Contents'),
);
const Controlpanel = loadable(() =>
  import('./components/manage/Controlpanels/Controlpanel'),
);
const Controlpanels = loadable(() =>
  import('./components/manage/Controlpanels/Controlpanels'),
);
const Edit = loadable(() => import('./components/manage/Edit/Edit'));
const Diff = loadable(() => import('./components/manage/Diff/Diff'));
const Delete = loadable(() => import('./components/manage/Delete/Delete'));
const History = loadable(() => import('./components/manage/History/History'));
const View = loadable(() => import('./components/theme/View/View'));
const NotFound = loadable(() => import('./components/theme/NotFound/NotFound'));
const Login = loadable(() => import('./components/theme/Login/Login'));
const Logout = loadable(() => import('./components/theme/Logout/Logout'));
const ModerateComments = loadable(() =>
  import('./components/manage/Controlpanels/ModerateComments'),
);
const PasswordReset = loadable(() =>
  import('./components/theme/PasswordReset/PasswordReset'),
);
const Register = loadable(() => import('./components/theme/Register/Register'));
const RequestPasswordReset = loadable(() =>
  import('./components/theme/PasswordReset/RequestPasswordReset'),
);
const Search = loadable(() => import('./components/theme/Search/Search'));
const Sharing = loadable(() => import('./components/manage/Sharing/Sharing'));
const UsersControlpanel = loadable(() =>
  import('./components/manage/Controlpanels/UsersControlpanel'),
);

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

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App,
    routes: defaultRoutes,
  },
];

export default routes;
