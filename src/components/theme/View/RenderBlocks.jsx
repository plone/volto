import React from 'react';
import { getBaseUrl } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const RenderBlocks = (props) => {
  const { path, intl, content, metadata } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = `${props.as || 'div'}`;

  return hasBlocksData(content) ? (
    <CustomTag>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.view;
        return Block ? (
          <Block
            key={block}
            id={block}
            metadata={metadata}
            properties={content}
            data={content[blocksFieldname][block]}
            path={getBaseUrl(path || '')}
            blocksConfig={blocksConfig}
          />
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default injectIntl(RenderBlocks);
