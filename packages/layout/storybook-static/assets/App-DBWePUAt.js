import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { S as SlotRenderer } from "./SlotRenderer-FIE8NxhS.js";
const App = (props) => {
  const { content, location } = props;
  console.log(content);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-slot", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "header-slot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "header", content, location }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "main", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { id: "footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "footer", content, location }) })
  ] });
};
try {
  App.displayName = "App";
  App.__docgenInfo = { "description": "", "displayName": "App", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  App as A
};
