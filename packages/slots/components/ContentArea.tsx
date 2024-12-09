import RenderBlocks from '@plone/blocks/RenderBlocks/RenderBlocks';
import { SlotComponentProps } from '../SlotRenderer';
import config from '@plone/registry';

const ContentArea = (props: SlotComponentProps) => {
  const { content } = props;

  return (
    <>
      <RenderBlocks
        content={content}
        blocksConfig={config.blocks.blocksConfig}
        pathname="/"
      />
    </>
  );
};

export default ContentArea;
