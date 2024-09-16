import { lazy } from 'react';
import { getSystemInformation, listControlpanels } from '@plone/volto/actions';
import { asyncConnect } from '@plone/volto/helpers';

// CONTROLPANELS

const LoadableControlpanels = lazy(
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

export const Controlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "Controlpanels" */ '@plone/volto/components/manage/Controlpanels/Controlpanel'
    ),
);

// RULES CONTROLPANELS

export const RulesControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/Rules'
    ),
);

export const AddRuleControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/AddRule'
    ),
);

export const EditRuleControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/EditRule'
    ),
);

export const ConfigureRuleControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "RulesControlpanel" */ '@plone/volto/components/manage/Controlpanels/Rules/ConfigureRule'
    ),
);

// USERS CONTROLPANELS

export const UsersControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "UsersControlpanel" */ '@plone/volto/components/manage/Controlpanels/Users/UsersControlpanel'
    ),
);

export const RenderUsers = lazy(
  () =>
    import(
      /* webpackChunkName: "UsersControlpanel" */ '@plone/volto/components/manage/Controlpanels/Users/RenderUsers'
    ),
);

export const UserGroupMembershipControlPanel = lazy(
  () =>
    import(
      '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembershipControlPanel'
    ),
);

export const GroupsControlpanel = lazy(
  () =>
    import(
      /* webpackChunkName: "GroupsControlpanel" */ '@plone/volto/components/manage/Controlpanels/Groups/GroupsControlpanel'
    ),
);

export const RenderGroups = lazy(
  () =>
    import(
      /* webpackChunkName: "GroupsControlpanel" */ '@plone/volto/components/manage/Controlpanels/Groups/RenderGroups'
    ),
);

// RELATIONS CONTROLPANEL

export const RelationsControlpanel = lazy(
  () =>
    import('@plone/volto/components/manage/Controlpanels/Relations/Relations'),
);

// ALIASES CONTROLPANEL

export const AliasesControlpanel = lazy(
  () => import('@plone/volto/components/manage/Controlpanels/Aliases'),
);

// UNDO CONTROLPANEL

export const UndoControlpanel = lazy(
  () => import('@plone/volto/components/manage/Controlpanels/UndoControlpanel'),
);

// ADDONS CONTROLPANEL

export const AddonsControlpanel = lazy(
  () =>
    import('@plone/volto/components/manage/Controlpanels/AddonsControlpanel'),
);

// CONTENT TYPES CONTROLPANEL

export const ContentType = lazy(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentType'
    ),
);

export const ContentTypeLayout = lazy(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypeLayout'
    ),
);

export const ContentTypeSchema = lazy(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypeSchema'
    ),
);

export const ContentTypes = lazy(
  () =>
    import(
      /* webpackChunkName: "ContentTypesControlpanel" */ '@plone/volto/components/manage/Controlpanels/ContentTypes'
    ),
);

// VERSION OVERVIEW

export const VersionOverview = lazy(
  () => import('@plone/volto/components/manage/Controlpanels/VersionOverview'),
);

// PLONE UPGRADES CONTROLPANELS

export const UpgradeControlPanel = lazy(
  () =>
    import('@plone/volto/components/manage/Controlpanels/UpgradeControlPanel'),
);

// MODERATE COMMENTS CONTROLPANEL

export const ModerateComments = lazy(
  () => import('@plone/volto/components/manage/Controlpanels/ModerateComments'),
);

// DATABASE INFORMATION CONTROLPANELS

export const DatabaseInformation = lazy(
  () =>
    import('@plone/volto/components/manage/Controlpanels/DatabaseInformation'),
);
