import loadable from '@loadable/component';

export const CommentEditModal = loadable(
  () => import('@plone/volto/components/theme/Comments/CommentEditModal'),
);
