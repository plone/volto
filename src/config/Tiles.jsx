import { defineMessages } from 'react-intl';

import EditTitleTile from '@plone/volto/components/manage/Tiles/Title/Edit';
import EditDescriptionTile from '@plone/volto/components/manage/Tiles/Description/Edit';
import EditTextTile from '@plone/volto/components/manage/Tiles/Text/Edit';
import EditImageTile from '@plone/volto/components/manage/Tiles/Image/Edit';
import EditSummaryBoxTile from '@plone/volto/components/manage/Tiles/SummaryBox/Edit';
import EditVideoTile from '@plone/volto/components/manage/Tiles/Video/Edit';

import blankSVG from '@plone/volto/icons/blank.svg';

const customTiles = [
  {
    title: 'summarybox',
    icon: blankSVG,
  },
];

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
  summarybox: {
    id: 'summarybox',
    defaultMessage: 'Summary Box',
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
    case 'summarybox':
      return EditSummaryBoxTile;
    case 'video':
      return EditVideoTile;
    default:
      break;
  }
};

export { customTiles, getDefaultEditTileView, messagesTiles };
