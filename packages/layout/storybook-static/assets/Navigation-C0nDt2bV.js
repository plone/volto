import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { $ as $4f118338184dc1d9$export$a6c7ac8248d6e38a } from "./chunk-DDZFNAN4-BkXFyrin.js";
import "./index-CFtE-bf8.js";
const Navigation = (props) => {
  var _a;
  const { content } = props;
  const navItems = ((_a = content["@components"].navigation) == null ? void 0 : _a.items) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { id: "navigation", "aria-label": "navigation", className: "navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx($4f118338184dc1d9$export$a6c7ac8248d6e38a, { href: item["@id"], children: item.title }) }, item["@id"])) }) });
};
try {
  Navigation.displayName = "Navigation";
  Navigation.__docgenInfo = { "description": "", "displayName": "Navigation", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } }, "navRoot": { "defaultValue": null, "description": "", "name": "navRoot", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  Navigation as N
};
