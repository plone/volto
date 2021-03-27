import React from 'react';
import { useIntl } from 'react-intl';
import { SliderSchema } from './schema';
import BlockForm from '@plone/volto/components/manage/Form/BlockForm';

const TestBlockData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = SliderSchema({ ...props, intl });
  return (
    <BlockForm
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
