import type { SettingsConfig } from './Settings';
import type { BlocksConfig } from './Blocks';
import type { ViewsConfig } from './Views';
import type { WidgetsConfig } from './Widgets';
import type { SlotsConfig } from './Slots';

export type AddonReducersConfig = Record<string, Function>;

export type AddonRoutesConfig = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}[];

export type ComponentsConfig = Record<
  string,
  { component: React.ComponentType }
>;

export interface ExperimentalConfig {
  addBlockButton: {
    enabled: boolean;
  };
}

// This is a type because it's not supposed to be extendable
export type ConfigData = {
  settings: SettingsConfig;
  blocks: BlocksConfig;
  views: ViewsConfig;
  widgets: WidgetsConfig;
  addonReducers: AddonReducersConfig;
  addonRoutes: AddonRoutesConfig;
  slots: SlotsConfig;
  components: ComponentsConfig;
  experimental: ExperimentalConfig;
};

export { SettingsConfig, BlocksConfig, ViewsConfig, WidgetsConfig };
export * from './Blocks';
export * from './Settings';
export * from './Slots';
export * from './Views';
export * from './Widgets';
