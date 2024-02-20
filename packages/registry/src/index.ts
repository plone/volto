import type {
  AddonReducersConfig,
  AddonRoutesConfig,
  BlocksConfig,
  ComponentsConfig,
  ExperimentalConfig,
  SettingsConfig,
  SlotComponent,
  SlotsConfig,
  ViewsConfig,
  WidgetsConfig,
} from '@plone/types';

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

type GetComponentResult = {
  component: React.ComponentType;
};

export type ConfigType = InstanceType<typeof Config>;

class Config {
  public _data: ConfigData | Record<string, never>;
  static instance: ConfigType;

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
    options: { name: string; dependencies?: string[] | string } | string,
  ): GetComponentResult {
    if (typeof options === 'object') {
      const { name, dependencies = '' } = options;
      let depsString: string = '';
      if (dependencies && Array.isArray(dependencies)) {
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
    dependencies?: string[] | string;
    component: React.ComponentType;
  }) {
    const { name, component, dependencies = '' } = options;
    let depsString: string = '';
    if (!component) {
      throw new Error('No component provided');
    } else {
      if (dependencies && Array.isArray(dependencies)) {
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

  getSlot<T>(name: string, args: T): SlotComponent['component'][] | undefined {
    const { slots, data } = this._data.slots[name];
    const slotComponents = [];
    // For all enabled slots
    for (const slotName of slots) {
      // For all registered components for that slot, inversed, since the last one registered wins
      // TODO: Cover ZCA use case, where if more predicates, more specificity wins if all true.
      // Let's keep it simple here and stick to the registered order.
      let noPredicateComponent: SlotComponent | undefined;
      for (const slotComponent of data[slotName].toReversed()) {
        let isPredicateTrueFound: boolean = false;
        if (slotComponent.predicates) {
          isPredicateTrueFound = slotComponent.predicates.every((predicate) =>
            predicate(args),
          );
        } else {
          // We mark the one with no predicates
          noPredicateComponent = slotComponent;
        }

        // If all the predicates are truthy
        if (isPredicateTrueFound) {
          slotComponents.push(slotComponent.component);
          // We "reset" the marker, we already found a candidate
          noPredicateComponent = undefined;
          break;
        }
      }

      if (noPredicateComponent) {
        slotComponents.push(noPredicateComponent.component);
      }
    }

    return slotComponents;
  }

  registerSlotComponent(options: {
    slot: string;
    name: string;
    predicates?: ((...args: unknown[]) => boolean)[];
    component: React.ComponentType;
  }) {
    const { name, component, predicates, slot } = options;

    if (!component) {
      throw new Error('No component provided');
    }
    if (!predicates) {
      // Test if there's already one registered, we only support one
      const hasRegisteredNoPredicatesComponent = this._data.slots?.[
        slot
      ]?.data?.[name]?.find(({ predicates }) => !predicates);
      console.log(hasRegisteredNoPredicatesComponent);
      if (hasRegisteredNoPredicatesComponent) {
        throw new Error(
          `There is already registered a component ${name} for the slot ${slot}. You can only register one slot component with no predicates per slot.`,
        );
      }
    }

    let currentSlot = this._data.slots[slot];
    if (!currentSlot) {
      this._data.slots[slot] = {
        slots: [],
        data: {},
      };
      currentSlot = this._data.slots[slot];
    }
    if (!currentSlot.data[name]) {
      currentSlot.data[name] = [];
    }

    const currentSlotComponent = currentSlot.data[name];
    if (!currentSlot.slots.includes(name)) {
      currentSlot.slots.push(name);
    }
    const slotComponentData = {
      component,
      predicates,
    };

    // Try to set a displayName (useful for React dev tools) for the registered component
    // Only if it's a function and it's not set previously
    try {
      const displayName = slotComponentData.component.displayName;

      if (!displayName && typeof slotComponentData?.component === 'function') {
        slotComponentData.component.displayName = name;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        `Not setting the slot component displayName because ${error}`,
      );
    }

    currentSlotComponent.push(slotComponentData);
  }
}

const instance = new Config();
Object.freeze(instance);

export default instance;
