import type { SettingsConfig } from './Settings';
import type { BlocksConfig } from './Blocks';
import type { ViewsConfig } from './Views';
import type { WidgetsConfig } from './Widgets';
import type { SlotsConfig } from './Slots';
import type { UtilitiesConfig } from './Utilities';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type AddonReducersConfig = Record<string, Function>;

export type AddonRoutesConfig = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}[];

export type AddonRoutesEntry = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
};

export type ReactRouterRouteEntry =
  | {
      type: 'route';
      path: string;
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
      children?: ReactRouterRouteEntry[];
    }
  | {
      type: 'index';
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
    }
  | {
      type: 'layout';
      file: string;
      options?: {
        id?: string;
        index?: boolean;
        caseSensitive?: boolean;
      };
      children: ReactRouterRouteEntry[];
    }
  | {
      type: 'prefix';
      path: string;
      children: ReactRouterRouteEntry[];
    };

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
  utilities: UtilitiesConfig;
  experimental: ExperimentalConfig;
};

export {
  BlocksConfig,
  SettingsConfig,
  UtilitiesConfig,
  ViewsConfig,
  WidgetsConfig,
};
export * from './Blocks';
export * from './Settings';
export * from './Slots';
export * from './Utilities';
export * from './Views';
export * from './Widgets';
