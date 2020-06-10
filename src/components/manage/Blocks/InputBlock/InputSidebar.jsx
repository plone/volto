import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  label: {
    id: 'Edit Label',
    defaultMessage: 'Edit Label',
  },
});

const InputSidebar = (props) => {
  const value = props.data.input;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Input" defaultMessage="Input" />
        </h2>
      </header>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="external"
          title={props.intl.formatMessage(messages.label)}
          required={false}
          value={value}
          onChange={(e, v) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              input: v,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(InputSidebar);
