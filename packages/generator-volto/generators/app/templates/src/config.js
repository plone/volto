/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */

// Start old import based configuration - It will be deprecated in upcoming Volto releases
// Use applyConfig function (at the bottom of this module) instead
import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
  addonReducers as defaultAddonReducers,
  addonRoutes as defaultAddonRoutes,
} from '@plone/volto/config';

export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
};

export const widgets = {
  ...defaultWidgets,
};

export const blocks = {
  ...defaultBlocks,
};

export const addonRoutes = [...defaultAddonRoutes];
export const addonReducers = { ...defaultAddonReducers };
// End old import based configuration

// Configuration Registry based setup
export default function applyConfig(config) {
  // Add your project's configuration here by modifying `config` accordingly
  return config;
}
