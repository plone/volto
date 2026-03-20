import type { ConfigType } from '@plone/registry';
import { ContentTypesMenu } from './components/Toolbar/ContentTypesMenu';
import { ContentFolderishCondition } from './helpers';
import { ToolbarEdit } from './components/Toolbar/ToolbarEdit';
import { NotRouteCondition } from '@plone/layout/helpers';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/publicui/routes/index.tsx',
    children: [
      {
        type: 'index',
        file: '@plone/publicui/routes/content.tsx',
        options: {
          id: 'content-index',
        },
      },
      {
        type: 'route',
        path: 'layers.css',
        file: '@plone/publicui/routes/layers.css.tsx',
      },
      {
        type: 'route',
        path: 'sitemap',
        file: '@plone/publicui/routes/sitemap.tsx',
      },
      {
        type: 'route',
        path: 'search',
        file: '@plone/publicui/routes/search.tsx',
      },
      {
        type: 'route',
        path: '*',
        file: '@plone/publicui/routes/content.tsx',
        options: {
          id: 'content',
        },
      },
    ],
  });

  config.registerSlotComponent({
    name: 'toolbarEdit',
    slot: 'toolbarTop',
    component: ToolbarEdit,
    predicates: [NotRouteCondition('@@edit')],
  });

  config.registerSlotComponent({
    name: 'toolbarAdd',
    slot: 'toolbarTop',
    component: ContentTypesMenu,
    predicates: [ContentFolderishCondition(), NotRouteCondition('@@edit')],
  });

  return config;
}
