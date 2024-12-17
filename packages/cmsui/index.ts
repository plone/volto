import type { ConfigType } from '@plone/registry';
import installWidgets from './config/widgets';
import '@plone/components/dist/basic.css';
import '@plone/components/dist/quanta.css';

export default function install(config: ConfigType) {
  installWidgets(config);
  return config;
}
