import React from 'react';
import { InlineForm } from '@plone/volto/components';
import { withVariationSchemaEnhancer } from '@plone/volto/helpers';

const EnhancedBlockDataForm = withVariationSchemaEnhancer(InlineForm);

export default function BlockDataForm(props) {
  const { onChangeBlock, block, applySchemaEnhancers = true } = props;

  if (!onChangeBlock) {
    // eslint-disable-next-line no-console
    console.warn(
      'BlockDataForm component is used without passing down onChangeBlock as props',
    );
  }

  const onChangeFormData = React.useCallback(
    (data) => onChangeBlock(block, data),
    [block, onChangeBlock],
  );

  const Form = applySchemaEnhancers ? EnhancedBlockDataForm : InlineForm;
  return (
    <Form
      {...props}
      onChangeFormData={onChangeBlock ? onChangeFormData : undefined}
    />
  );
}
