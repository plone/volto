import loadable from '@loadable/component';

export const Contents = loadable(
  () => import('@plone/volto/components/manage/Contents/Contents'),
);

export const ContentsRenameModal = loadable(
  () => import('@plone/volto/components/manage/Contents/ContentsRenameModal'),
);
