var _a;
var PARAM_KEY = "viewport";
var modern = { [PARAM_KEY]: { value: void 0, isRotated: false } }, legacy = { viewport: "reset", viewportRotated: false }, initialGlobals = ((_a = globalThis.FEATURES) == null ? void 0 : _a.viewportStoryGlobals) ? modern : legacy;
export {
  initialGlobals
};
