import type {
  AddonReducersConfig,
  AddonRoutesConfig,
  BlocksConfig,
  ComponentsConfig,
  ExperimentalConfig,
  SettingsConfig,
  GetSlotArgs,
  GetSlotReturn,
  SlotComponent,
  SlotPredicate,
  SlotsConfig,
  UtilitiesConfig,
  ViewsConfig,
  WidgetsConfig,
  ReactRouterRouteEntry,
  UtilityTypeMap,
  Utility,
} from '@plone/types';

export type ConfigData = {
  settings: SettingsConfig | Record<string, never>;
  blocks: BlocksConfig | Record<string, never>;
  views: ViewsConfig | Record<string, never>;
  widgets: WidgetsConfig | Record<string, never>;
  addonReducers?: AddonReducersConfig;
  addonRoutes?: AddonRoutesConfig;
  routes?: Array<ReactRouterRouteEntry>;
  slots: SlotsConfig | Record<string, never>;
  components: ComponentsConfig | Record<string, never>;
  utilities: UtilitiesConfig | Record<string, never>;
  experimental?: ExperimentalConfig;
};

type GetComponentResult = {
  component: React.ComponentType<any>;
};

type UtilityMethodFor<Type extends string> = Type extends keyof UtilityTypeMap
  ? UtilityTypeMap[Type]
  : (...args: any[]) => any;

type GetUtilityResult<Type extends string = string> = {
  method: UtilityMethodFor<Type>;
};

export type ConfigType = InstanceType<typeof Config>;

class Config {
  public _data: ConfigData | Record<string, never>;
  static instance: ConfigType;

