import loadable from '@loadable/component';

export const Field = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/Field'
    ),
);
export const InlineForm = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/InlineForm'
    ),
);
export const ModalForm = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/ModalForm'
    ),
);
export const UndoToolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/UndoToolbar'
    ),
);
export const BlocksToolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/BlocksToolbar'
    ),
);
export const BlockDataForm = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/BlockDataForm'
    ),
);
export const BlocksForm = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Blocks/Block/BlocksForm'
    ),
);
export const Form = loadable(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/Form'
    ),
);
