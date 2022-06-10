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
  Rules,
  RequestPasswordReset,
  Search,
  Sharing,
  Sitemap,
  UsersControlpanel,
  GroupsControlpanel,
  RulesControlpanel,
  AddRuleControlpanel,
  EditRuleControlpanel,
  ConfigureRuleControlpanel,
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
    path: `/(${config.settings?.supportedLanguages.join('|')})/password-reset`,
    component: RequestPasswordReset,
    exact: true,
  },
  {
    path: `/(${config.settings?.supportedLanguages.join(
      '|',
    )})/password-reset/:token`,
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
    path: '/controlpanel/database',
    component: DatabaseInformation,
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
    path: '/controlpanel/groups',
    component: GroupsControlpanel,
  },
  {
    path: '/controlpanel/rules/:id/configure',
    component: ConfigureRuleControlpanel,
  },
  {
    path: '/controlpanel/rules/:id/edit',
    component: EditRuleControlpanel,
  },
  {
    path: '/controlpanel/rules/add',
    component: AddRuleControlpanel,
  },
  {
    path: '/controlpanel/rules',
    component: RulesControlpanel,
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
    path: '/rules',
    component: Rules,
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
    path: '/**/rules',
    component: Rules,
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
