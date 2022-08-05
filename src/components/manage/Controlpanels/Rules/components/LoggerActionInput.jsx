import React from 'react';
import { Input } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';

const LoggerActionInput = ({ data, onChange, type }) => {
  const { message = '', targetLogger = '', Level = '' } = data;
  const [intMessage, setIntMessage] = React.useState(message);
  const [intTargetLogger, setIntTargetLogger] = React.useState(targetLogger);
  const [intLevel, setIntLevel] = React.useState(Level);

  React.useEffect(() => {
    if (!intMessage || !intTargetLogger || !intLevel) {
      onChange({ error: 'error' });
    }

    if (intMessage && intTargetLogger && intLevel) {
      onChange({
        message: intMessage,
        targetLogger: intTargetLogger,
        Level: intLevel,
        type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intMessage, intTargetLogger, intLevel]);

  return (
    <>
      <FormattedMessage id="Logger name" defaultMessage="Logger name" />
      <Input
        placeholder="Logger name"
        fluid
        value={intTargetLogger}
        style={{ marginBottom: '10px' }}
        onChange={(e, { value }) => setIntTargetLogger(value)}
      />
      <FormattedMessage id="Logging level" defaultMessage="Logging level" />
      <Input
        placeholder="Logging level"
        fluid
        type="number"
        value={intLevel}
        style={{ marginBottom: '10px' }}
        onChange={(e, { value }) => setIntLevel(value)}
      />
      <FormattedMessage id="Message" defaultMessage="Message" />
      <Input
        placeholder="Message"
        style={{ marginBottom: '10px' }}
        fluid
        value={intMessage}
        onChange={(e, { value }) => setIntMessage(value)}
      />
    </>
  );
};

export default LoggerActionInput;
