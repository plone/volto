import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Video: {
    id: 'Video',
    defaultMessage: 'Video',
  },
  VideoURL: {
    id: 'Video URL',
    defaultMessage: 'Video URL',
  },
  Preview_image: {
    id: 'Preview Image URL',
    defaultMessage: 'Preview Image URL',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  OpenLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});
export const VideoBlockSchema = (props) => ({
  title: props.intl.formatMessage(messages.Video),
  block: 'Video',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'preview_image', 'align'],
    },
    {
      id: 'linkSettings',
      title: 'Link Settings',
      fields: props.data.url?.match('.mp4')
        ? ['linkTo', 'OpenLinkInNewTab']
        : [],
    },
  ],

  properties: {
    url: {
      title: props.intl.formatMessage(messages.VideoURL),
      widget: 'url',
    },
    preview_image: {
      title: props.intl.formatMessage(messages.Preview_image),
      widget: 'url',
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
    linkTo: {
      title: props.intl.formatMessage(messages.LinkTo),
      widget: 'url',
    },
    OpenLinkInNewTab: {
      title: props.intl.formatMessage(messages.OpenLinkInNewTab),
      type: 'boolean',
    },
  },
  required: [],
});

export default VideoBlockSchema;
