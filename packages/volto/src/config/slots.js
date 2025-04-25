import RelatedItems from '@plone/volto/components/theme/RelatedItems/RelatedItems';
import Tags from '@plone/volto/components/theme/Tags/Tags';

const slots = {
  belowContent: [
    {
      name: 'tags',
      component: Tags,
    },
    {
      name: 'relatedItems',
      component: RelatedItems,
    },
  ],
};

export default slots;
