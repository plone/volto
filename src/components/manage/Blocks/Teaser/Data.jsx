import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { BlockDataForm, Icon } from '@plone/volto/components';
import { isEmpty } from 'lodash';

import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  resetTeaser: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
});

const TeaserData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();

  const reset = () => {
    onChangeBlock(block, {
      ...data,
      href: '',
      title: '',
      description: '',
      head_title: '',
    });
  };

  const isReseteable =
    isEmpty(data.href) && !data.title && !data.description && !data.head_title;

  const HeaderActions = (
    <Button.Group>
      <Button
        aria-label={intl.formatMessage(messages.resetTeaser)}
        basic
        disabled={isReseteable}
        onClick={() => reset()}
      >
        <Icon name={trashSVG} size="24px" color="red" />
      </Button>
    </Button.Group>
  );

  const schema = blocksConfig[data['@type']].blockSchema({ intl });
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        dataAdapter({
          block,
          data,
          id,
          onChangeBlock,
          value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      headerActions={HeaderActions}
    />
  );
};

export default TeaserData;
