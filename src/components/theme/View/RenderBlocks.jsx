import React from 'react';
import { getBaseUrl, applyBlockDefaults } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import { ViewDefaultBlock } from '@plone/volto/components';

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
  const { content, intl, location, metadata } = props;
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

        return Block ? (
          <StyleWrapper key={block} {...props} id={block} data={blockData}>
            <Block
              id={block}
              metadata={metadata}
              properties={content}
              data={blockData}
              path={getBaseUrl(location?.pathname || '')}
              blocksConfig={blocksConfig}
            />
          </StyleWrapper>
        ) : blockData ? (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        ) : (
          <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default injectIntl(RenderBlocks);
