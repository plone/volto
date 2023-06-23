import { useDispatch } from 'react-redux';
import { Message, Container } from 'semantic-ui-react';
import { map } from 'lodash';

import { useMessages } from '@plone/volto/hooks/messages/useMessages';
import { removeMessage } from '@plone/volto/actions';

const Messages = () => {
  const dispatch = useDispatch();

  const messages = useMessages();

  const onDismiss = ({ value }) => {
    dispatch(removeMessage(value));
  };

  return (
    messages && (
      <Container className="messages">
        {map(messages, (message, index) => (
          <Message
            key={message.id}
            value={index}
            onDismiss={onDismiss}
            error={message.level === 'error'}
            success={message.level === 'success'}
            warning={message.level === 'warning'}
            info={message.level === 'info'}
            header={message.title}
            content={message.body}
          />
        ))}
      </Container>
    )
  );
};

export default Messages;
