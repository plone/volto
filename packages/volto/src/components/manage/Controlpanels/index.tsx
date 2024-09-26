import loadable from '@loadable/component';
import { getSystemInformation, listControlpanels } from '@plone/volto/actions';
import { asyncConnect } from '@plone/volto/helpers';

// CONTROLPANELS

const LoadableControlpanels = loadable(
  () =>
    import(
      /* webpackChunkName: "Controlpanels" */ '@plone/volto/components/manage/Controlpanels/Controlpanels'
    ),
);

export const Controlpanels = asyncConnect([
  {
    key: 'controlpanels',
    promise: async ({ store: { dispatch } }: any) =>
      await dispatch(listControlpanels()),
  },
  {
    key: 'systemInformation',
    promise: async ({ store: { dispatch } }: any) =>
      await dispatch(getSystemInformation()),
  },
])(LoadableControlpanels);

export const Controlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "Controlpanels" */ '@plone/volto/components/manage/Controlpanels/Controlpanel'
    ),
);

// RULES CONTROLPANELS

export const RulesControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/Rules'
    ),
);

export const AddRuleControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/AddRule'
    ),
);

export const EditRuleControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/EditRule'
    ),
);

export const ConfigureRuleControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/ConfigureRule'
    ),
);

// USERS CONTROLPANELS

export const UsersControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "UsersControlpanel" */ '@plone/volto/components/manage/Controlpanels/Users/UsersControlpanel'
    ),
);

export const RenderUsers = loadable(
  () =>
    import(
      /* webpackChunkName: "UsersControlpanel" */ '@plone/volto/components/manage/Controlpanels/Users/RenderUsers'
    ),
);

export const UserGroupMembershipControlPanel = loadable(
  () =>
    import(
      '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembership/UserGroupMembershipControlPanel'
    ),
);

export const GroupsControlpanel = loadable(
  () =>
    import(
      /* webpackChunkName: "GroupsControlpanel" */ '@plone/volto/components/manage/Controlpanels/Groups/GroupsControlpanel'
    ),
);

export const RenderGroups = loadable(
  () =>
    import(
      /* webpackChunkName: "GroupsControlpanel" */ '@plone/volto/components/manage/Controlpanels/Groups/RenderGroups'
    ),
);

// RELATIONS CONTROLPANEL

export const RelationsControlpanel = loadable(
  () =>
    import('@plone/volto/components/manage/Controlpanels/Relations/Relations'),
);

// ALIASES CONTROLPANEL

export const AliasesControlpanel = loadable(
  () => import('@plone/volto/components/manage/Controlpanels/Aliases'),
);

// UNDO CONTROLPANEL

export const UndoControlpanel = loadable(
  () => import('@plone/volto/components/manage/Controlpanels/UndoControlpanel'),
);

// ADDONS CONTROLPANEL

export const AddonsControlpanel = loadable(
  () =>
    import('@plone/volto/components/manage/Controlpanels/AddonsControlpanel'),
);

// CONTENT TYPES CONTROLPANEL

export const ContentType = loadable(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentType'
    ),
);

export const ContentTypeLayout = loadable(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypeLayout'
    ),
);

export const ContentTypeSchema = loadable(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypeSchema'
    ),
);

export const ContentTypes = loadable(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypes'
    ),
);

// VERSION OVERVIEW

export const VersionOverview = loadable(
  () => import('@plone/volto/components/manage/Controlpanels/VersionOverview'),
);

// PLONE UPGRADES CONTROLPANELS

export const UpgradeControlPanel = loadable(
  () =>
    import('@plone/volto/components/manage/Controlpanels/UpgradeControlPanel'),
);

// MODERATE COMMENTS CONTROLPANEL

export const ModerateComments = loadable(
  () => import('@plone/volto/components/manage/Controlpanels/ModerateComments'),
);

// DATABASE INFORMATION CONTROLPANELS

export const DatabaseInformation = loadable(
  () =>
    import('@plone/volto/components/manage/Controlpanels/DatabaseInformation'),
);
