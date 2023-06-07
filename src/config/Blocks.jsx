import { defineMessages } from 'react-intl';

import ViewTitleBlock from '@plone/volto/components/manage/Blocks/Title/View';
import ViewDescriptionBlock from '@plone/volto/components/manage/Blocks/Description/View';
import ViewToCBlock from '@plone/volto/components/manage/Blocks/ToC/View';
import ViewTextBlock from '@plone/volto/components/manage/Blocks/Text/View';
import ViewImageBlock from '@plone/volto/components/manage/Blocks/Image/View';
import ViewLeadImageBlock from '@plone/volto/components/manage/Blocks/LeadImage/View';
import ViewListingBlock from '@plone/volto/components/manage/Blocks/Listing/View';
import ViewVideoBlock from '@plone/volto/components/manage/Blocks/Video/View';
import ViewHeroImageLeftBlock from '@plone/volto/components/manage/Blocks/HeroImageLeft/View';
import ViewMapBlock from '@plone/volto/components/manage/Blocks/Maps/View';
import ViewHTMLBlock from '@plone/volto/components/manage/Blocks/HTML/View';
import ViewTableBlock from '@plone/volto/components/manage/Blocks/Table/View';

import EditTitleBlock from '@plone/volto/components/manage/Blocks/Title/Edit';
import EditDescriptionBlock from '@plone/volto/components/manage/Blocks/Description/Edit';
import EditToCBlock from '@plone/volto/components/manage/Blocks/ToC/Edit';
import EditTextBlock from '@plone/volto/components/manage/Blocks/Text/Edit';
import EditImageBlock from '@plone/volto/components/manage/Blocks/Image/Edit';
import EditLeadImageBlock from '@plone/volto/components/manage/Blocks/LeadImage/Edit';
import EditListingBlock from '@plone/volto/components/manage/Blocks/Listing/Edit';
import DefaultNoResultsComponent from '@plone/volto/components/manage/Blocks/Listing/DefaultNoResultsComponent';
import GalleryNoResultsComponent from '@plone/volto/components/manage/Blocks/Listing/GalleryNoResultsComponent';
import DefaultListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/DefaultTemplate';
import SummaryListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/SummaryTemplate';
import EditVideoBlock from '@plone/volto/components/manage/Blocks/Video/Edit';
import EditHeroImageLeftBlock from '@plone/volto/components/manage/Blocks/HeroImageLeft/Edit';
import EditMapBlock from '@plone/volto/components/manage/Blocks/Maps/Edit';
import EditHTMLBlock from '@plone/volto/components/manage/Blocks/HTML/Edit';
import EditTableBlock from '@plone/volto/components/manage/Blocks/Table/Edit';

import descriptionSVG from '@plone/volto/icons/description.svg';
import titleSVG from '@plone/volto/icons/text.svg';
import textSVG from '@plone/volto/icons/subtext.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import tableSVG from '@plone/volto/icons/table.svg';
import listingBlockSVG from '@plone/volto/icons/content-listing.svg';
import tocSVG from '@plone/volto/icons/list-bullet.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import ImageGalleryListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/ImageGallery';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';
import TextSettingsSchema from '@plone/volto/components/manage/Blocks/Text/Schema';
import ImageSettingsSchema from '@plone/volto/components/manage/Blocks/Image/LayoutSchema';
import ToCSettingsSchema from '@plone/volto/components/manage/Blocks/ToC/Schema';

import SearchBlockView from '@plone/volto/components/manage/Blocks/Search/SearchBlockView';
import SearchBlockEdit from '@plone/volto/components/manage/Blocks/Search/SearchBlockEdit';

import RightColumnFacets from '@plone/volto/components/manage/Blocks/Search/layout/RightColumnFacets';
import LeftColumnFacets from '@plone/volto/components/manage/Blocks/Search/layout/LeftColumnFacets';
import TopSideFacets from '@plone/volto/components/manage/Blocks/Search/layout/TopSideFacets';
import {
  SelectFacet,
  CheckboxFacet,
  DateRangeFacet,
  ToggleFacet,
  ToggleFacetFilterListEntry,
  SelectFacetFilterListEntry,
  DateRangeFacetFilterListEntry,
} from '@plone/volto/components/manage/Blocks/Search/components';
import getListingBlockAsyncData from '@plone/volto/components/manage/Blocks/Listing/getAsyncData';

