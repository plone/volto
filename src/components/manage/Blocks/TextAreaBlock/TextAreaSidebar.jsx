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

const TextAreaSidebar = (props) => {
  const value = props.data.textarea;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="TextArea" defaultMessage="TextArea" />
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
              textarea: v,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default injectIntl(TextAreaSidebar);
