import React from 'react';
import { InlineForm } from '@plone/volto/components';
import { withVariationSchemaEnhancer } from '@plone/volto/helpers';

const EnhancedBlockDataForm = withVariationSchemaEnhancer(InlineForm);

export default function BlockDataForm(props) {
  const { onChangeBlock, block } = props;

  const onChangeFormData = React.useCallback(
    (data) => onChangeBlock(block, data),
    [block, onChangeBlock],
  );

  return (
    <EnhancedBlockDataForm
      {...props}
      onChangeFormData={onChangeBlock ? onChangeFormData : undefined}
    />
  );
}
