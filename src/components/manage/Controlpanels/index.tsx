import loadable from '@loadable/component';

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
      '@plone/volto/components/manage/Controlpanels/Users/UsersControlpanel'
    ),
);

export const UserGroupMembershipControlPanel = loadable(
  () =>
    import(
      '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembershipControlPanel'
    ),
);

// RELATIONS CONTROLPANEL

export const RelationsControlpanel = loadable(
  () =>
    import('@plone/volto/components/manage/Controlpanels/Relations/Relations'),
);
