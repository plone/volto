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
  variationConfiguration: {
    id: 'Show variation configuration',
    defineMessages: 'Show variation configuration',
  },
});

export const schemaListing = (props) => {
  const { intl, variation, data } = props;
  const vConfig = variation?.schema ? ['variationConfiguration'] : [];
  return {
    title: intl.formatMessage(messages.listing),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...vConfig, 'querystring'],
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
      ...(data.variationConfiguration && variation.schema
        ? variation.schema(props).fieldsets
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
      variationConfiguration: {
        type: 'boolean',
        title: intl.formatMessage(messages.variationConfiguration),
        default: false,
      },
      ...(variation?.schema ? variation.schema(props).properties : ''),
    },
    required: [],
  };
};
