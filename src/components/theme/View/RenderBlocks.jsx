import React from 'react';
import { getBaseUrl } from '@plone/volto/helpers';
import { defineMessages } from 'react-intl';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import { blocks } from '~/config';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const RenderBlocks = (props) => {
  const { location, intl, content } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return hasBlocksData(content) ? (
    <div>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          blocks.blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.[
            'view'
          ] || null;
        return Block !== null ? (
          <Block
            key={block}
            id={block}
            properties={content}
            data={content[blocksFieldname][block]}
            path={getBaseUrl(location?.pathname || '')}
          />
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </div>
  ) : (
    ''
  );
};

export default RenderBlocks;
