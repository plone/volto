import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import FieldsetView from '@plone/volto/components/theme/FieldsetView/FieldsetView';
import config from '@plone/volto/registry';

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

const DefaultBlockView = (props) => {
  const { data, block } = props;
  const intl = useIntl();
  const { blocksConfig = config.blocks.blocksConfig } = props;
  if (!data)
    return <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>;
  // Compatibility with RenderBlocks non-view

  const blockSchema = blocksConfig?.[data['@type']]?.blockSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ ...props, intl })
      : blockSchema;
  const fieldsets = schema?.fieldsets || [];

  return schema ? (
    <Container className="page-block">
      {fieldsets?.map((fs) => (
        <FieldsetView key={fs.id} fieldset={fs} schema={schema} data={data} />
      ))}
    </Container>
  ) : (
    <div key={block}>
      {intl.formatMessage(messages.unknownBlock, {
        block: data['@type'],
      })}
    </div>
  );
};

export default DefaultBlockView;
