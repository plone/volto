import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Message, Container } from 'semantic-ui-react';
import map from 'lodash/map';

import { removeMessage } from '@plone/volto/actions/messages/messages';

const Messages = () => {
  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.messages.messages,
    shallowEqual,
  );

  const onDismiss = (event, { value }) => {
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
