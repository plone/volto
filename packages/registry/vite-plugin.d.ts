import { ConfigType } from './dist';
import * as vite from 'vite';

declare function PloneRegistryVitePlugin(): vite.Plugin;

declare module '@plone/registry/addons-loader' {
  export default function applyAddonConfiguration(
    config: ConfigType,
  ): ConfigType;
}

export { PloneRegistryVitePlugin };
