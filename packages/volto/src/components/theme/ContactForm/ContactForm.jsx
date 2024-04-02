import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Container, Message, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { emailNotification } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Toolbar, Toast } from '@plone/volto/components';
import { getBaseUrl, Helmet, usePrevious } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';

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

const useEmailNotification = () => {
  const loading = useSelector((state) => state.emailNotification.loading);
  const loaded = useSelector((state) => state.emailNotification.loaded);
  const error = useSelector((state) => state.emailNotification.error);

  return { loading, loaded, error };
};

const ContactFormComponent = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const intl = useIntl();
  const isClient = useClient();

  const { loaded, loading, error } = useEmailNotification();

  const prevloading = usePrevious(loading);

  useEffect(() => {
    if (prevloading && loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.messageSent)}
        />,
      );
    }
  }, [intl, loaded, prevloading]);

  const onSubmit = (data) => {
    const { from, message, name, subject } = data;
    dispatch(emailNotification(from, message, name, subject));
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
        {isClient &&
          createPortal(
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
            />,
            document.getElementById('toolbar'),
          )}
      </Container>
    </div>
  );
};

export default ContactFormComponent;