  constructor() {
    if (!Config.instance) {
      this._data = {
        settings: {},
        blocks: {},
        views: {},
        widgets: {},
        slots: {},
        components: {},
        utilities: {},
      };
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

  get routes() {
    return this._data.routes;
  }

  set routes(routes) {
    this._data.routes = routes;
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

  get utilities() {
    return this._data.utilities;
  }

  set utilities(utilities) {
    this._data.utilities = utilities;
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

  getSlot(name: string, args: GetSlotArgs): GetSlotReturn {
    if (!this._data.slots[name]) {
      return;
    }
    const { slots, data } = this._data.slots[name];
    const slotComponents: {
      component: SlotComponent['component'];
      name: string;
    }[] = [];
    // For all enabled slots
    for (const slotName of slots) {
      // For all registered components for that slot, inversed, since the last one registered wins
      // TODO: Cover ZCA use case, where if more predicates, more specificity wins if all true.
      // Let's keep it simple here and stick to the registered order.
      let noPredicateComponent: SlotComponent | undefined;
      const reversedSlotComponents = data[slotName].slice().reverse(); // Immutable reversed copy
      for (const slotComponent of reversedSlotComponents) {
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
          slotComponents.push({
            component: slotComponent.component,
            name: slotName,
          });
          // We "reset" the marker, we already found a candidate
          noPredicateComponent = undefined;
          break;
        }
      }

      if (noPredicateComponent) {
        slotComponents.push({
          component: noPredicateComponent.component,
          name: slotName,
        });
      }
    }

    return slotComponents;
  }

  registerSlotComponent(options: {
    slot: string;
    name: string;
    predicates?: SlotPredicate[];
    component: SlotComponent['component'];
  }): void {
    const { name, component, predicates, slot } = options;

    if (!component) {
      throw new Error('No component provided');
    }
    if (!predicates) {
      const hasRegisteredNoPredicatesComponent = this._data.slots?.[
        slot
      ]?.data?.[name]?.find(({ predicates }) => !predicates);
      // If we have one already registered with the same name, and the component
      // is different, we override it.
      // During HMR operations when replacing the slot component
      // errored trying to register it again.
      if (
        hasRegisteredNoPredicatesComponent &&
        component !== hasRegisteredNoPredicatesComponent.component
      ) {
        hasRegisteredNoPredicatesComponent.component = component;
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

    const currentSlotComponents = currentSlot.data[name];
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

    currentSlotComponents.push(slotComponentData);
  }

  getSlotComponent(slot: string, name: string) {
    const currentSlot = this._data.slots[slot];
    if (!slot || !currentSlot) {
      throw new Error(`No slot ${slot} found`);
    }
    const currentSlotComponents = currentSlot.data[name];
    if (!currentSlotComponents) {
      throw new Error(`No slot component ${name} in slot ${slot} found`);
    }
    return currentSlotComponents;
  }

  getSlotComponents(slot: string) {
    const currentSlot = this._data.slots[slot];
    if (!slot || !currentSlot) {
      throw new Error(`No slot ${slot} found`);
    }
    return currentSlot.slots;
  }

  reorderSlotComponent({
    slot,
    name,
    position,
    action,
    target,
  }: {
    slot: string;
    name: string;
    position?: number;
    action?: 'after' | 'before' | 'first' | 'last';
    target?: string;
  }) {
    if (!position && !action) {
      throw new Error(`At least a position or action is required as argument`);
    }
    if (position && action) {
      throw new Error(
        `You should provide only one of position or action as arguments`,
      );
    }
    if ((action == 'after' || action == 'before') && !target) {
      throw new Error(
        `No action target set. You should provide the name of a slot component as target when action is 'after' or 'before'.`,
      );
    }

    const currentSlot = this._data.slots[slot];
    if (!slot || !currentSlot) {
      throw new Error(`No slot ${slot} found`);
    }
    const origin = currentSlot.slots.indexOf(name);
    const result = Array.from(currentSlot.slots);
    const [removed] = result.splice(origin, 1);

    if (action) {
      let targetIdx = 0;
      if (target) {
        targetIdx = currentSlot.slots.indexOf(target);
      }
      switch (action) {
        case 'after':
          if (targetIdx < origin) {
            result.splice(targetIdx + 1, 0, removed);
            break;
          } else {
            result.splice(targetIdx, 0, removed);
            break;
          }
        case 'before':
          if (targetIdx > origin) {
            result.splice(targetIdx - 1, 0, removed);
            break;
          } else {
            result.splice(targetIdx, 0, removed);
            break;
          }
        case 'last':
          result.push(removed);
          break;
        case 'first':
          result.unshift(removed);
          break;

        default:
          break;
      }
    }

    if (position) {
      result.splice(position, 0, removed);
    }

    currentSlot.slots = result;
  }

  unRegisterSlotComponent(slot: string, name: string, position: number) {
    const currentSlot = this._data.slots[slot];
    if (!slot || !currentSlot) {
      throw new Error(`No slot ${slot} found`);
    }
    const currentSlotComponents = currentSlot.data[name];
    if (!currentSlotComponents) {
      throw new Error(`No slot component ${name} in slot ${slot} found`);
    }
    const result = currentSlotComponents.slice();
    result.splice(position, 1);
    currentSlot.data[name] = result;

    if (result.length === 0) {
      // If no components left, remove the slot from the list
      const index = currentSlot.slots.indexOf(name);
      if (index > -1) {
        currentSlot.slots.splice(index, 1);
      }
    }
  }

  registerUtility<Type extends string>(options: {
    name: string;
    type: Type;
    dependencies?: Record<string, string>;
    method: UtilityMethodFor<Type>;
  }) {
    const { name, type, method, dependencies = {} } = options;
    let depsString: string = '';
    if (!method) {
      throw new Error('No method provided');
    } else {
      depsString = Object.keys(dependencies)
        .sort()
        .map((key) => `${key}:${dependencies[key]}`)
        .join('+');
    }
    const utilityName = `${depsString ? `|${depsString}` : ''}${name}`;

    let utilityType = this._data.utilities[type] as Utility<Type> | undefined;
    if (!utilityType) {
      this._data.utilities[type] = {} as Utility<Type>;
      utilityType = this._data.utilities[type] as Utility<Type>;
    }
    utilityType[utilityName] = { method };
  }

  getUtility<Type extends string>(options: {
    name: string;
    type: Type;
    dependencies?: Record<string, string>;
  }): GetUtilityResult<Type> | Record<string, never> {
    const { name, type, dependencies = {} } = options;

    if (!name || !type) return {};

    let depsString: string = '';
    depsString = Object.keys(dependencies)
      .map((key) => `${key}:${dependencies[key]}`)
      .join('+');

    const utilityName = `${depsString ? `|${depsString}` : ''}${name}`;
    const utilitiesForType = this._data.utilities[type] as
      | Utility<Type>
      | undefined;

    return utilitiesForType?.[utilityName] || {};
  }

  getUtilities<Type extends string>(options: {
    type: Type;
    dependencies?: Record<string, string>;
  }): Array<GetUtilityResult<Type>> | [] {
    const { type, dependencies = {} } = options;

    if (!type) return [];

    let depsString: string = '';
    depsString = Object.keys(dependencies)
      .map((key) => `${key}:${dependencies[key]}`)
      .join('+');

    const utilitiesForType = this._data.utilities[type] as
      | Utility<Type>
      | undefined;
    if (!utilitiesForType) return [];

    const utilityName = `${depsString ? `|${depsString}` : ''}`;
    const utilitiesKeys = Object.keys(utilitiesForType).filter((key) =>
      key.startsWith(utilityName),
    );
    const utilities = utilitiesKeys.map((key) => utilitiesForType[key]);

    return utilities;
  }

  registerRoute(options: ReactRouterRouteEntry) {
    const route = this._data.routes || [];
    route.push(options);
    this._data.routes = route;
  }
}

const instance = new Config();
Object.freeze(instance);

export default instance;
