import { defineMessages } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';

import ViewTitleBlock from '@plone/volto/components/manage/Blocks/Title/View';
import ViewDescriptionBlock from '@plone/volto/components/manage/Blocks/Description/View';
import ViewToCBlock from '@plone/volto/components/manage/Blocks/ToC/View';
import ViewImageBlock from '@plone/volto/components/manage/Blocks/Image/View';
import ViewLeadImageBlock from '@plone/volto/components/manage/Blocks/LeadImage/View';
import ViewListingBlock from '@plone/volto/components/manage/Blocks/Listing/View';
import ViewVideoBlock from '@plone/volto/components/manage/Blocks/Video/View';
import ViewMapBlock from '@plone/volto/components/manage/Blocks/Maps/View';
import ViewHTMLBlock from '@plone/volto/components/manage/Blocks/HTML/View';

import EditTitleBlock from '@plone/volto/components/manage/Blocks/Title/Edit';
import EditDescriptionBlock from '@plone/volto/components/manage/Blocks/Description/Edit';
import EditToCBlock from '@plone/volto/components/manage/Blocks/ToC/Edit';
import EditImageBlock from '@plone/volto/components/manage/Blocks/Image/Edit';
import EditLeadImageBlock from '@plone/volto/components/manage/Blocks/LeadImage/Edit';
import EditListingBlock from '@plone/volto/components/manage/Blocks/Listing/Edit';
import DefaultNoResultsComponent from '@plone/volto/components/manage/Blocks/Listing/DefaultNoResultsComponent';
import GalleryNoResultsComponent from '@plone/volto/components/manage/Blocks/Listing/GalleryNoResultsComponent';
import DefaultListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/DefaultTemplate';
import SummaryListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/SummaryTemplate';
import EditVideoBlock from '@plone/volto/components/manage/Blocks/Video/Edit';
import EditMapBlock from '@plone/volto/components/manage/Blocks/Maps/Edit';
import EditHTMLBlock from '@plone/volto/components/manage/Blocks/HTML/Edit';

import descriptionSVG from '@plone/volto/icons/description.svg';
import titleSVG from '@plone/volto/icons/text.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import listingBlockSVG from '@plone/volto/icons/content-listing.svg';
import tocSVG from '@plone/volto/icons/list-bullet.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';
import gridSVG from '@plone/volto/icons/grid-block.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import ImageGalleryListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/ImageGallery';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';
import ImageSettingsSchema from '@plone/volto/components/manage/Blocks/Image/LayoutSchema';
import ToCSettingsSchema from '@plone/volto/components/manage/Blocks/ToC/Schema';

import GridBlockView from '@plone/volto/components/manage/Blocks/Grid/View';
import GridBlockEdit from '@plone/volto/components/manage/Blocks/Grid/Edit';
import { GridBlockDataAdapter } from '@plone/volto/components/manage/Blocks/Grid/adapter';
import { GridBlockSchema } from '@plone/volto/components/manage/Blocks/Grid/schema';
import GridTemplates from '@plone/volto/components/manage/Blocks/Grid/templates';
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { gridImageDisableSizeAndPositionHandlersSchema } from '@plone/volto/components/manage/Blocks/Image/schema';

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
import { getImageBlockSizes } from '@plone/volto/components/manage/Blocks/Image/utils';
import { getLeadImageBlockSizes } from '@plone/volto/components/manage/Blocks/LeadImage/utils';

