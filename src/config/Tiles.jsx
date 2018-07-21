import { defineMessages } from 'react-intl';

import {
  EditTitleTile,
  EditDescriptionTile,
  EditTextTile,
  EditImageTile,
  EditVideoTile,
} from '../components';

const messagesTiles = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'description',
    defaultMessage: 'Description',
  },
  text: {
    id: 'text',
    defaultMessage: 'Text',
  },
  image: {
    id: 'image',
    defaultMessage: 'Image',
  },
  video: {
    id: 'video',
    defaultMessage: 'Video',
  },
});

const AvailableTiles = [
  {
    id: 'title',
  },
  {
    id: 'description',
  },
  {
    id: 'text',
  },
  {
    id: 'image',
  },
  {
    id: 'video',
  },
];

const getDefaultEditTileView = type => {
  switch (type) {
    case 'title':
      return EditTitleTile;
    case 'description':
      return EditDescriptionTile;
    case 'text':
      return EditTextTile;
    case 'image':
      return EditImageTile;
    case 'video':
      return EditVideoTile;
    default:
      break;
  }
};

export { AvailableTiles, getDefaultEditTileView, messagesTiles };
