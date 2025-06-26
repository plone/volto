var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
var Config = (_a = class {
  constructor() {
    __publicField(this, "_data");
    if (!_a.instance) {
      this._data = {
        settings: {},
        blocks: {},
        views: {},
        widgets: {},
        slots: {},
        components: {},
        utilities: {}
      };
      _a.instance = this;
    }
    return _a.instance;
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
    var _a2, _b, _c, _d;
    const { name, component, predicates, slot } = options;
    if (!component) {
      throw new Error("No component provided");
    }
    if (!predicates) {
      const hasRegisteredNoPredicatesComponent = (_d = (_c = (_b = (_a2 = this._data.slots) == null ? void 0 : _a2[slot]) == null ? void 0 : _b.data) == null ? void 0 : _c[name]) == null ? void 0 : _d.find(({ predicates: predicates2 }) => !predicates2);
      if (hasRegisteredNoPredicatesComponent && component !== hasRegisteredNoPredicatesComponent.component) {
        hasRegisteredNoPredicatesComponent.component = component;
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
      if (!displayName && typeof (slotComponentData == null ? void 0 : slotComponentData.component) === "function") {
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
    result.splice(position, 1);
    currentSlot.data[name] = result;
    if (result.length === 0) {
      const index = currentSlot.slots.indexOf(name);
      if (index > -1) {
        currentSlot.slots.splice(index, 1);
      }
    }
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
    if (!name || !type) return {};
    let depsString = "";
    depsString = Object.keys(dependencies).map((key) => `${key}:${dependencies[key]}`).join("+");
    const utilityName = `${depsString ? `|${depsString}` : ""}${name}`;
    return this._data.utilities[type][utilityName] || {};
  }
  getUtilities(options) {
    const { type, dependencies = {} } = options;
    if (!type) return [];
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
  /**
   * Registers a widget configuration into the registry.
   *
   * @template K - A key from the WidgetsConfig interface.
   * @param options - An object containing the widget key and its corresponding implementation.
   * @param options.key - The name of the widget configuration key (e.g., 'default', 'factory').
   * @param options.definition - The actual widget configuration, which must match the expected structure of WidgetsConfig[K].
   *
   */
  registerWidget(options) {
    const { key, definition } = options;
    const widgets = {
      ...this.widgets ?? {},
      [key]: definition
    };
    this._data.widgets = widgets;
  }
  /**
   * Gets a widget configuration from the registry.
   *
   * @param key - A key from the WidgetsConfig interface.
   */
  getWidget(key) {
    const widgets = this.widgets;
    for (const category of Object.keys(widgets)) {
      const group = widgets[category];
      if (typeof group === "object" && key in group) {
        return group[key];
      }
    }
    return void 0;
  }
}, __publicField(_a, "instance"), _a);
var instance = new Config();
Object.freeze(instance);
var src_default = instance;
export {
  src_default as s
};