// block sidebar schemas (not the Dexterity Layout block settings schemas)
import ListingBlockSchema from '@plone/volto/components/manage/Blocks/Listing/schema';
import SearchBlockSchema from '@plone/volto/components/manage/Blocks/Search/schema';
import VideoBlockSchema from '@plone/volto/components/manage/Blocks/Video/schema';

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
  // BBB Table messages
  Table: {
    id: 'Table',
    defaultMessage: 'Table',
  },
  cell: {
    id: 'Cell',
    defaultMessage: 'Cell',
  },
  insertRowBefore: {
    id: 'Insert row before',
    defaultMessage: 'Insert row before',
  },
  insertRowAfter: {
    id: 'Insert row after',
    defaultMessage: 'Insert row after',
  },
  deleteRow: {
    id: 'Delete row',
    defaultMessage: 'Delete row',
  },
  insertColBefore: {
    id: 'Insert col before',
    defaultMessage: 'Insert col before',
  },
  insertColAfter: {
    id: 'Insert col after',
    defaultMessage: 'Insert col after',
  },
  deleteCol: {
    id: 'Delete col',
    defaultMessage: 'Delete col',
  },
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width columns',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Reduce cell padding',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Minimalistic table design',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Add border to inner columns',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Alternate row background color',
  },
  headerCell: {
    id: 'Header cell',
    defaultMessage: 'Header cell',
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
    docs: {
      description:
        "Displays the content item's title field. Automatically added as the first block on all content pages. Do not add this block manually, the Title block will be automatically created by Plone.",
      usage_notes:
        "To set the page title, use the 'title' field of the content object itself",
      example: { '@type': 'title' },
    },
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
    docs: {
      description:
        "Displays the content item's description/summary field. Renders automatically from the content object.",
      usage_notes:
        "To set the page description, use the 'description' field of the content object itself",
      example: { '@type': 'description' },
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
    getSizes: getImageBlockSizes,
    docs: {
      description:
        'Displays an internal or external image with optional title, description, alt text, alignment, size, and link. Use for standalone images within page content.',
      usage_notes:
        "For INTERNAL Plone images: set 'url' to the Image content object path (e.g. /my-folder/my-image) or a full URL — both are accepted and get converted to a UID-based path when stored. Set 'image_field' to 'image'. For EXTERNAL images: set 'url' to the full image URL and omit 'image_field'. Do NOT use @@images URLs. Do not set 'align' or 'size' when nesting inside another block (e.g. gridBlock) since the parent block controls layout.",
      example: {
        '@type': 'image',
        url: 'https://example.com/images/logo.png',
        alt: 'Logo',
        description: 'External logo image',
      },
      field_hints: {
        url: 'EXTERNAL: direct image URL. INTERNAL: path to Image content object or full URL (converted to UID-based path on save) — NOT the @@images URL.',
        image_field:
          "REQUIRED for internal Plone images, set to 'image'. MUST BE OMITTED for external image URLs.",
      },
    },
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
    getSizes: getLeadImageBlockSizes,
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
    docs: ({ blockConfig: _blockConfig }) => ({
      description:
        'Renders a dynamic list of content items from a catalog query. Use for news feeds, event listings, filtered content collections, or any scenario where content should be pulled dynamically. For static manually-curated links, use the Teaser block instead.',
      usage_notes:
        "The 'querystring' and 'variation' fields are required. When 'sort_order' is 'descending', also set 'sort_order_boolean' to true. 'b_size' and 'limit' values must be strings (e.g. '10'), not integers.",
      example: {
        '@type': 'listing',
        headline: 'Latest News',
        headlineTag: 'h2',
        variation: 'summary',
        querystring: {
          query: [
            {
              i: 'portal_type',
              o: 'plone.app.querystring.operation.selection.any',
              v: ['News Item'],
            },
            {
              i: 'path',
              o: 'plone.app.querystring.operation.string.absolutePath',
              v: '/news',
            },
          ],
          sort_on: 'effective',
          sort_order: 'descending',
          b_size: '6',
        },
      },
      field_hints: {
        querystring:
          "Required. Object with 'query' (required array of filter criteria), optional 'sort_on', 'sort_order', 'sort_order_boolean', 'b_size' (string, items per page), 'limit' (string, max total results). Multiple criteria are combined with AND logic. Each criterion requires 'i' (index name), 'o' (FULL operation string), 'v' (value). " +
          'Available indexes and operations are dynamic and depend on the site registry — use the /@querystring API endpoint to retrieve the current list. ' +
          "sort_order: 'ascending' (default) or 'descending'. When 'sort_order' is 'descending', also set 'sort_order_boolean' to true.",
        variation:
          "Required. See the 'variations' field for the list of registered variation IDs.",
      },
    }),
  },
  video: {
    id: 'video',
    title: 'Video',
    icon: videoSVG,
    group: 'media',
    view: ViewVideoBlock,
    edit: EditVideoBlock,
    schema: BlockSettingsSchema,
    blockSchema: VideoBlockSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    allowedPeertubeInstances: [],
    docs: {
      description:
        'Embeds a video by URL (YouTube, Vimeo, or direct video file). Use for embedding video content within page text.',
      usage_notes: '',
      example: {
        '@type': 'video',
        url: 'https://youtu.be/n837R4emhns?si=Xw2mQDxDVI02CZvz',
      },
      field_hints: {
        url: 'Video URL (YouTube, Vimeo, or direct video file link).',
      },
    },
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
    docs: {
      description:
        'Auto-generates a navigation list from heading blocks on the page. Use to provide an overview and quick navigation for long pages.',
      usage_notes:
        'No configuration needed. Automatically scans the page for heading blocks.',
      example: { '@type': 'toc' },
    },
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
    docs: {
      description:
        'Embeds an interactive map via a URL. Use for displaying geographic locations or maps within page content.',
      usage_notes:
        "The 'url' field should be an embed URL (e.g. a Google Maps embed URL starting with https://www.google.com/maps/embed).",
      example: {
        '@type': 'maps',
        url: 'https://www.google.com/maps/embed?pb=...',
      },
      field_hints: {
        url: 'Map embed URL. For Google Maps: use the embed URL from Share > Embed a map.',
      },
    },
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
    docs: {
      description:
        'Renders raw HTML markup. Use only for trusted, custom HTML that cannot be achieved with other blocks.',
      usage_notes:
        'Only use trusted content. Prefer other blocks when possible.',
      example: {
        '@type': 'html',
        html: '<p>Custom <strong>HTML</strong> content.</p>',
      },
      field_hints: {
        html: 'Raw HTML string to render. Must be trusted content.',
      },
    },
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
    docs: {
      description:
        'Renders a searchable, filterable list of content items. Use for any content collection where users need to find items interactively. Unlike the Listing block, the Search block adds a live search input, sorting controls, and optional faceted filters.',
      usage_notes:
        "'query' is an object (analogous to 'querystring' in the Listing block) that pre-filters all results before the user interacts. " +
        "It contains a 'query' array inside it — do NOT set 'query' to an array directly. Use {'query': []} to show all content with no pre-filtering. " +
        "'b_size' and 'limit' inside 'query' must be strings (e.g. '10'), not integers.",
      example: {
        '@type': 'search',
        headline: 'News',
        query: {
          query: [
            {
              i: 'portal_type',
              o: 'plone.app.querystring.operation.selection.any',
              v: ['News Item'],
            },
          ],
          sort_on: 'effective',
          sort_order: 'descending',
          b_size: '10',
        },
        showSearchInput: true,
        showSortOn: true,
        showTotalResults: true,
        variation: 'facetsRightSide',
      },
      field_hints: {
        query:
          "Object that pre-filters all search results. Contains 'query' (required array of filter criteria), optional 'sort_on', 'sort_order', 'b_size' (string, items per page), 'limit' (string, max total). " +
          'Use {"query": []} to show all content with no pre-filtering. ' +
          'Each criterion requires "i" (index), "o" (FULL operation string), "v" (value). ' +
          'Indexes: portal_type, path, Title, Description, SearchableText, Creator, getId, review_state, Subject, created, modified. ' +
          'Operations (always use the FULL string): ' +
          'plone.app.querystring.operation.selection.any/none/all — v: array of strings, e.g. ["News Item"]; ' +
          'plone.app.querystring.operation.string.contains/is/isNot — v: string; ' +
          'plone.app.querystring.operation.string.absolutePath — v: "/path/to/folder::depth" (e.g. "/en/news::1"); ' +
          'plone.app.querystring.operation.string.relativePath — v: "./" (current) or "../" (parent); ' +
          'plone.app.querystring.operation.string.currentUser — v: "" (matches logged-in user, use with Creator index); ' +
          'plone.app.querystring.operation.date.largerThan/lessThan — v: "YYYY-MM-DD". ' +
          "sort_on values: 'sortable_title', 'effective', 'created', 'modified', 'getObjPositionInParent', 'start', 'end', 'review_state'. " +
          "sort_order: 'ascending' (default) or 'descending'.",
        showSearchInput:
          'Boolean. Show a live text search input above results. Default: true.',
        showSortOn:
          'Boolean. Show a sort-by dropdown above results. Default: false.',
        showTotalResults:
          'Boolean. Show the total result count above results. Default: true.',
        facets:
          'Array of facet filter definitions. Each: {"title": "Label", "field": "catalog_index", "type": "selectFacet|checkboxFacet|daterangeFacet|toggleFacet", "hidden": false, "advanced": false}. Omit or use [] for no facets.',
        variation:
          "Controls facet panel position: 'facetsRightSide' (default), 'facetsLeftSide', or 'facetsTopSide'.",
      },
    },
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
            title: 'Date Range',
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
  // This next block is not named just grid for some reasons:
  // 1.- Naming it grid will collide with the SemanticUI CSS of the Grid component
  // 2.- It would prevent the transition from the old grid
  //     (based on @kitconcept/volto-blocks-grid) without having to perform any migration.
  //     This way, both can co-exist at the same time.
  gridBlock: {
    id: 'gridBlock',
    title: 'Grid',
    icon: gridSVG,
    group: 'common',
    view: GridBlockView,
    edit: GridBlockEdit,
    blockSchema: GridBlockSchema,
    dataAdapter: GridBlockDataAdapter,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    templates: GridTemplates,
    maxLength: 4,
    allowedBlocks: ['image', 'listing', 'slate', 'teaser'],
    docs: {
      description:
        'Organizes child blocks (teaser, image, slate, listing) in a responsive column layout. Use to display multiple items side by side. Maximum 4 child blocks per grid.',
      usage_notes:
        "The 'blocks' object keys and 'blocks_layout.items' array must use matching UUIDs (these are generated automatically when using the Plone MCP block tools). Only 'image', 'listing', 'slate', and 'teaser' are allowed as children. Do not set 'align', 'size', or 'styles.align' on child image or teaser blocks, the grid controls layout.",
      example: {
        '@type': 'gridBlock',
        blocks: {
          'uuid-1': {
            '@type': 'teaser',
            href: [{ '@id': '/en/news/article-one', title: 'Article One' }],
          },
          'uuid-2': {
            '@type': 'teaser',
            href: [{ '@id': '/en/news/article-two', title: 'Article Two' }],
          },
        },
        blocks_layout: { items: ['uuid-1', 'uuid-2'] },
      },
      field_hints: {
        blocks:
          "Object of child blocks keyed by UUID. Each child must have '@type' and required fields for that block type. Maximum 4 blocks. Allowed types: 'image', 'listing', 'slate', 'teaser'.",
        blocks_layout:
          "Object with 'items' array of child block UUIDs in display order. Must match the keys of 'blocks'.",
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
    docs: {
      description:
        'Displays a visual card linking to a content item, showing its title, description, and image. Use for featured content, call-to-action cards, or manually curated highlights. Unlike the Listing block, the Teaser references a single specific content item.',
      usage_notes:
        "The 'href' field is required and usually the only field needed — the teaser automatically uses the target's title, description, and image. Set 'overwrite: true' only when you need to customize those values; changes to the target content will then NOT be reflected automatically. Do not use 'styles.align' inside a gridBlock — the parent controls layout.",
      example: {
        '@type': 'teaser',
        href: [
          {
            '@id': '/en/news/annual-report-2025',
            title: 'Annual Report 2025',
          },
        ],
      },
      field_hints: {
        href: 'Required. Array with exactly one object: [{"@id": "/path/to/content", "title": "Title"}]. For external links: [{"@id": "https://example.com", "title": "Example"}].',
        overwrite:
          'Set true only when customizing title, description, or image independently of the target content.',
        preview_image:
          'Only used when \'overwrite\' is true. Array with one object: [{"@id": "/path/to/image", "image_field": "image"}]. Omit \'image_field\' for external image URLs.',
        styles:
          "Object with 'align' ('left', 'right', 'center'). Do not set styles when using this block inside a gridBlock.",
      },
    },
  },
};

// This is required in order to initialize the inner blocksConfig
// for the grid block, since we need to modify how the inner teaser
// block behave in it (= no schemaEnhancer fields for teasers inside a grid)
// Afterwards, it can be further customized in add-ons using the same technique.
blocksConfig.gridBlock.blocksConfig = cloneDeep(blocksConfig);
blocksConfig.gridBlock.blocksConfig.teaser.schemaEnhancer =
  gridTeaserDisableStylingSchema;
blocksConfig.gridBlock.blocksConfig.image.schemaEnhancer =
  gridImageDisableSizeAndPositionHandlersSchema;

const requiredBlocks = [];

const initialBlocks = {};
const initialBlocksFocus = {}; //{Document:'title'}

export function installDefaultBlocks(config) {
  config.blocks.requiredBlocks = requiredBlocks;
  config.blocks.blocksConfig = blocksConfig;
  config.blocks.groupBlocksOrder = groupBlocksOrder;
  config.blocks.initialBlocks = initialBlocks;
  config.blocks.initialBlocksFocus = initialBlocksFocus;
  config.blocks.showEditBlocksInBabelView = false;
}

export {
  groupBlocksOrder,
  requiredBlocks,
  blocksConfig,
  initialBlocks,
  initialBlocksFocus,
};
