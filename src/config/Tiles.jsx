import { defineMessages } from 'react-intl';

import ViewTitleTile from '@plone/volto/components/manage/Tiles/Title/View';
import ViewDescriptionTile from '@plone/volto/components/manage/Tiles/Description/View';
import ViewTextTile from '@plone/volto/components/manage/Tiles/Text/View';
import ViewImageTile from '@plone/volto/components/manage/Tiles/Image/View';
import ViewVideoTile from '@plone/volto/components/manage/Tiles/Video/View';
import ViewHeroImageLeftTile from '@plone/volto/components/manage/Tiles/HeroImageLeft/View';
import ViewMapTile from '@plone/volto/components/manage/Tiles/Maps/View';
import ViewHTMLTile from '@plone/volto/components/manage/Tiles/HTML/View';
import ViewTableTile from '@plone/volto/components/manage/Tiles/Table/View';

import EditTitleTile from '@plone/volto/components/manage/Tiles/Title/Edit';
import EditDescriptionTile from '@plone/volto/components/manage/Tiles/Description/Edit';
import EditTextTile from '@plone/volto/components/manage/Tiles/Text/Edit';
import EditImageTile from '@plone/volto/components/manage/Tiles/Image/Edit';
import EditVideoTile from '@plone/volto/components/manage/Tiles/Video/Edit';
import EditHeroImageLeftTile from '@plone/volto/components/manage/Tiles/HeroImageLeft/Edit';
import EditMapTile from '@plone/volto/components/manage/Tiles/Maps/Edit';
import EditHTMLTile from '@plone/volto/components/manage/Tiles/HTML/Edit';
import EditTableTile from '@plone/volto/components/manage/Tiles/Table/Edit';

import descriptionSVG from '@plone/volto/icons/description.svg';
import titleSVG from '@plone/volto/icons/text.svg';
import textSVG from '@plone/volto/icons/subtext.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import tableSVG from '@plone/volto/icons/table.svg';

defineMessages({
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
  hero: {
    id: 'hero',
    defaultMessage: 'Hero',
  },
  table: {
    id: 'table',
    defaultMessage: 'Table',
  },
  maps: {
    id: 'maps',
    defaultMessage: 'Maps',
  },
  html: {
    id: 'html',
    defaultMessage: 'HTML',
  },
  // Groups
  mostUsed: {
    id: 'mostUsed',
    defaultMessage: 'Most used',
  },
  media: {
    id: 'media',
    defaultMessage: 'Media',
  },
  common: {
    id: 'common',
    defaultMessage: 'Common',
  },
});

const groupTilesOrder = [
  { id: 'mostUsed', title: 'Most used' },
  { id: 'text', title: 'Text' },
  { id: 'media', title: 'Media' },
  { id: 'common', title: 'Common' },
];

const tilesConfig = {
  title: {
    id: 'title',
    title: 'Title',
    icon: titleSVG,
    group: 'text',
    view: ViewTitleTile,
    edit: EditTitleTile,
    restricted: true,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  description: {
    id: 'description',
    title: 'Description',
    icon: descriptionSVG,
    group: 'text',
    view: ViewDescriptionTile,
    edit: EditDescriptionTile,
    restricted: true,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  text: {
    id: 'text',
    title: 'Text',
    icon: textSVG,
    group: 'text',
    view: ViewTextTile,
    edit: EditTextTile,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  image: {
    id: 'image',
    title: 'Image',
    icon: cameraSVG,
    group: 'media',
    view: ViewImageTile,
    edit: EditImageTile,
    restricted: false,
    mostUsed: true,
    security: {
      addPermission: [],
      view: [],
    },
  },
  video: {
    id: 'video',
    title: 'Video',
    icon: videoSVG,
    group: 'media',
    view: ViewVideoTile,
    edit: EditVideoTile,
    restricted: false,
    mostUsed: true,
    security: {
      addPermission: [],
      view: [],
    },
  },
  hero: {
    id: 'hero',
    title: 'Hero',
    icon: heroSVG,
    group: 'common',
    view: ViewHeroImageLeftTile,
    edit: EditHeroImageLeftTile,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  maps: {
    id: 'maps',
    title: 'Maps',
    icon: globeSVG,
    group: 'common',
    view: ViewMapTile,
    edit: EditMapTile,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  html: {
    id: 'html',
    title: 'HTML',
    icon: codeSVG,
    group: 'common',
    view: ViewHTMLTile,
    edit: EditHTMLTile,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
  table: {
    id: 'table',
    title: 'Table',
    icon: tableSVG,
    group: 'common',
    view: ViewTableTile,
    edit: EditTableTile,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

const requiredTiles = ['title'];

export { groupTilesOrder, requiredTiles, tilesConfig };
