/**
 * Routes.
 * @module routes
 */
import {
  Add,
  AddonsControlpanel,
  Aliases,
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
  AliasesControlpanel,
  UndoControlpanel,
  UsersControlpanel,
  UserGroupMembershipControlPanel,
  GroupsControlpanel,
} from '@plone/volto/components';

// Deliberatelly use of absolute path of these components, since we do not want them
// in the components/index.js file.
import App from '@plone/volto/components/theme/App/App';
import View from '@plone/volto/components/theme/View/View';

import config from '@plone/volto/registry';

/**
 * Default routes array.
 * @array
 * @returns {array} Routes.
 */
export const multilingualRoutes = [
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/sitemap`,
    component: Sitemap,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/search`,
    component: Search,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/contact-form`,
    component: ContactForm,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/change-password`,
    component: ChangePassword,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/register`,
    component: Register,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join('|')})/passwordreset`,
    component: RequestPasswordReset,
    exact: true,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join(
      '|',
    )})/passwordreset/:token`,
    component: PasswordReset,
    exact: true,
  },
];

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
    path: '/sitemap',
    component: Sitemap,
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
    path: '/controlpanel/dexterity-types/:id/layout',
    component: ContentTypeLayout,
  },
  {
    path: '/controlpanel/dexterity-types/:id/schema',
    component: ContentTypeSchema,
  },
  {
    path: '/controlpanel/dexterity-types/:id',
    component: ContentType,
  },
  {
    path: '/controlpanel/dexterity-types',
    component: ContentTypes,
  },
  {
    path: '/controlpanel/addons',
    component: AddonsControlpanel,
  },
  {
    path: '/controlpanel/undo',
    component: UndoControlpanel,
  },
  {
    path: '/controlpanel/database',
    component: DatabaseInformation,
  },
  {
    path: '/controlpanel/aliases',
    component: AliasesControlpanel,
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
    path: '/controlpanel/usergroupmembership',
    component: UserGroupMembershipControlPanel,
  },
  {
    path: '/controlpanel/groups',
    component: GroupsControlpanel,
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
    path: '/**/create-translation',
    component: CreateTranslation,
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
    path: '/**/aliases',
    component: Aliases,
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
    path: '/**/manage-translations',
    component: ManageTranslations,
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
    path: '/passwordreset',
    component: RequestPasswordReset,
    exact: true,
  },
  {
    path: '/passwordreset/:token',
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
    routes: [
      // redirect to external links if path is in blacklist
      ...(config.settings?.externalRoutes || []).map((route) => ({
        ...route.match,
        component: NotFound,
      })),
      // addon routes have a higher priority then default routes
      ...(config.addonRoutes || []),
      ...((config.settings?.isMultilingual && multilingualRoutes) || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
