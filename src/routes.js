/**
 * Routes.
 * @module routes
 */
import {
  Add,
  AddonsControlpanel,
  ChangePassword,
  ContactForm,
  Contents,
  ContentType,
  ContentTypeLayout,
  ContentTypeSchema,
  ContentTypes,
  Controlpanel,
  Controlpanels,
  CreateTranslation,
  DatabaseInformation,
  Delete,
  Diff,
  Edit,
  History,
  Login,
  Logout,
  ManageTranslations,
  ModerateComments,
  NotFound,
  PasswordReset,
  Register,
  RequestPasswordReset,
  Search,
  Sharing,
  Sitemap,
  UsersControlpanel,
  GroupsControlpanel,
} from '@plone/volto/components';

// Deliberatelly use of absolute path of these components, since we do not want them
// in the components/index.js file.
import App from '@plone/volto/components/theme/App/App';
import View from '@plone/volto/components/theme/View/View';
import { useRoutes } from 'react-router';
import config from '@plone/volto/registry';

/**
 * Default routes array.
 * @array
 * @returns {array} Routes.
 */
export const multilingualRoutes = [
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/sitemap`,
    element: <Sitemap />,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/search`,
    element: <Search />,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/contact-form`,
    element: <ContactForm />,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/change-password`,
    element: <ChangePassword />,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/register`,
    element: <Register />,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/password-reset`,
    element: <RequestPasswordReset />,
    exact: true,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join(
      '|',
    )})/password-reset/:token`,
    element: <PasswordReset />,
    exact: true,
  },
];

export const defaultRoutes = [
  // {
  //   path: '/',
  //   element: (props) => 'hello',
  //   exact: true,
  // },
  { index: true, element: <View /> },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  // {
  //   path: '/sitemap',
  //   element: <Sitemap />,
  // },
  // {
  //   path: '/search',
  //   element: <Search />,
  // },
  // {
  //   path: '/contact-form',
  //   element: <ContactForm />,
  // },
  // {
  //   path: '/controlpanel',
  //   exact: true,
  //   element: <Controlpanels />,
  // },
  // {
  //   path: '/controlpanel/dexterity-types/:id/layout',
  //   element: <ContentTypeLayout />,
  // },
  // {
  //   path: '/controlpanel/dexterity-types/:id/schema',
  //   element: <ContentTypeSchema />,
  // },
  // {
  //   path: '/controlpanel/dexterity-types/:id',
  //   element: <ContentType />,
  // },
  // {
  //   path: '/controlpanel/dexterity-types',
  //   element: <ContentTypes />,
  // },
  // {
  //   path: '/controlpanel/addons',
  //   element: <AddonsControlpanel />,
  // },
  // {
  //   path: '/controlpanel/database',
  //   element: <DatabaseInformation />,
  // },
  // {
  //   path: '/controlpanel/moderate-comments',
  //   element: <ModerateComments />,
  // },
  // {
  //   path: '/controlpanel/users',
  //   element: <UsersControlpanel />,
  // },
  // {
  //   path: '/controlpanel/groups',
  //   element: <GroupsControlpanel />,
  // },
  // {
  //   path: '/controlpanel/:id',
  //   element: <Controlpanel />,
  // },
  // {
  //   path: '/change-password',
  //   element: <ChangePassword />,
  // },
  // {
  //   path: '/add',
  //   element: <Add />,
  // },
  // {
  //   path: '/edit',
  //   element: <Edit />,
  // },
  // {
  //   path: '/contents',
  //   element: <Contents />,
  // },
  // {
  //   path: '/sharing',
  //   element: <Sharing />,
  // },
  // {
  //   path: '/**/add',
  //   element: <Add />,
  // },
  // {
  //   path: '/**/create-translation',
  //   element: <CreateTranslation />,
  // },
  // {
  //   path: '/**/contents',
  //   element: <Contents />,
  // },
  // {
  //   path: '/**/sharing',
  //   element: <Sharing />,
  // },
  // {
  //   path: '/**/delete',
  //   element: <Delete />,
  // },
  // {
  //   path: '/**/diff',
  //   element: <Diff />,
  // },
  // {
  //   path: '/**/edit',
  //   element: <Edit />,
  // },
  // {
  //   path: '/**/history',
  //   element: <History />,
  // },
  // {
  //   path: '/**/sharing',
  //   element: <Sharing />,
  // },
  // {
  //   path: '/**/manage-translations',
  //   element: <ManageTranslations />,
  // },
  // {
  //   path: '/**/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/register',
  //   element: <Register />,
  // },
  // {
  //   path: '/password-reset',
  //   element: <RequestPasswordReset />,
  //   exact: true,
  // },
  // {
  //   path: '/password-reset/:token',
  //   element: <PasswordReset />,
  //   exact: true,
  // },
  {
    path: '*',
    element: <View />,
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
    element: <App />,
    children: [
      // // redirect to external links if path is in blacklist
      // ...(config.settings?.externalRoutes || []).map((route) => ({
      //   ...route.match,
      //   element: <NotFound />,
      // })),
      // addon routes have a higher priority then default routes
      ...(config.addonRoutes || []),
      // ...((config.settings?.isMultilingual && multilingualRoutes) || []),
      ...defaultRoutes,
    ],
  },
];

const Routes = function Routes() {
  let element = useRoutes(routes);
  return element;
};

export { Routes };
export default routes;
