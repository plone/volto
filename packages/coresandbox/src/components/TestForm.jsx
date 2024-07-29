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
  textLineTitle: {
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

  jsonFieldTitle: {
    id: 'JSONField',
    defaultMessage: 'JSONField',
  },
  jsonFieldDescription: {
    id: 'Enter JSONField',
    defaultMessage: 'Enter JSONField',
  },
  imageTitle: {
    id: 'Image',
    defaultMessage: 'Upload mage',
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
  selectTitle: {
    id: 'Select',
    defaultMessage: 'Select Option',
  },

  richTextTitle: {
    id: 'RichText',
    defaultMessage: 'Enter RichText',
  },

  PasswordTitle: {
    id: 'password',
    defaultMessage: 'Enter password',
  },

  numberTitle: {
    id: 'Number',
    defaultMessage: 'Enter Number',
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
                'textLine',
                'email',
                'Password',
                'image',
                'number',
                'url',
                'datetime',
                'jsonField',
                'id',
                'link',
                'select',
                'richtext',
              ],
            },
          ],
          properties: {
            textLine: {
              title: intl.formatMessage(messages.textLineTitle),
              widget: 'text',
            },
            email: {
              title: intl.formatMessage(messages.emailTitle),
              widget: 'email',
            },
            Password: {
              title: intl.formatMessage(messages.PasswordTitle),
              widget: 'password',
            },
            image: {
              title: intl.formatMessage(messages.imageTitle),
              widget: 'image',
            },
            number: {
              title: intl.formatMessage(messages.numberTitle),
              widget: 'number',
            },
            url: {
              title: intl.formatMessage(messages.urlTitle),
              widget: 'url',
            },
            datetime: {
              title: intl.formatMessage(messages.datetimeTitle),
              widget: 'datetime',
            },
            jsonField: {
              description: intl.formatMessage(messages.jsonFieldDescription),
              title: intl.formatMessage(messages.jsonFieldTitle),
              widget: 'json',
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
            select: {
              title: intl.formatMessage(messages.selectTitle),
              widget: 'select',
              placeholder: 'Type something…',
              isMulti: true,
              choices: [
                ['Foo', 'Foo'],
                ['Bar', 'Bar'],
                ['FooBar', 'FooBar'],
              ],
            },
            richtext: {
              title: intl.formatMessage(messages.richTextTitle),
              widget: 'richtext',
            },
          },
          required: ['textLine', 'image', 'email', 'password'],
        }}
        onCancel={onCancel}
      />
    </Container>
  );
};

export default TestForm;
