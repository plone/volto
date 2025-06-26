let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const { ImplicitActionsDuringRendering } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var ADDON_ID = "storybook/actions", EVENT_ID = `${ADDON_ID}/action-event`;
var config = { depth: 10, clearOnStoryChange: true, limit: 50 };
var findProto = (obj, callback) => {
  let proto = Object.getPrototypeOf(obj);
  return !proto || callback(proto) ? proto : findProto(proto, callback);
}, isReactSyntheticEvent = (e) => !!(typeof e == "object" && e && findProto(e, (proto) => /^Synthetic(?:Base)?Event$/.test(proto.constructor.name)) && typeof e.persist == "function"), serializeArg = (a) => {
  if (isReactSyntheticEvent(a)) {
    let e = Object.create(a.constructor.prototype, Object.getOwnPropertyDescriptors(a));
    e.persist();
    let viewDescriptor = Object.getOwnPropertyDescriptor(e, "view"), view = viewDescriptor == null ? void 0 : viewDescriptor.value;
    return typeof view == "object" && (view == null ? void 0 : view.constructor.name) === "Window" && Object.defineProperty(e, "view", { ...viewDescriptor, value: Object.create(view.constructor.prototype) }), e;
  }
  return a;
}, generateId = () => typeof crypto == "object" && typeof crypto.getRandomValues == "function" ? v4() : Date.now().toString(36) + Math.random().toString(36).substring(2);
function action(name, options = {}) {
  let actionOptions = { ...config, ...options }, handler = function(...args) {
    var _a, _b;
    if (options.implicit) {
      let storyRenderer = (_a = "__STORYBOOK_PREVIEW__" in global ? global.__STORYBOOK_PREVIEW__ : void 0) == null ? void 0 : _a.storyRenders.find((render) => render.phase === "playing" || render.phase === "rendering");
      if (storyRenderer) {
        let deprecated = !((_b = globalThis == null ? void 0 : globalThis.FEATURES) == null ? void 0 : _b.disallowImplicitActionsInRenderV8), error = new ImplicitActionsDuringRendering({ phase: storyRenderer.phase, name, deprecated });
        if (deprecated) console.warn(error);
        else throw error;
      }
    }
    let channel = addons.getChannel(), id = generateId(), minDepth = 5, serializedArgs = args.map(serializeArg), normalizedArgs = args.length > 1 ? serializedArgs : serializedArgs[0], actionDisplayToEmit = { id, count: 0, data: { name, args: normalizedArgs }, options: { ...actionOptions, maxDepth: minDepth + (actionOptions.depth || 3), allowFunction: actionOptions.allowFunction || false } };
    channel.emit(EVENT_ID, actionDisplayToEmit);
  };
  return handler.isAction = true, handler.implicit = options.implicit, handler;
}
var isInInitialArgs = (name, initialArgs) => typeof initialArgs[name] > "u" && !(name in initialArgs), inferActionsFromArgTypesRegex = (context) => {
  let { initialArgs, argTypes, id, parameters: { actions } } = context;
  if (!actions || actions.disable || !actions.argTypesRegex || !argTypes) return {};
  let argTypesRegex = new RegExp(actions.argTypesRegex);
  return Object.entries(argTypes).filter(([name]) => !!argTypesRegex.test(name)).reduce((acc, [name, argType]) => (isInInitialArgs(name, initialArgs) && (acc[name] = action(name, { implicit: true, id })), acc), {});
}, addActionsFromArgTypes = (context) => {
  let { initialArgs, argTypes, parameters: { actions } } = context;
  return (actions == null ? void 0 : actions.disable) || !argTypes ? {} : Object.entries(argTypes).filter(([name, argType]) => !!argType.action).reduce((acc, [name, argType]) => (isInInitialArgs(name, initialArgs) && (acc[name] = action(typeof argType.action == "string" ? argType.action : name)), acc), {});
};
var argsEnhancers = [addActionsFromArgTypes, inferActionsFromArgTypesRegex];
var subscribed = false, logActionsWhenMockCalled = (context) => {
  let { parameters: { actions } } = context;
  if (!(actions == null ? void 0 : actions.disable) && !subscribed && "__STORYBOOK_TEST_ON_MOCK_CALL__" in global && typeof global.__STORYBOOK_TEST_ON_MOCK_CALL__ == "function") {
    let onMockCall = global.__STORYBOOK_TEST_ON_MOCK_CALL__;
    onMockCall((mock, args) => {
      let name = mock.getMockName();
      name !== "spy" && (!/^next\/.*::/.test(name) || ["next/router::useRouter()", "next/navigation::useRouter()", "next/navigation::redirect", "next/cache::", "next/headers::cookies().set", "next/headers::cookies().delete", "next/headers::headers().set", "next/headers::headers().delete"].some((prefix) => name.startsWith(prefix))) && action(name)(args);
    }), subscribed = true;
  }
}, loaders = [logActionsWhenMockCalled];
export {
  argsEnhancers,
  loaders
};
