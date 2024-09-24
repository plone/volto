import loadable from '@loadable/component';

export const ChangePassword = loadable(
  () =>
    import(
      /* webpackChunkName: "ManageUser" */ '@plone/volto/components/manage/Preferences/ChangePassword'
    ),
);

export const PersonalPreferences = loadable(
  () =>
    import(
      /* webpackChunkName: "ManageUser" */ '@plone/volto/components/manage/Preferences/PersonalPreferences'
    ),
);

export const PersonalInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "ManageUser" */ '@plone/volto/components/manage/Preferences/PersonalInformation'
    ),
);
