/***** lead image sidebar  *****/
import { defineMessages } from 'react-intl';


const messages = defineMessages({
  ImageURL: {
    id: 'Image URL',
    defaultMessage: 'Image URL',
  },
  PreviewImageURL: {
    id: 'Preview Image URL',
    defaultMessage: 'Preview Image URL',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  NoImageSelected: {
    id: 'No image set in Lead Image content field',
    defaultMessage: 'No image set in Lead Image content field',
  },
});

export const LeadImageSchema = (intl) => ({
  title: 'Lead Image', 
  block: 'LeadImage', 
  fieldsets: [
    {
      id: 'default', 
      title: 'Default',
      fields: ['url', 'preview_image', 'align'], 
    },
  ],
  properties: {
    url: {
      title: intl.formatMessage(messages.ImageURL),
      widget: 'url', 
    },
    preview_image: {
      title: intl.formatMessage(messages.PreviewImageURL), 
      widget: 'url', 
    },
    align: {
      title: intl.formatMessage(messages.Alignment), 
      widget: 'align', 
    },
  },
  required: [], 
});

export default LeadImageSchema;

