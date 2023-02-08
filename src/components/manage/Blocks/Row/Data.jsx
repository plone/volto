import React from 'react';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';
import { GridSchema } from './schema';
import config from '@plone/volto/registry';

const GridData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();

  const dataAdapter = config.getComponent({
    name: 'dataAdapter',
    dependencies: ['Row', 'BlockData'],
  }).component;

  const schema = GridSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        dataAdapter({
          block,
          data,
          id,
          onChangeBlock,
          value,
        });
      }}
      formData={data}
      block={block}
      onChangeBlock={onChangeBlock}
      blocksConfig={blocksConfig}
    />
  );
};

export default GridData;
