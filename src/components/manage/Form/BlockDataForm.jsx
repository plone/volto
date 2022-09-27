import { compose } from 'redux';
import { InlineForm } from '@plone/volto/components';
import {
  withVariationSchemaEnhancer,
  withStylingSchemaEnhancer,
} from '@plone/volto/helpers';

const BlockDataForm = compose(
  withStylingSchemaEnhancer,
  withVariationSchemaEnhancer,
)(InlineForm);

export default BlockDataForm;
