import { BlockDataForm } from '@plone/volto/components';
import { AnnounceBlockSchema } from './Schema';

const AnnounceData = (props) => {
  const { data, block, onChangeBlock, blocksConfig } = props;
  const schema = AnnounceBlockSchema({ ...props });
  return (
    <BlockDataForm
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
      block={block}
      blocksConfig={blocksConfig}
    />
  );
};

export default AnnounceData;