// block sidebar schemas (not the Dexterity Layout block settings schemas)
import HeroImageLeftBlockSchema from '@plone/volto/components/manage/Blocks/HeroImageLeft/schema';
import ListingBlockSchema from '@plone/volto/components/manage/Blocks/Listing/schema';
import SearchBlockSchema from '@plone/volto/components/manage/Blocks/Search/schema';

import ToCVariations from '@plone/volto/components/manage/Blocks/ToC/variations';

import TeaserViewBlock from '@plone/volto/components/manage/Blocks/Teaser/View';
import TeaserEditBlock from '@plone/volto/components/manage/Blocks/Teaser/Edit';
import TeaserBlockDefaultBody from '@plone/volto/components/manage/Blocks/Teaser/DefaultBody';
import { TeaserSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { TeaserBlockDataAdapter } from '@plone/volto/components/manage/Blocks/Teaser/adapter';

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
  toc: {
    id: 'toc',
    defaultMessage: 'Table of Contents',
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
  leadimage: {
    id: 'leadimage',
    defaultMessage: 'Lead Image Field',
  },
  listing: {
    id: 'listing',
    defaultMessage: 'Listing',
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
  // Listing block variations
  summary: {
    id: 'Summary',
    defaultMessage: 'Summary',
  },
  imageGallery: {
    id: 'Image gallery',
    defaultMessage: 'Image gallery',
  },
  // Search block variations
  facetsRightSide: {
    id: 'Facets on right side',
    defaultMessage: 'Facets on right side',
  },
  facetsLeftSide: {
    id: 'Facets on left side',
    defaultMessage: 'Facets on left side',
  },
  facetsTopSide: {
    id: 'Facets on top',
    defaultMessage: 'Facets on top',
  },
  selectFacet: {
    id: 'selectFacet',
    defaultMessage: 'Select',
  },
  checkboxFacet: {
    id: 'checkboxFacet',
    defaultMessage: 'Checkbox',
  },
  daterangeFacet: {
    id: 'daterangeFacet',
    defaultMessage: 'Date Range',
  },
  toggleFacet: {
    id: 'toggleFacet',
    defaultMessage: 'Toggle',
  },
});

const groupBlocksOrder = [
  { id: 'mostUsed', title: 'Most used' },
  { id: 'text', title: 'Text' },
  { id: 'media', title: 'Media' },
  { id: 'common', title: 'Common' },
];

const blocksConfig = {
  title: {
    id: 'title',
    title: 'Title',
    icon: titleSVG,
    group: 'text',
    view: ViewTitleBlock,
    edit: EditTitleBlock,
    schema: BlockSettingsSchema,
    restricted: ({ properties, block }) =>
      properties.blocks_layout?.items?.find(
        (uid) => properties.blocks?.[uid]?.['@type'] === block.id,
      ),
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
  },
  description: {
    id: 'description',
    title: 'Description',
    icon: descriptionSVG,
    group: 'text',
    view: ViewDescriptionBlock,
    edit: EditDescriptionBlock,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
  },
  text: {
    id: 'text',
    title: 'Text',
    icon: textSVG,
    group: 'text',
    view: ViewTextBlock,
    edit: EditTextBlock,
    schema: TextSettingsSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
    blockHasValue: (data) => {
      const isEmpty =
        !data.text ||
        (data.text?.blocks?.length === 1 && data.text.blocks[0].text === '');
      return !isEmpty;
    },
  },
  image: {
    id: 'image',
    title: 'Image',
    icon: cameraSVG,
    group: 'media',
    view: ViewImageBlock,
    edit: EditImageBlock,
    schema: ImageSettingsSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  },
  leadimage: {
    id: 'leadimage',
    title: 'Lead Image Field',
    icon: cameraSVG,
    group: 'media',
    view: ViewLeadImageBlock,
    edit: EditLeadImageBlock,
    schema: BlockSettingsSchema,
    restricted: ({ properties }) => !properties.hasOwnProperty('image'),
    mostUsed: false,
    sidebarTab: 1,
  },
  listing: {
    id: 'listing',
    title: 'Listing',
    icon: listingBlockSVG,
    group: 'common',
    view: ViewListingBlock,
    edit: EditListingBlock,
    schema: BlockSettingsSchema,
    blockSchema: ListingBlockSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    showLinkMore: false,
    noResultsComponent: DefaultNoResultsComponent,
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: DefaultListingBlockTemplate,
      },
      {
        id: 'imageGallery',
        title: 'Image gallery',
        template: ImageGalleryListingBlockTemplate,
        noResultsComponent: GalleryNoResultsComponent,
      },
      {
        id: 'summary',
        title: 'Summary',
        template: SummaryListingBlockTemplate,
      },
    ],
    getAsyncData: getListingBlockAsyncData,
  },
  video: {
    id: 'video',
    title: 'Video',
    icon: videoSVG,
    group: 'media',
    view: ViewVideoBlock,
    edit: EditVideoBlock,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  },
  toc: {
    id: 'toc',
    title: 'Table of Contents',
    icon: tocSVG,
    group: 'common',
    view: ViewToCBlock,
    edit: EditToCBlock,
    schema: ToCSettingsSchema,
    variations: ToCVariations,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  },
  hero: {
    id: 'hero',
    title: 'Hero',
    icon: heroSVG,
    group: 'common',
    view: ViewHeroImageLeftBlock,
    edit: EditHeroImageLeftBlock,
    schema: BlockSettingsSchema,
    blockSchema: HeroImageLeftBlockSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
  },

  maps: {
    id: 'maps',
    title: 'Maps',
    icon: globeSVG,
    group: 'common',
    view: ViewMapBlock,
    edit: EditMapBlock,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  },
  html: {
    id: 'html',
    title: 'HTML',
    icon: codeSVG,
    group: 'common',
    view: ViewHTMLBlock,
    edit: EditHTMLBlock,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
  },
  table: {
    id: 'table',
    title: 'Table',
    icon: tableSVG,
    group: 'common',
    view: ViewTableBlock,
    edit: EditTableBlock,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
  },
  search: {
    id: 'search',
    title: 'Search',
    icon: searchSVG,
    group: 'common',
    view: SearchBlockView,
    edit: SearchBlockEdit,
    blockSchema: SearchBlockSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    variations: [
      {
        id: 'facetsRightSide',
        title: 'Facets on right side',
        view: RightColumnFacets,
        isDefault: true,
      },
      {
        id: 'facetsLeftSide',
        title: 'Facets on left side',
        view: LeftColumnFacets,
        isDefault: false,
      },
      {
        id: 'facetsTopSide',
        title: 'Facets on top',
        view: TopSideFacets,
        isDefault: false,
      },
    ],
    extensions: {
      facetWidgets: {
        rewriteOptions: (name, choices) => {
          return name === 'review_state'
            ? choices.map((opt) => ({
                ...opt,
                label: opt.label.replace(/\[.+\]/, '').trim(),
              }))
            : choices;
        },
        types: [
          {
            id: 'selectFacet',
            title: 'Select',
            view: SelectFacet,
            isDefault: true,
            schemaEnhancer: SelectFacet.schemaEnhancer,
            stateToValue: SelectFacet.stateToValue,
            valueToQuery: SelectFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'checkboxFacet',
            title: 'Checkbox',
            view: CheckboxFacet,
            isDefault: false,
            schemaEnhancer: CheckboxFacet.schemaEnhancer,
            stateToValue: CheckboxFacet.stateToValue,
            valueToQuery: CheckboxFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
          {
            id: 'daterangeFacet',
            title: 'Date range',
            view: DateRangeFacet,
            isDefault: false,
            stateToValue: DateRangeFacet.stateToValue,
            valueToQuery: DateRangeFacet.valueToQuery,
            filterListComponent: DateRangeFacetFilterListEntry,
          },
          {
            id: 'toggleFacet',
            title: 'Toggle',
            view: ToggleFacet,
            isDefault: false,
            stateToValue: ToggleFacet.stateToValue,
            valueToQuery: ToggleFacet.valueToQuery,
            filterListComponent: ToggleFacetFilterListEntry,
          },
        ],
      },
    },
  },
  teaser: {
    id: 'teaser',
    title: 'Teaser',
    icon: imagesSVG,
    group: 'common',
    view: TeaserViewBlock,
    edit: TeaserEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    blockSchema: TeaserSchema,
    dataAdapter: TeaserBlockDataAdapter,
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: TeaserBlockDefaultBody,
      },
    ],
  },
};

const requiredBlocks = ['title'];

const initialBlocks = {};
const initialBlocksFocus = {}; //{Document:'title'}

export {
  groupBlocksOrder,
  requiredBlocks,
  blocksConfig,
  initialBlocks,
  initialBlocksFocus,
};
