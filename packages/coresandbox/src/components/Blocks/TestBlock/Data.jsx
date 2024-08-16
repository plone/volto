import React from 'react';
import { useIntl } from 'react-intl';
import { SliderSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';

const TestBlockData = (props) => {
  const { block, blocksConfig, contentType, data, navRoot, onChangeBlock } =
    props;
  const intl = useIntl();
  const schema = SliderSchema({ ...props, intl });
  return (
    <BlockDataForm
      block={block}
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default TestBlockData;