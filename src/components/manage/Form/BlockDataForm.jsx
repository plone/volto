import { InlineForm } from '@plone/volto/components';
import { withVariationSchemaEnhancer } from '@plone/volto/helpers';

const EnhancedBlockDataForm = withVariationSchemaEnhancer(InlineForm);

export default function BlockDataForm(props) {
  const { onChangeBlock, block } = props;
  return (
    <EnhancedBlockDataForm
      {...props}
      onChangeFormData={(data) => onChangeBlock(block, data)}
    />
  );
}
