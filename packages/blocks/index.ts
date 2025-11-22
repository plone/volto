import type { ConfigType } from '@plone/registry';
import type { ListingBlockFormData, LoaderUtilityArgs } from '@plone/types';

import TitleBlockInfo from './Title';
import TextBlockInfo from './Text';
import ImageBlockInfo from './Image';
import TeaserBlockInfo from './Teaser';
import ListingBlockInfo from './Listing';

export default function install(config: ConfigType) {
  // @ts-expect-error this is a quick hack for now
  // Initializing blocksConfig to empty.
  // We of course are assuming that this package will be installed before any
  // other package that wants to add blocks.
  config.blocks.blocksConfig = {};

  config.blocks.blocksConfig.title = TitleBlockInfo;
  config.blocks.blocksConfig.slate = TextBlockInfo;
  config.blocks.blocksConfig.image = ImageBlockInfo;
  config.blocks.blocksConfig.teaser = TeaserBlockInfo;
  config.blocks.blocksConfig.listing = ListingBlockInfo;

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

  return config;
}
