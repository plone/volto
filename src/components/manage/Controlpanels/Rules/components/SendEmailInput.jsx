import React from 'react';
import { Input } from 'semantic-ui-react';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';

import { FormattedMessage } from 'react-intl';

const SendEmailInput = ({ data, onChange, type, options }) => {
  const {
    subject = '',
    source = '',
    recipients = '',
    message = '',
    exclude_actor = '',
  } = data;
  const [intMessage, setIntMessage] = React.useState(message);
  const [intExcludeActor, setIntExcludeActor] = React.useState(exclude_actor);
  const [intRecipients, setIntRecipients] = React.useState(recipients);
  const [intSource, setIntSource] = React.useState(source);
  const [intSubject, setIntSubject] = React.useState(subject);

  React.useEffect(() => {
    if (!intMessage || !intSubject || !intRecipients || !intMessage) {
      onChange({ error: 'error' });
    }

    console.log({
      message: intMessage,
      subject: intSubject,
      source: intSource,
      recipients: intRecipients,
      exclude_actor: intExcludeActor,
      type,
    });
    if (intMessage && intSubject && intRecipients && intMessage) {
      onChange({
        message: intMessage,
        subject: intSubject,
        source: intSource,
        recipients: intRecipients,
        exclude_actor: intExcludeActor,
        type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intMessage, intSubject, intRecipients, intMessage]);

  return (
    <>
      <FormattedMessage id="Subject" defaultMessage="Subject" />
      <Input
        placeholder="Subject"
        style={{ marginBottom: '10px' }}
        fluid
        value={intSubject}
        onChange={(e, { value }) => setIntSubject(value)}
      />
      <FormattedMessage id="Source" defaultMessage="Source" />
      <Input
        placeholder="Email Source"
        style={{ marginBottom: '10px' }}
        fluid
        value={intSource}
        onChange={(e, { value }) => setIntSource(value)}
      />
      <FormattedMessage id="Recipients" defaultMessage="Recipients" />
      <Input
        placeholder="Recipients"
        style={{ marginBottom: '10px' }}
        fluid
        value={intRecipients}
        onChange={(e, { value }) => setIntRecipients(value)}
      />

      <CheckboxWidget
        title="Do not send the email to the user that did the action."
        value={intExcludeActor}
        onChange={(name, value) => setIntExcludeActor(value)}
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

export default SendEmailInput;
