import { defineMessages } from 'react-intl';

import ViewTitleTile from '@plone/volto/components/manage/Tiles/Title/View';
import ViewDescriptionTile from '@plone/volto/components/manage/Tiles/Description/View';
import ViewTextTile from '@plone/volto/components/manage/Tiles/Text/View';
import ViewImageTile from '@plone/volto/components/manage/Tiles/Image/View';
import ViewVideoTile from '@plone/volto/components/manage/Tiles/Video/View';
import ViewHeroTile from '@plone/volto/components/manage/Tiles/Hero/View';
import ViewMapTile from '@plone/volto/components/manage/Tiles/Maps/View';

import EditTitleTile from '@plone/volto/components/manage/Tiles/Title/Edit';
import EditDescriptionTile from '@plone/volto/components/manage/Tiles/Description/Edit';
import EditTextTile from '@plone/volto/components/manage/Tiles/Text/Edit';
import EditImageTile from '@plone/volto/components/manage/Tiles/Image/Edit';
import EditVideoTile from '@plone/volto/components/manage/Tiles/Video/Edit';
import EditHeroTile from '@plone/volto/components/manage/Tiles/Hero/Edit';
import tableHeaderSVG from '../icons/table-header.svg';
import EditMapTile from '@plone/volto/components/manage/Tiles/Maps/Edit';
import globeSVG from '../icons/globe.svg';

const customTiles = [
  {
    title: 'hero',
    icon: tableHeaderSVG,
  },
  {
    title: 'maps',
    icon: globeSVG,
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
  hero: ViewHeroTile,
  maps: ViewMapTile,
};

const defaultTilesEditMap = {
  title: EditTitleTile,
  description: EditDescriptionTile,
  text: EditTextTile,
  image: EditImageTile,
  video: EditVideoTile,
  hero: EditHeroTile,
  maps: EditMapTile,
};

export { customTiles, defaultTilesViewMap, defaultTilesEditMap, messagesTiles };
