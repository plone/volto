import type { ConfigType } from '@plone/registry';
import { slate } from './config/slate';
import { blocksConfig } from './config';

export default function install(config: ConfigType) {
  config.settings.slate = slate;
  // @ts-expect-error this is a quick hack for now
  config.blocks.blocksConfig = blocksConfig;

  return config;
}
