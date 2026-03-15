import { Fragment, lazy } from 'react';
import { hasBlocksData } from '@plone/helpers';
import config from '@plone/registry';
import { DefaultBlockView } from './DefaultBlockView';
import type { BlocksConfigData, Content } from '@plone/types';
import BlockWrapper from './BlockWrapper';

const SOMERSAULT_KEY = '__somersault__';
const SomersaultRenderer = lazy(() => import('./SomersaultRenderer'));

export type RenderBlocksProps = {
  /**
   * Plone content object
   */
  content: Content;
  /**
   * Current blocks configuration object
   * From the registry or local to this instance (eg. in a blocks in block container)
   */
  blocksConfig: BlocksConfigData;
  /**
   * Wrap the blocks in an enclosing tag
   * From the registry or local to this instance (eg. in a blocks in block container)
   */
  as?: React.ElementType;
  /**
   * Router location object
   */
  pathname: string;
  /**
   * Metadata object
   * In case of the blocks in block container use case, it's the metadata (content data)
   * from the parent container, passed down to the contained blocks
   */
  metadata?: Content;
};

const RenderBlocks = (props: RenderBlocksProps) => {
  const { blocksConfig, content, pathname, metadata } = props;
  const CustomTag = props.as || Fragment;
  const shouldRenderSomersault =
    config.settings.editorMode === 'somersault' &&
    Object.hasOwn(content.blocks ?? {}, SOMERSAULT_KEY);

  if (shouldRenderSomersault) {
    return (
      <CustomTag>
        <SomersaultRenderer content={content} />
      </CustomTag>
    );
  }

  return hasBlocksData(content) ? (
    <CustomTag>
      {content.blocks_layout.items.map((block) => {
        const blockData = content.blocks?.[block];
        const blockType = blockData?.['@type'];
        // @ts-ignore
        const Block = blocksConfig[blockType]?.view || DefaultBlockView;

        return Block ? (
          <BlockWrapper key={block} data={blockData}>
            {/* @ts-ignore It's ok to pass the blockData as is */}
            <Block
              key={block}
              id={block}
              metadata={metadata}
              properties={content}
              data={blockData}
              path={pathname || ''}
              blocksConfig={blocksConfig}
            />
          </BlockWrapper>
        ) : blockData ? (
          <div key={block}>Unknown block found: {blockType}</div>
        ) : (
          <div key={block}>Invalid Block</div>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default RenderBlocks;
