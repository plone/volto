import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';

export default function install(config: ConfigType) {
  config.registerWidget({ key: 'default', definition: TextField });
  return config;
}
