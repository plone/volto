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

// In the add form, the content in the store is the parent container,
// so its tags and related items must not be shown there.
const notInAddView = ({ location }) => !location?.pathname?.endsWith('/add');

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
      predicates: [notInAddView],
    },
    {
      name: 'relatedItems',
      component: RelatedItems,
      predicates: [notInAddView],
    },
  ],
};

export default slots;
