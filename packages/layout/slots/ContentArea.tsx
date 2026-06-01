import RenderBlocks from '../blocks/RenderBlocks';
import type { SlotComponentProps } from './SlotRenderer';
import { hasBlocksData } from '@plone/helpers';
import config from '@plone/registry';

const ContentArea = (props: SlotComponentProps) => {
  const { content } = props;

  if (
    ['Document', 'Plone Site', 'LRF', 'News Item'].includes(content['@type']) &&
    hasBlocksData(content)
  ) {
    return (
      <>
        <RenderBlocks
          content={content}
          blocksConfig={config.blocks.blocksConfig}
          pathname="/"
        />
      </>
    );
  } else {
    let View = config.views.defaultView;
    if (content.layout && content.layout in config.views.layoutViews) {
      View = config.views.layoutViews[content.layout];
    } else if (content['@type'] in config.views.contentTypesViews) {
      View = config.views.contentTypesViews[content['@type']];
    }
    return <View />;
  }
};

export default ContentArea;
