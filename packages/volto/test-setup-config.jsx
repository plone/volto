/*
 * This is the mocked config registry loader for tests.
 * It uses some of the default (real) configuration,
 * (mainly) DraftJS one, to not differ too much from reality
 * Ideally, we should mock this ones as well at some point.
 * Views, Widgets and Blocks are mocked already, to keep
 * snapshot consistency and readability.
 */
import React from 'react';
import config from '@plone/volto/registry';
import { loadables } from '@plone/volto/config/Loadables';
import { nonContentRoutes } from '@plone/volto/config/NonContentRoutes';
import { contentIcons } from '@plone/volto/config/ContentIcons';
import {
  styleClassNameConverters,
  styleClassNameExtenders,
} from '@plone/volto/config/Style';

import {
  controlPanelsIcons,
  filterControlPanels,
  filterControlPanelsSchema,
} from '@plone/volto/config/ControlPanels';

import ListingBlockSchema from '@plone/volto/components/manage/Blocks/Listing/schema';
import { registerValidators } from '@plone/volto/config/validation';

config.set('settings', {
  apiPath: 'http://localhost:8080/Plone',
  publicURL: 'http://localhost:3000',
  defaultLanguage: 'en',
  supportedLanguages: ['en'],
  defaultPageSize: 25,
  isMultilingual: false,
  nonContentRoutes,
  contentIcons: contentIcons,
  loadables,
  lazyBundles: {
    cms: [
      'prettierStandalone',
      'prettierParserHtml',
      'prismCore',
      'toastify',
      'reactSelect',
      'reactSortableHOC',
      // 'diffLib',
    ],
  },
  controlPanelsIcons,
  filterControlPanels,
  filterControlPanelsSchema,
  apiExpanders: [],
  downloadableObjects: ['File'],
  viewableInBrowserObjects: [],
  styleClassNameConverters,
  styleClassNameExtenders,
  blockSettingsTabFieldsetsInitialStateOpen: true,
  containerBlockTypes: [],
});
config.set('blocks', {
  blocksConfig: {
    listing: {
      blockSchema: ListingBlockSchema,
      variations: [
        {
          id: 'default',
          isDefault: true,
          title: 'Default',
          template: () => (
            <div className="mocked-default-listing-template"></div>
          ),
        },
        {
          id: 'imageGallery',
          title: 'Image gallery',
          template: () => <div className="mocked-image-listing-template"></div>,
        },
        {
          id: 'summary',
          title: 'Summary',
          template: () => (
            <div className="mocked-summary-listing-template"></div>
          ),
        },
      ],
    },
  },
  requiredBlocks: [],
  groupBlocksOrder: [
    { id: 'mostUsed', title: 'Most used' },
    { id: 'text', title: 'Text' },
    { id: 'media', title: 'Media' },
    { id: 'common', title: 'Common' },
  ],
  initialBlocks: {},
});
config.set('views', {
  layoutViews: {},
  contentTypesViews: {},
  defaultView: {},
  errorViews: {},
});

function BaseWidget(name) {
  return (props) => (
    <div id={`mocked-field-${props.id}`} className={`mocked-${name}-widget`}>
      {props.title || 'No title'} - {props.description || 'No description'}
    </div>
  );
}

config.set('widgets', {
  id: {
    schema: BaseWidget('schema'),
    subjects: BaseWidget('subjects'),
    query: BaseWidget('query'),
    recurrence: BaseWidget('recurrence'),
    remoteUrl: BaseWidget('remoteurl'),
  },
  widget: {
    richtext: BaseWidget('richtext'),
    textarea: BaseWidget('textarea'),
    datetime: BaseWidget('datetime'),
    date: BaseWidget('date'),
    password: BaseWidget('password'),
    file: BaseWidget('file'),
    align: BaseWidget('align'),
    url: BaseWidget('url'),
    email: BaseWidget('email'),
    object_browser: BaseWidget('object_browser'),
  },
  vocabulary: {},
  factory: {},
  choices: BaseWidget('choices'),
  type: {
    boolean: BaseWidget('boolean'),
    array: BaseWidget('array'),
    object: BaseWidget('object'),
    datetime: BaseWidget('datetime'),
    date: BaseWidget('date'),
    password: BaseWidget('password'),
    number: BaseWidget('number'),
    integer: BaseWidget('integer'),
  },
  default: BaseWidget('default'),
});

config.set('components', {
  PreviewImage: {
    component: (props) => <img alt="PreviewImage component mock" {...props} />,
  },
  Image: {
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    component: (props) => <img alt="Image component mock" {...props} />,
  },
});

config.set('utilities', {});

config.set('experimental', {
  addBlockButton: {
    enabled: false,
  },
});

config.set('slots', {});

registerValidators(config);
