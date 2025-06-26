var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { H as Header } from "./Header-DWs9IDPp.js";
import "./SlotRenderer-FIE8NxhS.js";
import "./index-NvtfmQ2G.js";
import "./chunk-DDZFNAN4-BkXFyrin.js";
import "./index-CFtE-bf8.js";
import "./index-d0xbMisk.js";
const meta = {
  title: "Header",
  component: Header,
  tags: ["autodocs"]
};
const Default = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { ...args }),
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
            title: "Home"
          }, {
            "@id": "http://localhost:3000/Plone/news",
            title: "News"
          }, {
            "@id": "http://localhost:3000/Plone/about",
            title: "About"
          }]
        },
        navroot: {
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
      originalSource: "{\n  render: (args: any) => <Header {...args} />,\n  args: {\n    content: {\n      '@id': 'http://localhost:3000/Plone',\n      title: 'Plone site',\n      description: 'Welcome to Plone',\n      items: [],\n      '@components': {\n        navigation: {\n          items: [{\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Home'\n          }, {\n            '@id': 'http://localhost:3000/Plone/news',\n            title: 'News'\n          }, {\n            '@id': 'http://localhost:3000/Plone/about',\n            title: 'About'\n          }]\n        },\n        navroot: {\n          navroot: {\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Plone site'\n          }\n        },\n        site: {\n          'plone.site_title': 'Plone site'\n        }\n      }\n    }\n  }\n}",
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
