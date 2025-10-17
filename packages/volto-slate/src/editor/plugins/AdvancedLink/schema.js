import externalSVG from '@plone/volto/icons/link.svg';
import internalSVG from '@plone/volto/icons/nav.svg';
import emailSVG from '@plone/volto/icons/email.svg';
// import pageLinkSVG from '@plone/volto/icons/show-blocks.svg';

import { defineMessages } from 'react-intl';

const messages = defineMessages({
  emailAddress: {
    id: 'Email address',
    defaultMessage: 'Email address',
  },
  email: {
    id: 'Email',
    defaultMessage: 'Email',
  },
  emailSubject: {
    id: 'Email subject',
    defaultMessage: 'Email subject',
  },
  optional: {
    id: 'Optional',
    defaultMessage: 'Optional',
  },
  internalLink: {
    id: 'Internal link',
    defaultMessage: 'Internal link',
  },
  internal: {
    id: 'Internal',
    defaultMessage: 'Internal',
  },
  externalLink: {
    id: 'External link',
    defaultMessage: 'External link',
  },
  external: {
    id: 'External',
    defaultMessage: 'External',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
  descriptionExternalURL: {
    id: 'URL can be relative within this site or absolute if it starts with http:// or https://',
    defaultMessage:
      'URL can be relative within this site or absolute if it starts with http:// or https://',
  },
  target: {
    id: 'Target',
    defaultMessage: 'Target',
  },
  targetSelf: {
    id: 'Open in this window / frame',
    defaultMessage: 'Open in this window / frame',
  },
  targetBlank: {
    id: 'Open in new window',
    defaultMessage: 'Open in new window',
  },
  targetParent: {
    id: 'Open in parent window / frame',
    defaultMessage: 'Open in parent window / frame',
  },
  targetTop: {
    id: 'Open in top frame (replaces all frames)',
    defaultMessage: 'Open in top frame (replaces all frames)',
  },
  insertLink: {
    id: 'Insert link',
    defaultMessage: 'Insert link',
  },
  linkTitle: {
    id: 'Link Title',
    defaultMessage: 'Link Title',
  },
  link: {
    id: 'Link',
    defaultMessage: 'Link',
  },
});

export const EmailLinkSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.emailAddress),
  fieldsets: [
    {
      id: 'email',
      title: intl.formatMessage(messages.email),
      fields: ['email_address', 'email_subject'],
    },
  ],
  properties: {
    email_address: {
      title: intl.formatMessage(messages.emailAddress),
    },
    email_subject: {
      title: intl.formatMessage(messages.emailSubject),
      description: intl.formatMessage(messages.optional),
    },
  },
  required: [],
});

export const InternalLinkSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.internalLink),
  fieldsets: [
    {
      id: 'internal',
      title: intl.formatMessage(messages.internal),
      fields: ['internal_link'],
    },
  ],
  properties: {
    internal_link: {
      widget: 'object_browser',
      title: intl.formatMessage(messages.internalLink),
      multiple: false,
      mode: 'link',
      selectedItemAttrs: [],
    },
  },
  required: [],
});

export const ExternalLinkSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.externalLink),
  fieldsets: [
    {
      id: 'external',
      title: intl.formatMessage(messages.external),
      fields: ['external_link', 'target'],
    },
  ],
  properties: {
    external_link: {
      title: intl.formatMessage(messages.externalURL),
      description: intl.formatMessage(messages.descriptionExternalURL),
    },
    target: {
      title: intl.formatMessage(messages.target),
      choices: [
        ['_self', intl.formatMessage(messages.targetSelf)],
        ['_blank', intl.formatMessage(messages.targetBlank)],
        ['_parent', intl.formatMessage(messages.targetParent)],
        ['_top', intl.formatMessage(messages.targetTop)],
      ],
    },
  },
  required: [],
});

const LinkEditSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.insertLink),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.internalLink),
      fields: ['link', 'title'],
    },
  ],
  properties: {
    title: {
      title: intl.formatMessage(messages.linkTitle),
    },
    link: {
      title: intl.formatMessage(messages.link),
      widget: 'object_by_type',
      schemas: [
        {
          id: 'internal',
          icon: internalSVG,
          schema: InternalLinkSchema,
        },
        {
          id: 'external',
          icon: externalSVG,
          schema: ExternalLinkSchema,
        },
        {
          id: 'email',
          icon: emailSVG,
          schema: EmailLinkSchema,
        },
      ],
    },
  },
  required: [],
});

export default LinkEditSchema;
