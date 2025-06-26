var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { N as Navigation } from "./Navigation-C0nDt2bV.js";
import "./chunk-DDZFNAN4-BkXFyrin.js";
import "./index-CFtE-bf8.js";
import "./index-d0xbMisk.js";
const meta = {
  title: "Navigation",
  component: Navigation,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};
const Default = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { ...args }),
  args: {
    content: {
      "@id": "http://localhost:3000/Plone",
      title: "Plone site",
      description: "Welcome to Plone",
      items: [],
      "@components": {
        navigation: {
          items: [{
            "@id": "http://localhost:3000/Plone",
            title: "Plone site"
          }, {
            "@id": "http://localhost:3000/Plone/news",
            title: "News"
          }, {
            "@id": "http://localhost:3000/Plone/about",
            title: "About"
          }]
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
      originalSource: "{\n  render: (args: any) => <Navigation {...args} />,\n  args: {\n    content: {\n      '@id': 'http://localhost:3000/Plone',\n      title: 'Plone site',\n      description: 'Welcome to Plone',\n      items: [],\n      '@components': {\n        navigation: {\n          items: [{\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Plone site'\n          }, {\n            '@id': 'http://localhost:3000/Plone/news',\n            title: 'News'\n          }, {\n            '@id': 'http://localhost:3000/Plone/about',\n            title: 'About'\n          }]\n        }\n      }\n    }\n  }\n}",
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
