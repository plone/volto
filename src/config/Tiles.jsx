import { defineMessages } from 'react-intl';

import ViewTitleTile from '@plone/volto/components/manage/Tiles/Title/View';
import ViewDescriptionTile from '@plone/volto/components/manage/Tiles/Description/View';
import ViewTextTile from '@plone/volto/components/manage/Tiles/Text/View';
import ViewImageTile from '@plone/volto/components/manage/Tiles/Image/View';
import ViewVideoTile from '@plone/volto/components/manage/Tiles/Video/View';
import ViewMapTile from '@plone/volto/components/manage/Tiles/Maps/View';
import ViewSummaryBoxTile from '@plone/volto/components/manage/Tiles/SummaryBox/View';

import EditTitleTile from '@plone/volto/components/manage/Tiles/Title/Edit';
import EditDescriptionTile from '@plone/volto/components/manage/Tiles/Description/Edit';
import EditTextTile from '@plone/volto/components/manage/Tiles/Text/Edit';
import EditImageTile from '@plone/volto/components/manage/Tiles/Image/Edit';
import EditVideoTile from '@plone/volto/components/manage/Tiles/Video/Edit';
import EditMapTile from '@plone/volto/components/manage/Tiles/Maps/Edit';
import EditSummaryBoxTile from '@plone/volto/components/manage/Tiles/SummaryBox/Edit';

import globeSVG from '@plone/volto/icons/globe.svg';
import blankSVG from '@plone/volto/icons/blank.svg';

const customTiles = [
  {
    title: 'maps',
    icon: globeSVG,
  },
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

const defaultTilesViewMap = {
  title: ViewTitleTile,
  description: ViewDescriptionTile,
  text: ViewTextTile,
  image: ViewImageTile,
  video: ViewVideoTile,
  maps: ViewMapTile,
  summarybox: ViewSummaryBoxTile,
};

const defaultTilesEditMap = {
  title: EditTitleTile,
  description: EditDescriptionTile,
  text: EditTextTile,
  image: EditImageTile,
  video: EditVideoTile,
  maps: EditMapTile,
  summarybox: EditSummaryBoxTile,
};

export { customTiles, defaultTilesViewMap, defaultTilesEditMap, messagesTiles };
