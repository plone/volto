import loadable from '@loadable/component';

export const Field = loadable(
  () => import('@plone/volto/components/manage/Form/Field'),
);
export const InlineForm = loadable(
  () => import('@plone/volto/components/manage/Form/InlineForm'),
);
export const ModalForm = loadable(
  () => import('@plone/volto/components/manage/Form/ModalForm'),
);
export const UndoToolbar = loadable(
  () => import('@plone/volto/components/manage/Form/UndoToolbar'),
);
export const BlocksToolbar = loadable(
  () => import('@plone/volto/components/manage/Form/BlocksToolbar'),
);
export const BlockDataForm = loadable(
  () => import('@plone/volto/components/manage/Form/BlockDataForm'),
);
export const BlocksForm = loadable(
  () => import('@plone/volto/components/manage/Blocks/Block/BlocksForm'),
);
