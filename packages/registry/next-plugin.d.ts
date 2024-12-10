import { type ConfigType } from '@plone/registry';
import { type NextConfig } from 'next';

declare function withRegistry(config?: NextConfig): NextConfig;

export { withRegistry };

declare module '@plone/registry/addons-loader' {
  export default function applyAddonConfiguration(config: ConfigType): void;
  export const addonsInfo: ConfigType['settings']['addonsInfo'];
}
