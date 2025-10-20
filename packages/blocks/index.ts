import type { ConfigType } from '@plone/registry';
import { slate } from './config/slate';
import TitleBlockInfo from './Title';
import TextBlockInfo from './Text';
import ImageBlockInfo from './Image';
import TeaserBlockInfo from './Teaser';
import ToCBlockInfo from './ToC';

export default function install(config: ConfigType) {
  config.settings.slate = slate;
  // @ts-expect-error this is a quick hack for now
  // Initializing blocksConfig to empty.
  // We of course are assuming that this package will be installed before any
  // other package that wants to add blocks.
  config.blocks.blocksConfig = {};

  config.blocks.blocksConfig.title = TitleBlockInfo;
  config.blocks.blocksConfig.slate = TextBlockInfo;
  config.blocks.blocksConfig.image = ImageBlockInfo;
  config.blocks.blocksConfig.teaser = TeaserBlockInfo;
  config.blocks.blocksConfig.toc = ToCBlockInfo;

  return config;
}
