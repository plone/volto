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

import ImageSidebar from '@plone/volto/components/manage/Sidebar/ImageSidebar';

import globeSVG from '@plone/volto/icons/globe.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import tableSVG from '@plone/volto/icons/table.svg';

const customTiles = [
  {
    title: 'hero',
    icon: heroSVG,
  },
  {
    title: 'maps',
    icon: globeSVG,
  },
  {
    title: 'html',
    icon: codeSVG,
  },
  {
    title: 'table',
    icon: tableSVG,
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
  table: {
    id: 'table',
    defaultMessage: 'Table',
  },
});

const defaultTilesViewMap = {
  title: ViewTitleTile,
  description: ViewDescriptionTile,
  text: ViewTextTile,
  image: ViewImageTile,
  video: ViewVideoTile,
  hero: ViewHeroImageLeftTile,
  maps: ViewMapTile,
  html: ViewHTMLTile,
  table: ViewTableTile,
};

const defaultTilesEditMap = {
  title: EditTitleTile,
  description: EditDescriptionTile,
  text: EditTextTile,
  image: EditImageTile,
  video: EditVideoTile,
  hero: EditHeroImageLeftTile,
  maps: EditMapTile,
  html: EditHTMLTile,
  table: EditTableTile,
};

const requiredTiles = ['title'];

const sidebarComponents = {
  image: ImageSidebar,
};

export {
  customTiles,
  defaultTilesViewMap,
  defaultTilesEditMap,
  messagesTiles,
  requiredTiles,
  sidebarComponents,
};
