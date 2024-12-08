import { ConfigType } from '@plone/registry';
import { slate } from './config/slate';
import { blocksConfig } from './config';

export default function install(config: ConfigType) {
  config.settings.slate = slate;
  config.blocks.blocksConfig = blocksConfig;

  return config;
}
