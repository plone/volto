class Registry {
  constructor() {
    if (!Registry.instance) {
      this._data = {};
      Registry.instance = this;
    }

    return Registry.instance;
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

  get slots() {
    return this._data.slots;
  }

  set slots(slots) {
    this._data.slots = slots;
  }
}

const instance = new Registry();
Object.freeze(instance);

export default instance;
