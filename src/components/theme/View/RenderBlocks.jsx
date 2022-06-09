import React from 'react';
import { getBaseUrl, applyBlockDefaults } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { map } from 'lodash';
import { MaybeWrap } from '@plone/volto/components';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const RenderBlocks = (props) => {
  const { content, location, metadata, blockWrapperTag } = props;
  const intl = useIntl();
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  return hasBlocksData(content) ? (
    <MaybeWrap condition={CustomTag} as={CustomTag}>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.view;

        const blockData = applyBlockDefaults({
          data: content[blocksFieldname][block],
          intl,
          metadata,
          properties: content,
        });

        return Block ? (
          <MaybeWrap condition={blockWrapperTag} as={blockWrapperTag}>
            <StyleWrapper key={block} {...props} data={blockData}>
              <Block
                key={block}
                id={block}
                metadata={metadata}
                properties={content}
                data={blockData}
                path={getBaseUrl(location?.pathname || '')}
                blocksConfig={blocksConfig}
              />
            </StyleWrapper>
          </MaybeWrap>
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </MaybeWrap>
  ) : (
    ''
  );
};

export default RenderBlocks;
