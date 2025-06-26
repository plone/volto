var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { L as Logo } from "./Logo-DSr7yn3I.js";
import "./chunk-DDZFNAN4-BkXFyrin.js";
import "./index-CFtE-bf8.js";
import "./index-d0xbMisk.js";
import "./index-NvtfmQ2G.js";
const meta = {
  title: "Logo",
  component: Logo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};
const Default = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { ...args }),
  args: {
    content: {
      "@id": "http://localhost:3000/Plone",
      title: "Plone site",
      description: "Welcome to Plone",
      items: [],
      "@components": {
        navroot: {
          // @ts-expect-error This is a test object, missing all content properties
          navroot: {
            "@id": "http://localhost:3000/Plone",
            title: "Plone site"
          }
        },
        site: {
          "plone.site_title": "Plone site"
        }
      }
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  render: (args: any) => <Logo {...args} />,\n  args: {\n    content: {\n      '@id': 'http://localhost:3000/Plone',\n      title: 'Plone site',\n      description: 'Welcome to Plone',\n      items: [],\n      '@components': {\n        navroot: {\n          // @ts-expect-error This is a test object, missing all content properties\n          navroot: {\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Plone site'\n          }\n        },\n        site: {\n          'plone.site_title': 'Plone site'\n        }\n      }\n    }\n  }\n}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
