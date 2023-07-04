import { useCallback, useEffect } from 'react';
import { Portal } from 'react-portal';
import { Container, Message, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Toolbar, Toast } from '@plone/volto/components';
import { getBaseUrl, Helmet } from '@plone/volto/helpers';
import {
  useEmailNotification,
  useClient,
  useGetEmailNotification,
} from '@plone/volto/hooks';

const messages = defineMessages({
  send: {
    id: 'Send',
    defaultMessage: 'Send',
  },
  contactForm: {
    id: 'Contact form',
    defaultMessage: 'Contact form',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  from: {
    id: 'From',
    defaultMessage: 'From',
  },
  subject: {
    id: 'Subject',
    defaultMessage: 'Subject',
  },
  message: {
    id: 'Message',
    defaultMessage: 'Message',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  messageSent: {
    id: 'Email sent',
    defaultMessage: 'Email sent',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const ContactFormComponent = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const intl = useIntl();
  const isClient = useClient();

  const { loaded, loading, error } = useEmailNotification();
  const { emailNotification } = useGetEmailNotification();

  useEffect(() => {
    if (loading && loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.messageSent)}
        />,
      );
    }
  }, [intl, loaded, loading]);

  const onSubmit = (data) => {
    emailNotification(data);
  };

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div id="contact-form">
      <Container id="view">
        <Helmet title={intl.formatMessage(messages.contactForm)} />
        {error && (
          <Message
            icon="warning"
            negative
            attached
            header={intl.formatMessage(messages.error)}
            content={error.message}
          />
        )}
        <Form
          onSubmit={onSubmit}
          onCancel={onCancel}
          formData={{ blocksLayoutFieldname: {} }}
          submitLabel={intl.formatMessage(messages.send)}
          resetAfterSubmit
          title={intl.formatMessage(messages.contactForm)}
          loading={loading}
          schema={{
            fieldsets: [
              {
                fields: ['name', 'from', 'subject', 'message'],
                id: 'default',
                title: intl.formatMessage(messages.default),
              },
            ],
            properties: {
              name: {
                title: intl.formatMessage(messages.name),
                type: 'string',
              },
              from: {
                title: intl.formatMessage(messages.from),
                type: 'email',
              },
              subject: {
                title: intl.formatMessage(messages.subject),
                type: 'string',
              },
              message: {
                title: intl.formatMessage(messages.message),
                type: 'string',
                widget: 'textarea',
              },
            },
            required: ['from', 'message'],
          }}
        />
        {isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={
                <Link to={`${getBaseUrl(pathname)}`} className="item">
                  <Icon
                    name="arrow left"
                    size="big"
                    color="blue"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        )}
      </Container>
    </div>
  );
};

export default ContactFormComponent;
