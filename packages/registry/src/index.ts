import { isArray } from 'lodash';
import type * as configTypes from '@plone/types/config';

type ConfigData = {
  settings: configTypes.SettingsConfig;
  blocks: configTypes.BlocksConfig;
  views: configTypes.ViewsConfig;
  widgets: configTypes.WidgetsConfig;
  addonReducers: configTypes.AddonReducersConfig;
  addonRoutes: configTypes.AddonRoutesConfig;
  slots: configTypes.SlotsConfig;
  components: configTypes.ComponentsConfig;
  experimental: configTypes.ExperimentalConfig;
};

type GetComponentResult = {
  component: React.ComponentType;
};

class Config {
  public _data: ConfigData | Record<string, never>;
  static instance: InstanceType<typeof Config>;

  constructor() {
    if (!Config.instance) {
      this._data = {};
      Config.instance = this;
    }

    return Config.instance;
  }

  set<RegistryKey extends keyof ConfigData>(
    registry: RegistryKey,
    item: ConfigData[RegistryKey],
  ) {
    this._data[registry] = item;
  }

  get(registry: keyof ConfigData) {
    return this._data[registry];
  }

  get settings() {
    return this._data.settings;
  }

  set settings(settings) {
    this._data.settings = settings;
  }

  get experimental() {
    return this._data.experimental;
  }

  set experimental(experimental) {
    this._data.experimental = experimental;
  }

  get blocks() {
    return this._data.blocks;
  }

  set blocks(blocks) {
    this._data.blocks = blocks;
  }

  get views() {
    return this._data.views;
  }

  set views(views) {
    this._data.views = views;
  }

  get widgets() {
    return this._data.widgets;
  }

  set widgets(widgets) {
    this._data.widgets = widgets;
  }

  get addonReducers() {
    return this._data.addonReducers;
  }

  set addonReducers(addonReducers) {
    this._data.addonReducers = addonReducers;
  }

  get addonRoutes() {
    return this._data.addonRoutes;
  }

  set addonRoutes(addonRoutes) {
    this._data.addonRoutes = addonRoutes;
  }

  get slots() {
    return this._data.slots;
  }

  set slots(slots) {
    this._data.slots = slots;
  }

  get components() {
    return this._data.components;
  }

  set components(components) {
    this._data.components = components;
  }

  getComponent(
    options: { name: string; dependencies: string[] | string } | string,
  ): GetComponentResult {
    if (typeof options === 'object') {
      const { name, dependencies = '' } = options;
      let depsString: string = '';
      if (dependencies && isArray(dependencies)) {
        depsString = dependencies.join('+');
      } else if (typeof dependencies === 'string') {
        depsString = dependencies;
      }
      const componentName = `${name}${depsString ? `|${depsString}` : ''}`;

      return this._data.components[componentName] || {};
    } else {
      // Shortcut notation, accepting a lonely string as argument
      const componentName = options;
      return this._data.components[componentName] || {};
    }
  }

  registerComponent(options: {
    name: string;
    dependencies: string[] | string;
    component: React.ComponentType;
  }) {
    const { name, component, dependencies = '' } = options;
    let depsString: string = '';
    if (!component) {
      throw new Error('No component provided');
    } else {
      if (dependencies && isArray(dependencies)) {
        depsString = dependencies.join('+');
      } else if (typeof dependencies === 'string') {
        depsString = dependencies;
      }
      const componentName = `${name}${depsString ? `|${depsString}` : ''}`;

      this._data.components[componentName] = { component };
      // Try to set a displayName (useful for React dev tools) for the registered component
      // Only if it's a function and it's not set previously
      try {
        const displayName =
          this._data.components[componentName].component.displayName;

        if (
          !displayName &&
          typeof this._data.components[componentName].component === 'function'
        ) {
          this._data.components[componentName].component.displayName = name;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Not setting the component displayName because ${error}`);
      }
    }
  }
}

const instance = new Config();
Object.freeze(instance);

export default instance;
