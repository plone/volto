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
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  headlineTag: {
    id: 'Headline level',
    defaultMessage: 'Headline level',
  },
});

const DEFAULT_HEADLINE_LEVELS = [
  ['h2', 'h2'],
  ['h3', 'h3'],
];

export const schemaListing = (props) => {
  const { intl } = props;
  const allowed_headline_tags =
    config.blocks?.blocksConfig?.listing?.allowed_headline_tags ||
    DEFAULT_HEADLINE_LEVELS;

  return {
    title: intl.formatMessage(messages.listing),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'headline',
          ...(allowed_headline_tags.length > 1 ? ['headlineTag'] : []),
          'querystring',
        ],
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
      headline: {
        title: intl.formatMessage(messages.headline),
      },
      headlineTag: {
        title: intl.formatMessage(messages.headlineTag),
        choices: allowed_headline_tags,
        default: 'h2',
        noValueOption: false,
      },
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
