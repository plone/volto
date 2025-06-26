import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { s as src_default } from "./index-NvtfmQ2G.js";
const SlotRenderer = ({
  name,
  content,
  location,
  navRoot
}) => {
  var _a, _b;
  const slots = src_default.getSlot(name, {
    content,
    location,
    // This is to cover the use case while adding a new content and we don't have
    // the navRoot information in the initial content. This will be
    // useful for SlotRenderers rendered in the `Add` route.
    navRoot: ((_b = (_a = content == null ? void 0 : content["@components"]) == null ? void 0 : _a.navroot) == null ? void 0 : _b.navroot) || navRoot
  });
  if (!slots) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: slots.map(({ component, name: name2 }) => {
    const SlotComponent = component;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlotComponent,
      {
        content,
        location,
        navRoot
      },
      name2
    );
  }) });
};
try {
  SlotRenderer.displayName = "SlotRenderer";
  SlotRenderer.__docgenInfo = { "description": "", "displayName": "SlotRenderer", "props": { "name": { "defaultValue": null, "description": "", "name": "name", "required": true, "type": { "name": "string" } }, "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } }, "navRoot": { "defaultValue": null, "description": "", "name": "navRoot", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  SlotRenderer as S
};
