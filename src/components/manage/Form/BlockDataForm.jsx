import { InlineForm } from '@plone/volto/components';
import { withBlockSchemaEnhancer } from '@plone/volto/helpers';

const BlockDataForm = withBlockSchemaEnhancer(InlineForm, 'variation');

export default BlockDataForm;
