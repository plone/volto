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
  utilities: UtilitiesConfig;
  experimental: ExperimentalConfig;
};

type GetComponentResult = {
  component: React.ComponentType<any>;
};

type GetUtilityResult = {
  method: (...args: any[]) => any;
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
    const slotComponents = [];
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
      // Test if there's already one registered, we only support one
      const hasRegisteredNoPredicatesComponent = this._data.slots?.[
        slot
      ]?.data?.[name]?.find(({ predicates }) => !predicates);
      if (
        hasRegisteredNoPredicatesComponent &&
        component !== hasRegisteredNoPredicatesComponent.component
      ) {
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
    currentSlot.data[name] = result.splice(position, 1);
  }

  registerUtility(options: {
    name: string;
    type: string;
    dependencies?: Record<string, string>;
    method: (args: any) => any;
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

    let utilityType = this._data.utilities[type];
    if (!utilityType) {
      this._data.utilities[type] = {};
      utilityType = this._data.utilities[type];
    }
    utilityType[utilityName] = { method };
  }

  getUtility(options: {
    name: string;
    type: string;
    dependencies?: Record<string, string>;
  }): GetUtilityResult {
    const { name, type, dependencies = {} } = options;
    let depsString: string = '';
    depsString = Object.keys(dependencies)
      .map((key) => `${key}:${dependencies[key]}`)
      .join('+');

    const utilityName = `${depsString ? `|${depsString}` : ''}${name}`;

    return this._data.utilities[type][utilityName] || {};
  }

  getUtilities(options: {
    type: string;
    dependencies?: Record<string, string>;
  }): Array<GetUtilityResult> {
    const { type, dependencies = {} } = options;
    let depsString: string = '';
    depsString = Object.keys(dependencies)
      .map((key) => `${key}:${dependencies[key]}`)
      .join('+');

    const utilityName = `${depsString ? `|${depsString}` : ''}`;
    const utilitiesKeys = Object.keys(this._data.utilities[type]).filter(
      (key) => key.startsWith(utilityName),
    );
    const utilities = utilitiesKeys.map(
      (key) => this._data.utilities[type][key],
    );

    return utilities;
  }
}

const instance = new Config();
Object.freeze(instance);

export default instance;
