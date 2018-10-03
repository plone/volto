import { defineMessages } from 'react-intl';

import EditTitleTile from '../components/manage/Tiles/Title/Edit';
import EditDescriptionTile from '../components/manage/Tiles/Description/Edit';
import EditTextTile from '../components/manage/Tiles/Text/Edit';
import EditImageTile from '../components/manage/Tiles/Image/Edit';
import EditVideoTile from '../components/manage/Tiles/Video/Edit';

const customTiles = [];

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

export { customTiles, getDefaultEditTileView, messagesTiles };
