/**
 * This is the server side config entry point
 */
import config from '@plone/registry';
import PloneClient from '@plone/client';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration from '../.plone/registry.loader';
// eslint-disable-next-line import/no-unresolved
import applyServerAddonConfiguration from '../.plone/registry.loader.server';

import type { ListingBlockFormData, QuerystringParameter } from '@plone/types';
import type { LoaderUtilityArgs } from './config.types';

export default function install() {
  config.settings.apiPath =
    process.env.PLONE_API_PATH || 'http://localhost:8080/Plone';

  const cli = PloneClient.initialize({
    apiPath: config.settings.apiPath,
  });

  config.registerUtility({
    name: 'ploneClient',
    type: 'client',
    method: () => cli,
  });

  config.registerUtility({
    name: 'ListingBlocksContentLoading',
    type: 'rootContentSubRequest',
    method: async (args: LoaderUtilityArgs) => {
      const listingBlocks: { id: string; block: ListingBlockFormData }[] =
        Object.entries(args.content.blocks ?? {})
          .filter(([, block]) => block['@type'] === 'listing')
          .map(([id, block]) => ({ id, block: block as ListingBlockFormData }));
      for (let i = 0; i < listingBlocks.length; i++) {
        const { id, block } = listingBlocks[i];
        if (block.querystring) {
          const results = await args.cli.querystringSearch(block.querystring);
          args.content.blocks[id].items = results.data.items;
        }
      }
    },
  });

  config.registerUtility({
    name: 'SearchBlocksContentLoading',
    type: 'rootContentSubRequest',
    method: async (args: LoaderUtilityArgs) => {
      const searchBlocks: {
        id: string;
        block: {
          '@type': 'search';
          query?: QuerystringParameter['query'];
          querystring?: QuerystringParameter;
          sort_on?: string;
          sort_order?: string;
          b_size?: string;
          items?: unknown[];
        };
      }[] = Object.entries(args.content.blocks ?? {})
        .filter(([, block]) => block['@type'] === 'search')
        .map(([id, block]) => ({
          id,
          block: block as {
            '@type': 'search';
            query?: QuerystringParameter['query'];
            querystring?: QuerystringParameter;
            sort_on?: string;
            sort_order?: string;
            b_size?: string;
            items?: unknown[];
          },
        }));

      for (let i = 0; i < searchBlocks.length; i++) {
        const { id, block } = searchBlocks[i];
        const query = block.query ?? block.querystring?.query;
        if (!query?.length) continue;

        const results = await args.cli.querystringSearch({
          query,
          sort_on: block.sort_on ?? block.querystring?.sort_on,
          sort_order: block.sort_order ?? block.querystring?.sort_order,
          b_size: block.b_size ?? block.querystring?.b_size,
        });
        args.content.blocks[id].items = results.data.items;
      }
    },
  });

  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];

  applyAddonConfiguration(config);
  applyServerAddonConfiguration(config);

  // eslint-disable-next-line no-console
  // console.log('API_PATH is:', config.settings.apiPath);

  return config;
}
