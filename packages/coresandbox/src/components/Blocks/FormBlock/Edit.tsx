import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';
import type { BlockEditProps } from '@plone/types';
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

  richTextTitle: {
    id: 'RichText',
    defaultMessage: 'Enter RichText',
  },

  PasswordTitle: {
    id: 'password',
    defaultMessage: 'Password',
  },
});
const FormBlockEdit = (props: BlockEditProps) => {
  const intl = useIntl();
  const { selected } = props;

  return (
    <>
      <h3>
        <b>Form Block</b>
      </h3>
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
              richtext: {
                title: intl.formatMessage(messages.richTextTitle),
                widget: 'richtext',
              },
            },
            required: ['password'],
          }}
        />
      </Container>
      <SidebarPortal selected={selected}>
        <Data {...props} />
      </SidebarPortal>
    </>
  );
};

export default FormBlockEdit;
