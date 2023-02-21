import { PreviewImage } from '@plone/volto/components';
import { TeaserBlockDataAdapter } from '@plone/volto/components/manage/Blocks/Teaser/adapter';

export const components = {
  PreviewImage: { component: PreviewImage },
  'dataAdapter|Teaser+BlockData': { component: TeaserBlockDataAdapter },
};
