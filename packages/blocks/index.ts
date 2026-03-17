import type { ConfigType } from '@plone/registry';

import ImageBlockInfo from './Image';
import TeaserBlockInfo from './Teaser';
import ListingBlockInfo from './Listing';
import MapsBlockInfo from './Maps';

export default function install(config: ConfigType) {
  // @ts-expect-error this is a quick hack for now
  // Initializing blocksConfig to empty.
  // We of course are assuming that this package will be installed before any
  // other package that wants to add blocks.
  config.blocks.blocksConfig = {};

  config.blocks.blocksConfig.image = ImageBlockInfo;
  config.blocks.blocksConfig.teaser = TeaserBlockInfo;
  config.blocks.blocksConfig.listing = ListingBlockInfo;
  config.blocks.blocksConfig.maps = MapsBlockInfo;

  return config;
}
