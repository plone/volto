import React from 'react';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';

const TestBlockData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = blocksConfig[data['@type']].blockSchema({ intl });

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
    />
  );
};

export default TestBlockData;
