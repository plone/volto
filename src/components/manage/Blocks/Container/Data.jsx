import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';

const ContainerData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();

  const schema = blocksConfig[data['@type']].blockSchema({ intl });
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

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

export default ContainerData;
