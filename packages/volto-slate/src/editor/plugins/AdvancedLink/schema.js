import externalSVG from '@plone/volto/icons/link.svg';
import internalSVG from '@plone/volto/icons/nav.svg';
import emailSVG from '@plone/volto/icons/email.svg';
// import pageLinkSVG from '@plone/volto/icons/show-blocks.svg';

export const EmailLinkSchema = {
  title: 'Email address',
  fieldsets: [
    {
      id: 'email',
      title: 'Email',
      fields: ['email_address', 'email_subject'],
    },
  ],
  properties: {
    email_address: {
      title: 'Email address',
    },
    email_subject: {
      title: 'Email subject',
      description: 'Optional',
    },
  },
  required: [],
};

export const InternalLinkSchema = {
  title: 'Internal link',
  fieldsets: [
    {
      id: 'internal',
      title: 'Internal',
      fields: ['internal_link'],
    },
  ],
  properties: {
    internal_link: {
      widget: 'object_browser',
      title: 'Internal link',
      multiple: false,
      mode: 'link',
      selectedItemAttrs: [],
    },
  },
  required: [],
};

export const ExternalLinkSchema = {
  title: 'External link',
  fieldsets: [
    {
      id: 'external',
      title: 'External',
      fields: ['external_link', 'target'],
    },
  ],
  properties: {
    external_link: {
      title: 'External URL',
      description:
        'URL can be relative within this site or absolute if it starts with http:// or https://',
    },
    target: {
      title: 'Target',
      choices: [
        ['_self', 'Open in this window / frame'],
        ['_blank', 'Open in new window'],
        ['_parent', 'Open in parent window / frame'],
        ['_top', 'Open in top frame (replaces all frames)'],
      ],
    },
  },
  required: [],
};

const LinkEditSchema = {
  title: 'Insert link',
  fieldsets: [
    {
      id: 'default',
      title: 'Internal link',
      fields: ['link', 'title'],
    },
  ],
  properties: {
    title: {
      title: 'Link Title',
    },
    link: {
      title: 'Link',
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
};

export default LinkEditSchema;
