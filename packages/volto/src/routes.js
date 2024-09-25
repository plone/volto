import { lazy } from 'react';
import debug from 'debug';
import { compact } from 'lodash-es';

import { Contents } from '@plone/volto/components/manage/Contents';
import { Rules } from '@plone/volto/components/manage/Rules';
import {
  RulesControlpanel,
  AddRuleControlpanel,
  EditRuleControlpanel,
  ConfigureRuleControlpanel,
  UsersControlpanel,
  UserGroupMembershipControlPanel,
  GroupsControlpanel,
  AddonsControlpanel,
  AliasesControlpanel,
  ContentType,
  ContentTypeLayout,
  ContentTypeSchema,
  ContentTypes,
  Controlpanel,
  Controlpanels,
  DatabaseInformation,
  ModerateComments,
  RelationsControlpanel,
  UndoControlpanel,
  UpgradeControlPanel,
} from '@plone/volto/components/manage/Controlpanels';

// Deliberatelly use of absolute path of these components, since we do not want them
// in the components/index.js file.
import App from '@plone/volto/components/theme/App/App';
import View from '@plone/volto/components/theme/View/View';

import config from '@plone/volto/registry';

const Add = lazy(() => import('@plone/volto/components/manage/Add/Add'));
const Aliases = lazy(
  () => import('@plone/volto/components/manage/Aliases/Aliases'),
);
const ChangePassword = lazy(
  () => import('@plone/volto/components/manage/Preferences/ChangePassword'),
);
const ContactForm = lazy(
  () => import('@plone/volto/components/theme/ContactForm/ContactForm'),
);
const CreateTranslation = lazy(
  () => import('@plone/volto/components/manage/Multilingual/CreateTranslation'),
);
const Delete = lazy(
  () => import('@plone/volto/components/manage/Delete/Delete'),
);
const Diff = lazy(() => import('@plone/volto/components/manage/Diff/Diff'));
const Edit = lazy(() => import('@plone/volto/components/manage/Edit/Edit'));
const History = lazy(
  () => import('@plone/volto/components/manage/History/History'),
);
const LinksToItem = lazy(
  () => import('@plone/volto/components/manage/LinksToItem/LinksToItem'),
);
const Login = lazy(() => import('@plone/volto/components/theme/Login/Login'));
const Logout = lazy(
  () => import('@plone/volto/components/theme/Logout/Logout'),
);
const ManageTranslations = lazy(
  () =>
    import('@plone/volto/components/manage/Multilingual/ManageTranslations'),
);
const NotFound = lazy(
  () => import('@plone/volto/components/theme/NotFound/NotFound'),
);
const PasswordReset = lazy(
  () => import('@plone/volto/components/theme/PasswordReset/PasswordReset'),
);
const Register = lazy(
  () => import('@plone/volto/components/theme/Register/Register'),
);
const RequestPasswordReset = lazy(
  () =>
    import('@plone/volto/components/theme/PasswordReset/RequestPasswordReset'),
);
const Search = lazy(
  () => import('@plone/volto/components/theme/Search/Search'),
);
const Sharing = lazy(
  () => import('@plone/volto/components/manage/Sharing/Sharing'),
);
const Sitemap = lazy(
  () => import('@plone/volto/components/theme/Sitemap/Sitemap'),
);
const PersonalInformation = lazy(
  () =>
    import('@plone/volto/components/manage/Preferences/PersonalInformation'),
);

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
    path: '/controlpanel/relations',
    component: RelationsControlpanel,
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
    path: '/links-to-item',
    component: LinksToItem,
  },
  {
    path: '/**/links-to-item',
    component: LinksToItem,
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
