import loadable from '@loadable/component';
import RelatedItems from '@plone/volto/components/theme/RelatedItems/RelatedItems';
import Tags from '@plone/volto/components/theme/Tags/Tags';
import { isCmsUi } from '@plone/volto/helpers/Url/Url';

const InjectPloneComponentsCSS = loadable(
  () =>
    import(
      '@plone/volto/components/theme/InjectPloneComponentsCSS/InjectPloneComponentsCSS'
    ),
  { fallback: null },
);

const onlyCMSUI = ({ location }) => isCmsUi(location?.pathname);

const slots = {
  aboveApp: [
    {
      name: 'plone-components-css',
      component: InjectPloneComponentsCSS,
      predicates: [onlyCMSUI],
    },
  ],
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
