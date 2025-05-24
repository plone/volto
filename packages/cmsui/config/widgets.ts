import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';

export default function install(config: ConfigType) {
  config.widgets.default = TextField;

  return config;
}
