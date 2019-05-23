import { defineMessages } from 'react-intl';

import ViewDescriptionTile from '@plone/volto/components/manage/Tiles/Description/View';
import ViewHeroImageLeftTile from '@plone/volto/components/manage/Tiles/HeroImageLeft/View';
import ViewHTMLTile from '@plone/volto/components/manage/Tiles/HTML/View';
import ViewImageTile from '@plone/volto/components/manage/Tiles/Image/View';
import ViewListingTile from '@plone/volto/components/manage/Tiles/Listing/View';
import ViewMapTile from '@plone/volto/components/manage/Tiles/Maps/View';
import ViewTextTile from '@plone/volto/components/manage/Tiles/Text/View';
import ViewTitleTile from '@plone/volto/components/manage/Tiles/Title/View';
import ViewVideoTile from '@plone/volto/components/manage/Tiles/Video/View';

import EditDescriptionTile from '@plone/volto/components/manage/Tiles/Description/Edit';
import EditHeroImageLeftTile from '@plone/volto/components/manage/Tiles/HeroImageLeft/Edit';
import EditHTMLTile from '@plone/volto/components/manage/Tiles/HTML/Edit';
import EditImageTile from '@plone/volto/components/manage/Tiles/Image/Edit';
import EditListingTile from '@plone/volto/components/manage/Tiles/Listing/Edit';
import EditMapTile from '@plone/volto/components/manage/Tiles/Maps/Edit';
import EditTextTile from '@plone/volto/components/manage/Tiles/Text/Edit';
import EditTitleTile from '@plone/volto/components/manage/Tiles/Title/Edit';
import EditVideoTile from '@plone/volto/components/manage/Tiles/Video/Edit';

import codeSVG from '@plone/volto/icons/code.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';

const customTiles = [
  {
    title: 'hero',
    icon: heroSVG,
  },
  {
    title: 'listing',
    icon: listBulletSVG,
  },
  {
    title: 'maps',
    icon: globeSVG,
  },
  {
    title: 'html',
    icon: codeSVG,
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
  listing: {
    id: 'listing',
    defaultMessage: 'Listing',
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
  listing: ViewListingTile,
  image: ViewImageTile,
  video: ViewVideoTile,
  hero: ViewHeroImageLeftTile,
  maps: ViewMapTile,
  html: ViewHTMLTile,
};

const defaultTilesEditMap = {
  title: EditTitleTile,
  description: EditDescriptionTile,
  text: EditTextTile,
  listing: EditListingTile,
  image: EditImageTile,
  video: EditVideoTile,
  hero: EditHeroImageLeftTile,
  maps: EditMapTile,
  html: EditHTMLTile,
};

export { customTiles, defaultTilesViewMap, defaultTilesEditMap, messagesTiles };
