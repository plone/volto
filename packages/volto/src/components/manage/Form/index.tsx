import { lazy } from 'react';

export const Field = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/Field'
    ),
);
export const InlineForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/InlineForm'
    ),
);
export const ModalForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/ModalForm'
    ),
);
export const UndoToolbar = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/UndoToolbar'
    ),
);
export const BlocksToolbar = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/BlocksToolbar'
    ),
);
export const BlockDataForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/BlockDataForm'
    ),
);
export const BlocksForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Blocks/Block/BlocksForm'
    ),
);
export const Form = lazy(
  () =>
    import(
      /* webpackChunkName: "Form" */ '@plone/volto/components/manage/Form/Form'
    ),
);
