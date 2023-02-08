import { PreviewImage } from '@plone/volto/components';
import TeaserDefaultBody from '@plone/volto/components/manage/Blocks/Teaser/DefaultBody';
import { RowBlockDataAdapter } from '@plone/volto/components/manage/Blocks/Row/adapter';

export const components = {
  PreviewImage: { component: PreviewImage },
  'Teaser|Default': { component: TeaserDefaultBody },
  'dataAdapter|Row+BlockData': { component: RowBlockDataAdapter },
};
