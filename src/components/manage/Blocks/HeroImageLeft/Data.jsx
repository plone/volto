import React from 'react';
import { useIntl } from 'react-intl';
import schemaHero from './Schema';
import { BlockDataForm } from '@plone/volto/components';

const TestBlockData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = schemaHero({ ...props, intl });
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
      formData={data}
    />
  );
};

export default TestBlockData;
