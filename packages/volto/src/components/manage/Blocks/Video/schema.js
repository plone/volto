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
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  TitleDescription: {
    id: 'The videos title is not displayed, but only used for accessibility reason to identify the video for screen reader users. If the Video is already sufficiently titled by a headline above, please leave this field empty.',
    defaultMessage:
      'The videos title is not displayed, but only used for accessibility reasons to identify the video for screen reader users. If the Video is already sufficiently titled by a headline above, please leave this field empty.',
  },
});
export const VideoBlockSchema = (props) => ({
  title: props.intl.formatMessage(messages.Video),
  block: 'Video',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'preview_image', 'title', 'align'],
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
    title: {
      title: props.intl.formatMessage(messages.Title),
      description: props.intl.formatMessage(messages.TitleDescription),
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
  },
  required: [],
});

export default VideoBlockSchema;
