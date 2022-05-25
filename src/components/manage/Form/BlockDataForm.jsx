import { compose } from 'redux';
import { InlineForm } from '@plone/volto/components';
import {
  withVariationSchemaEnhancer,
  withStylingSchemaEnhancer,
} from '@plone/volto/helpers';

const BlockDataForm = compose(
  withVariationSchemaEnhancer,
  withStylingSchemaEnhancer,
)(InlineForm);

export default BlockDataForm;
