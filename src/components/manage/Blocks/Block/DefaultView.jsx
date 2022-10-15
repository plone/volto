import React from 'react';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const DefaultBlockView = (props) => {
  const { data, intl, block } = props;
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const schema = blocksConfig[data['@type']]?.blockSchema;
  return schema ? (
    <div>{JSON.stringify(props.data)}</div>
  ) : (
    <div key={block}>
      {intl.formatMessage(messages.unknownBlock, {
        block: data['@type'],
      })}
    </div>
  );
};

export default DefaultBlockView;
