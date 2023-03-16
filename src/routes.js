/**
 * Routes.
 * @module routes
 */
import debug from 'debug';
import { compact } from 'lodash';
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
  Rules,
  RequestPasswordReset,
  Search,
  Sharing,
  Sitemap,
  AliasesControlpanel,
  UndoControlpanel,
  UsersControlpanel,
  UserGroupMembershipControlPanel,
  GroupsControlpanel,
  RulesControlpanel,
  AddRuleControlpanel,
  EditRuleControlpanel,
  ConfigureRuleControlpanel,
  UpgradeControlPanel,
  PersonalInformation,
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

export function getExternalRoutes() {
  return compact(
    (config.settings?.externalRoutes || []).map((route) => {
      const newRoute = {
        component: NotFound,
      };
      if (typeof route.match === 'string') {
        newRoute.path = route.match;
        return newRoute;
      } else if (
        typeof route.match === 'object' &&
        !Array.isArray(route.match)
      ) {
        return {
          ...newRoute,
          ...route.match,
        };
      } else {
        debug('routes')(
          'Got invalid externalRoute, please check the configuration.',
        );
        return null;
      }
    }),
  );
}

export const defaultRoutes = [
  // redirect to external links if path is in blacklist
  ...getExternalRoutes(),
  ...((config.settings?.isMultilingual && multilingualRoutes) || []),
  {
    path: '/',
    component: View,
    exact: true,
  },
  {
    path: ['/login', '/**/login'],
    component: Login,
  },
  {
    path: ['/logout', '/**/logout'],
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
    path: '/controlpanel/plone-upgrade',
    component: UpgradeControlPanel,
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
    path: ['/add', '/**/add'],
    component: Add,
  },
  {
    path: ['/edit', '/**/edit'],
    component: Edit,
  },
  {
    path: ['/contents', '/**/contents'],
    component: Contents,
  },
  {
    path: ['/sharing', '/**/sharing'],
    component: Sharing,
  },
  {
    path: '/rules',
    component: Rules,
  },
  {
    path: '/**/create-translation',
    component: CreateTranslation,
  },
  {
    path: '/**/rules',
    component: Rules,
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
    path: '/**/historyview',
    component: History,
  },
  {
    path: '/**/manage-translations',
    component: ManageTranslations,
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
    path: '/personal-information',
    component: PersonalInformation,
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
      // addon routes have a higher priority then default routes
      ...(config.addonRoutes || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
