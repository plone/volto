import React from 'react';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';
import map from 'lodash/map';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import {
  applyBlockDefaults,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import RenderEmptyBlock from './RenderEmptyBlock';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  invalidBlock: {
    id: 'Invalid Block',
    defaultMessage: 'Invalid block - Will be removed on saving',
  },
});

const RenderBlocks = (props) => {
  const { blockWrapperTag, content, location, isContainer, metadata } = props;
  const intl = useIntl();
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  return hasBlocksData(content) ? (
    <CustomTag>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.view ||
          ViewDefaultBlock;

        const blockData = applyBlockDefaults({
          data: content[blocksFieldname][block],
          intl,
          metadata,
          properties: content,
        });

        if (content[blocksFieldname]?.[block]?.['@type'] === 'empty') {
          return (
            <MaybeWrap
              key={block}
              condition={blockWrapperTag}
              as={blockWrapperTag}
            >
              <RenderEmptyBlock />
            </MaybeWrap>
          );
        }

        if (Block) {
          return (
            <MaybeWrap
              key={block}
              condition={blockWrapperTag}
              as={blockWrapperTag}
            >
              <StyleWrapper
                key={block}
                {...props}
                id={block}
                block={block}
                data={blockData}
                isContainer={isContainer}
              >
                <Block
                  id={block}
                  metadata={metadata}
                  properties={content}
                  data={blockData}
                  path={getBaseUrl(location?.pathname || '')}
                  blocksConfig={blocksConfig}
                />
              </StyleWrapper>
            </MaybeWrap>
          );
        }

        if (blockData) {
          return (
            <div key={block}>
              {intl.formatMessage(messages.unknownBlock, {
                block: content[blocksFieldname]?.[block]?.['@type'],
              })}
            </div>
          );
        }

        return (
          <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default RenderBlocks;
