import { defineMessages } from 'react-intl';

const messages = defineMessages({
  LeadImage: {
    id: 'Lead Image',
    defaultMessage: 'Lead Image',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  linkSettings: {
    id: 'Link settings',
    defaultMessage: 'Link settings',
  },
});

/**
 * The Lead Image block data schema. It is registered as the `blockSchema` of
 * the `leadimage` block. The image itself and its alt text come from the
 * content item's `image` and `image_caption` fields, not from the block data.
 * The Lead Image block sidebar is a hand-built form that does not render this
 * schema yet, so keep both in sync.
 */
export const LeadImageBlockSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.LeadImage),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['align'],
    },
    {
      id: 'link_settings',
      title: intl.formatMessage(messages.linkSettings),
      fields: ['href', 'openLinkInNewTab'],
    },
  ],
  properties: {
    align: {
      title: intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
    href: {
      title: intl.formatMessage(messages.LinkTo),
      widget: 'url',
    },
    openLinkInNewTab: {
      title: intl.formatMessage(messages.openLinkInNewTab),
      type: 'boolean',
    },
  },
  required: [],
});
