import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import type { BlockEditProps } from '@plone/types';

const FormBlockData = (props: BlockEditProps) => {
  const { block, blocksConfig, contentType, data, navRoot, onChangeBlock } =
    props;
  const intl = useIntl();
  const schema = blocksConfig[data['@type']].blockSchema({ intl, props });

  return (
    <BlockDataForm
      block={block}
      schema={schema}
      title={schema.title}
      onChangeField={(id: string, value: any) => {
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

export default FormBlockData;
