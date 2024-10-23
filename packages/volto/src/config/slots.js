import { Tags, RelatedItems } from '@plone/volto/components';

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
