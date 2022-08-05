import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';

const NotifyActionInput = ({ data, onChange, type, options }) => {
  const { message = '', messageType = '' } = data;
  const [intMessage, setIntMessage] = React.useState(message);
  const [intMessageType, setIntMessageType] = React.useState(messageType);

  React.useEffect(() => {
    if (!intMessage || !intMessageType) {
      onChange({ error: 'error' });
    }

    if (intMessage && intMessageType) {
      onChange({
        message: intMessage,
        message_type: intMessageType,
        type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intMessage, intMessageType]);

  return (
    <>
      <FormattedMessage id="Message" defaultMessage="Message" />
      <Input
        placeholder="Message"
        style={{ marginBottom: '10px' }}
        fluid
        value={intMessage}
        onChange={(e, { value }) => setIntMessage(value)}
      />
      <FormattedMessage id="Message type" defaultMessage="Message type" />

      <Dropdown
        placeholder="Message type"
        fluid
        selection
        value={intMessageType}
        options={options}
        onChange={(e, { value }) => setIntMessageType(value)}
      />
    </>
  );
};

export default NotifyActionInput;
