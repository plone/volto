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
}

const instance = new Registry();
Object.freeze(instance);

export default instance;
