export { SettingsConfig } from './Settings';
export { BlocksConfig } from './Blocks';

export type ExperimentalConfig = {
  [key: string]: unknown;
};
export type ViewsConfig = {};
export type WidgetsConfig = {};
export type AddonReducersConfig = {};
export type AddonRoutesConfig = {};
export type SlotsConfig = {};
export type ComponentsConfig = {
  [key: string]: { component: React.ComponentType };
};
