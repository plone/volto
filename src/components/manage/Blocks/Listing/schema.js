import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  listing: {
    id: 'Listing',
    defaultMessage: 'Listing',
  },
  querystring: {
    id: 'Query',
    defaultMessage: 'Query',
  },
  more: {
    id: 'Link more',
    defaultMessage: 'Link more',
  },
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
});

export const schemaListing = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.listing),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['querystring'],
      },
      ...(config.blocks.blocksConfig.listing.showLinkMore
        ? [
            {
              id: 'linkmore',
              title: intl.formatMessage(messages.more),
              fields: ['linkTitle', 'linkHref'],
            },
          ]
        : []),
    ],

    properties: {
      querystring: {
        title: intl.formatMessage(messages.querystring),
        widget: 'querystring',
      },
      linkTitle: {
        title: intl.formatMessage(messages.LinkTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
    },
    required: [],
  };
};

export default schemaListing;
