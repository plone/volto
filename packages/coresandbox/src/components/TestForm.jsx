import React from 'react';
import { Helmet } from '@plone/volto/helpers';

import { defineMessages, useIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Form } from '@plone/volto/components/manage/Form';

const messages = defineMessages({
  testForm: {
    id: 'Test Form',
    defaultMessage: 'Test Form',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  textlineTitle: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  emailTitle: {
    id: 'Email',
    defaultMessage: 'Email',
  },

  urlTitle: {
    id: 'URL',
    defaultMessage: 'Enter URL',
  },

  datetimeTitle: {
    id: 'Date/Time',
    defaultMessage: 'Enter Date/Time',
  },

  idTitle: {
    id: 'Id',
    defaultMessage: 'Enter ID',
  },

  linkTitle: {
    id: 'Link',
    defaultMessage: 'Link to Document/Event/News',
  },

  linkDescription: {
    id: 'Enter Link',
    defaultMessage: 'Enter Link',
  },

  richTextTitle: {
    id: 'RichText',
    defaultMessage: 'Enter RichText',
  },

  PasswordTitle: {
    id: 'password',
    defaultMessage: 'Password',
  },
});

const TestForm = (props) => {
  const intl = useIntl();
  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel = () => {
    props.history.goBack();
  };

  return (
    <Container id="test-form">
      <Helmet title={intl.formatMessage(messages.testForm)} />
      <Form
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: [
                'textline',
                'email',
                'password',
                'url',
                'datetime',
                'id',
                'link',
                'richtext',
              ],
            },
          ],
          properties: {
            textline: {
              title: intl.formatMessage(messages.textlineTitle),
              widget: 'text',
            },
            email: {
              title: intl.formatMessage(messages.emailTitle),
              widget: 'email',
            },
            password: {
              title: intl.formatMessage(messages.PasswordTitle),
              widget: 'password',
            },
            url: {
              title: intl.formatMessage(messages.urlTitle),
              widget: 'url',
            },
            datetime: {
              title: intl.formatMessage(messages.datetimeTitle),
              widget: 'datetime',
            },
            id: {
              title: intl.formatMessage(messages.idTitle),
              widget: 'id',
            },
            link: {
              title: intl.formatMessage(messages.linkTitle),
              widget: 'object_browser',
              mode: 'link',
            },
            richtext: {
              title: intl.formatMessage(messages.richTextTitle),
              widget: 'richtext',
            },
          },
          required: ['textLine', 'email', 'password'],
        }}
        onCancel={onCancel}
      />
    </Container>
  );
};

export default TestForm;
