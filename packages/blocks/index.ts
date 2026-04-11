import type { ConfigType } from '@plone/registry';

import ImageBlockInfo from './Image';
import VideoBlockInfo from './Video';
import TeaserBlockInfo from './Teaser';
import ListingBlockInfo from './Listing';

export default function install(config: ConfigType) {
  // @ts-expect-error this is a quick hack for now
  // Initializing blocksConfig to empty.
  // We of course are assuming that this package will be installed before any
  // other package that wants to add blocks.
  config.blocks.blocksConfig = {};
  config.blocks.widths = [
    {
      style: {
        '--block-width': 'var(--narrow-container-width)',
      },
      name: 'narrow',
      label: 'Narrow',
    },
    {
      style: {
        '--block-width': 'var(--default-container-width)',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--block-width': 'var(--layout-container-width)',
      },
      name: 'layout',
      label: 'Layout',
    },
    {
      style: {
        '--block-width': '100%',
      },
      name: 'full',
      label: 'Full Width',
    },
  ];

  config.blocks.blocksConfig.image = ImageBlockInfo;
  config.blocks.blocksConfig.teaser = TeaserBlockInfo;
  config.blocks.blocksConfig.video = VideoBlockInfo;
  config.blocks.blocksConfig.listing = ListingBlockInfo;

  const plateBlocksConfig = {
    p: {
      blockWidth: {
        defaultWidth: 'narrow',
        widths: ['narrow'],
      },
    },
    h2: {
      blockWidth: {
        defaultWidth: 'narrow',
        widths: ['narrow'],
      },
    },
    h3: {
      blockWidth: {
        defaultWidth: 'narrow',
        widths: ['narrow'],
      },
    },
    h4: {
      blockWidth: {
        defaultWidth: 'narrow',
        widths: ['narrow'],
      },
    },
    title: {
      blockWidth: {
        defaultWidth: 'default',
        widths: ['default'],
      },
    },
    toc: {
      blockWidth: {
        defaultWidth: 'default',
        widths: ['layout', 'default', 'narrow'],
      },
    },
  };

  config.blocks.plateBlocksConfig = plateBlocksConfig;

  return config;
}
