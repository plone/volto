// src/index.ts
var Config = class _Config {
  _data;
  static instance;
  constructor() {
    if (!_Config.instance) {
      this._data = {
        settings: {},
        blocks: {},
        views: {},
        widgets: {},
        slots: {},
        components: {},
        utilities: {}
      };
      _Config.instance = this;
    }
    return _Config.instance;
  }
  set(registry, item) {
    this._data[registry] = item;
  }
  get(registry) {
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
  getComponent(options) {
    if (typeof options === "object") {
      const { name, dependencies = "" } = options;
      let depsString = "";
      if (dependencies && Array.isArray(dependencies)) {
        depsString = dependencies.join("+");
      } else if (typeof dependencies === "string") {
        depsString = dependencies;
      }
      const componentName = `${name}${depsString ? `|${depsString}` : ""}`;
      return this._data.components[componentName] || {};
    } else {
      const componentName = options;
      return this._data.components[componentName] || {};
    }
  }
  registerComponent(options) {
    const { name, component, dependencies = "" } = options;
    let depsString = "";
    if (!component) {
      throw new Error("No component provided");
    } else {
      if (dependencies && Array.isArray(dependencies)) {
        depsString = dependencies.join("+");
      } else if (typeof dependencies === "string") {
        depsString = dependencies;
      }
      const componentName = `${name}${depsString ? `|${depsString}` : ""}`;
      this._data.components[componentName] = { component };
      try {
        const displayName = this._data.components[componentName].component.displayName;
        if (!displayName && typeof this._data.components[componentName].component === "function") {
          this._data.components[componentName].component.displayName = name;
        }
      } catch (error) {
        console.warn(`Not setting the component displayName because ${error}`);
      }
    }
  }
  getSlot(name, args) {
    if (!this._data.slots[name]) {
      return;
    }
    const { slots, data } = this._data.slots[name];
    const slotComponents = [];
    for (const slotName of slots) {
      let noPredicateComponent;
      const reversedSlotComponents = data[slotName].slice().reverse();
      for (const slotComponent of reversedSlotComponents) {
        let isPredicateTrueFound = false;
        if (slotComponent.predicates) {
          isPredicateTrueFound = slotComponent.predicates.every(
            (predicate) => predicate(args)
          );
        } else {
          noPredicateComponent = slotComponent;
        }
        if (isPredicateTrueFound) {
          slotComponents.push({
            component: slotComponent.component,
            name: slotName
          });
          noPredicateComponent = void 0;
          break;
        }
      }
      if (noPredicateComponent) {
        slotComponents.push({
          component: noPredicateComponent.component,
          name: slotName
        });
      }
    }
    return slotComponents;
  }
  registerSlotComponent(options) {
    const { name, component, predicates, slot } = options;
    if (!component) {
      throw new Error("No component provided");
    }
    if (!predicates) {
      const hasRegisteredNoPredicatesComponent = this._data.slots?.[slot]?.data?.[name]?.find(({ predicates: predicates2 }) => !predicates2);
      if (hasRegisteredNoPredicatesComponent && component !== hasRegisteredNoPredicatesComponent.component) {
        throw new Error(
          `There is already registered a component ${name} for the slot ${slot}. You can only register one slot component with no predicates per slot.`
        );
      }
    }
    let currentSlot = this._data.slots[slot];
    if (!currentSlot) {
      this._data.slots[slot] = {
        slots: [],
        data: {}
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
      predicates
    };
    try {
      const displayName = slotComponentData.component.displayName;
      if (!displayName && typeof slotComponentData?.component === "function") {
        slotComponentData.component.displayName = name;
      }
    } catch (error) {
      console.warn(
        `Not setting the slot component displayName because ${error}`
      );
    }
    currentSlotComponents.push(slotComponentData);
  }
  getSlotComponent(slot, name) {
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
  getSlotComponents(slot) {
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
    target
  }) {
    if (!position && !action) {
      throw new Error(`At least a position or action is required as argument`);
    }
    if (position && action) {
      throw new Error(
        `You should provide only one of position or action as arguments`
      );
    }
    if ((action == "after" || action == "before") && !target) {
      throw new Error(
        `No action target set. You should provide the name of a slot component as target when action is 'after' or 'before'.`
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
        case "after":
          if (targetIdx < origin) {
            result.splice(targetIdx + 1, 0, removed);
            break;
          } else {
            result.splice(targetIdx, 0, removed);
            break;
          }
        case "before":
          if (targetIdx > origin) {
            result.splice(targetIdx - 1, 0, removed);
            break;
          } else {
            result.splice(targetIdx, 0, removed);
            break;
          }
        case "last":
          result.push(removed);
          break;
        case "first":
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
  unRegisterSlotComponent(slot, name, position) {
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
  registerUtility(options) {
    const { name, type, method, dependencies = {} } = options;
    let depsString = "";
    if (!method) {
      throw new Error("No method provided");
    } else {
      depsString = Object.keys(dependencies).sort().map((key) => `${key}:${dependencies[key]}`).join("+");
    }
    const utilityName = `${depsString ? `|${depsString}` : ""}${name}`;
    let utilityType = this._data.utilities[type];
    if (!utilityType) {
      this._data.utilities[type] = {};
      utilityType = this._data.utilities[type];
    }
    utilityType[utilityName] = { method };
  }
  getUtility(options) {
    const { name, type, dependencies = {} } = options;
    let depsString = "";
    depsString = Object.keys(dependencies).map((key) => `${key}:${dependencies[key]}`).join("+");
    const utilityName = `${depsString ? `|${depsString}` : ""}${name}`;
    return this._data.utilities[type][utilityName] || {};
  }
  getUtilities(options) {
    const { type, dependencies = {} } = options;
    let depsString = "";
    depsString = Object.keys(dependencies).map((key) => `${key}:${dependencies[key]}`).join("+");
    const utilityName = `${depsString ? `|${depsString}` : ""}`;
    const utilitiesKeys = Object.keys(this._data.utilities[type] || {}).filter(
      (key) => key.startsWith(utilityName)
    );
    const utilities = utilitiesKeys.map(
      (key) => this._data.utilities[type][key]
    );
    return utilities;
  }
  registerRoute(options) {
    const route = this._data.routes || [];
    route.push(options);
    this._data.routes = route;
  }
};
var instance = new Config();
Object.freeze(instance);
var src_default = instance;
export {
  src_default as default
};
