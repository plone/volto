import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';

import addSVG from '@plone/volto/icons/add.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

const messages = defineMessages({
  addBlock: {
    id: 'Add element to container',
    defaultMessage: 'Add element to container',
  },
  blockSettings: {
    id: 'Container settings',
    defaultMessage: 'Container settings',
  },
});

const SimpleContainerToolbar = (props) => {
  const { data, onAddNewBlock, maxLength, setSelectedBlock } = props;
  const intl = useIntl();

  return (
    <div className="toolbar">
      <Button.Group>
        <Button
          aria-label={intl.formatMessage(messages.addBlock)}
          icon
          basic
          disabled={data?.blocks_layout?.items?.length >= maxLength}
          onClick={(e) => onAddNewBlock()}
        >
          <Icon name={addSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          aria-label={intl.formatMessage(messages.blockSettings)}
          icon
          basic
          onClick={(e) => {
            e.stopPropagation();
            setSelectedBlock();
            props.setSidebarTab(1);
          }}
        >
          <Icon name={configSVG} size="24px" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default SimpleContainerToolbar;
