import React from 'react';
import { getBaseUrl, applyBlockDefaults } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import { MaybeWrap } from '@plone/volto/components';
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
  const { path, intl, content, metadata, as, blockWrapperTag } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;

  return hasBlocksData(content) ? (
    <MaybeWrap condition={as} as={as}>
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
            <Block
              key={block}
              id={block}
              metadata={metadata}
              properties={content}
              data={blockData}
              path={getBaseUrl(path || '')}
              blocksConfig={blocksConfig}
            />
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

export default injectIntl(RenderBlocks);
