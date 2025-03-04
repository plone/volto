export type { SettingsConfig } from './Settings';
export type { BlocksConfig } from './Blocks';
export type { ViewsConfig } from './Views';
export type { WidgetsConfig } from './Widgets';

export type AddonReducersConfig = Record<string, Function>;

export type AddonRoutesConfig = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}[];

export type SlotsConfig = Record<string, unknown>;

export type ComponentsConfig = Record<
  string,
  { component: React.ComponentType }
>;

export type ExperimentalConfig = Record<string, unknown>;
