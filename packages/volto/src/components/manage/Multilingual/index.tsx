import loadable from '@loadable/component';

export const CompareLanguages = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Multilingual/CompareLanguages'
    ),
);
export const CreateTranslation = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Multilingual/CreateTranslation'
    ),
);
export const ManageTranslations = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Multilingual/ManageTranslations'
    ),
);
export const TranslationObject = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Multilingual/TranslationObject'
    ),
);
