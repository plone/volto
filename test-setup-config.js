import React from 'react';
import config from '@plone/volto/registry';
import { loadables } from '@plone/volto/config/Loadables';
import { nonContentRoutes } from '@plone/volto/config/NonContentRoutes';
import ToHTMLRenderers, {
  options as ToHTMLOptions,
} from '@plone/volto/config/RichTextEditor/ToHTML';
import {
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
} from '@plone/volto/config/RichTextEditor/Blocks';
import { contentIcons } from '@plone/volto/config/ContentIcons';

import FromHTMLCustomBlockFn from '@plone/volto/config/RichTextEditor/FromHTML';

config.set('settings', {
  apiPath: 'http://localhost:8080/Plone',
  supportedLanguages: ['en'],
  defaultPageSize: 25,
  isMultilingual: false,
  nonContentRoutes,
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
  FromHTMLCustomBlockFn,
  ToHTMLRenderers,
  ToHTMLOptions,
  contentIcons: contentIcons,
  loadables,
  lazyBundles: {
    cms: [
      'prettierStandalone',
      'prettierParserHtml',
      'prismCore',
      'toastify',
      'reactSelect',
      // 'diffLib',
    ],
  },
});
config.set('blocks', {
  blocksConfig: {
    listing: {
      templates: {
        default: {
          label: 'Default',
          template: () => <div className="default-listing-template"></div>,
        },
        imageGallery: {
          label: 'Image gallery',
          template: () => <div className="image-listing-template"></div>,
        },
        summary: {
          label: 'Summary',
          template: () => <div className="summary-listing-template"></div>,
        },
      },
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
    <div id={`field-${props.id}`} className={`${name}-widget`}>
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
