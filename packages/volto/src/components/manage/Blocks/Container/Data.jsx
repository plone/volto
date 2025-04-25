import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

const ContainerData = (props) => {
  const {
    block,
    blocksConfig,
    blocksErrors,
    data,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
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
      navRoot={navRoot}
      contentType={contentType}
      errors={blocksErrors}
    />
  );
};

export default ContainerData;
