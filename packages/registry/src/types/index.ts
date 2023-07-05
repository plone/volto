export { SettingsConfig } from './Settings';
export { BlocksConfig } from './Blocks';
export { ViewsConfig } from './Views';
export { WidgetsConfig } from './Widgets';

export type AddonReducersConfig = {
  [key: string]: Function;
};

export type AddonRoutesConfig = {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}[];

export type SlotsConfig = {
  [key: string]: unknown;
};

export type ComponentsConfig = {
  [key: string]: { component: React.ComponentType };
};

export type ExperimentalConfig = {
  [key: string]: unknown;
};
