import { defineMessages } from 'react-intl';
import { InlineForm } from '@plone/volto/components';
import { withBlockSchemaEnhancer } from '@plone/volto/helpers';

const messages = defineMessages({
  variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

const BlockDataForm = withBlockSchemaEnhancer(InlineForm, {
  extensionName: 'variation',
  title: messages.variation, // this is the title
});

export default BlockDataForm;
