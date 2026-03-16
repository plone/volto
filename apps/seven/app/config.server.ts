/**
 * This is the server side config entry point
 */
import config from '@plone/registry';
import PloneClient from '@plone/client';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration from '../.plone/registry.loader';
// eslint-disable-next-line import/no-unresolved
import applyServerAddonConfiguration from '../.plone/registry.loader.server';

import type { ListingBlockFormData } from '@plone/types';
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
        Object.entries(args.content.blocks)
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

  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];

  applyAddonConfiguration(config);
  applyServerAddonConfiguration(config);

  // eslint-disable-next-line no-console
  // console.log('API_PATH is:', config.settings.apiPath);

  return config;
}
