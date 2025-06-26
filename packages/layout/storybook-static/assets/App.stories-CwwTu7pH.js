var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { A as App } from "./App-DBWePUAt.js";
import "./SlotRenderer-FIE8NxhS.js";
import "./index-NvtfmQ2G.js";
const storyData = {
  blocks: {
    "7ab29abe-b38c-406b-94d7-b270e544a998": {
      "@type": "slate",
      value: [
        {
          type: "p",
          children: [
            {
              text: "Lorem ipsum dolor sit amet eu tempus ornare elit. Curabitur egestas quisque molestie pellentesque nunc imperdiet posuere morbi nunc eleifend. Volutpat enim augue blandit aliquam interdum pulvinar eu mattis congue. Eleifend mauris ut fermentum egestas mi faucibus adipiscing arcu nibh scelerisque justo habitasse. Mi consectetur hac maecenas leo dictumst vitae phasellus quam praesent vivamus nullam imperdiet integer mauris."
            }
          ]
        }
      ],
      plaintext: "Lorem ipsum dolor sit amet eu tempus ornare elit. Curabitur egestas quisque molestie pellentesque nunc imperdiet posuere morbi nunc eleifend. Volutpat enim augue blandit aliquam interdum pulvinar eu mattis congue. Eleifend mauris ut fermentum egestas mi faucibus adipiscing arcu nibh scelerisque justo habitasse. Mi consectetur hac maecenas leo dictumst vitae phasellus quam praesent vivamus nullam imperdiet integer mauris."
    }
  },
  blocks_layout: {
    items: ["7ab29abe-b38c-406b-94d7-b270e544a998"]
  }
};
const meta = {
  title: "App",
  component: App
};
const Default = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(App, { ...args }),
  args: {
    location: {
      search: "",
      pathname: "/",
      hash: "",
      state: null,
      key: "default"
    },
    content: {
      "@id": "http://localhost:3000/Plone",
      title: "Plone site",
      description: "Welcome to Plone",
      items: [],
      blocks: {
        ...storyData.blocks
      },
      blocks_layout: {
        ...storyData.blocks_layout
      },
      "@components": {
        breadcrumbs: {
          "@id": "http://localhost:3000/Plone",
          root: "http://localhost:3000/Plone",
          items: [{
            "@id": "http://localhost:3000/Plone",
            title: "Home"
          }]
        },
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
      originalSource: "{\n  render: (args: any) => <App {...args} />,\n  args: {\n    location: {\n      search: '',\n      pathname: '/',\n      hash: '',\n      state: null,\n      key: 'default'\n    },\n    content: {\n      '@id': 'http://localhost:3000/Plone',\n      title: 'Plone site',\n      description: 'Welcome to Plone',\n      items: [],\n      blocks: {\n        ...storyData.blocks\n      },\n      blocks_layout: {\n        ...storyData.blocks_layout\n      },\n      '@components': {\n        breadcrumbs: {\n          '@id': 'http://localhost:3000/Plone',\n          root: 'http://localhost:3000/Plone',\n          items: [{\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Home'\n          }]\n        },\n        navigation: {\n          items: [{\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Home'\n          }, {\n            '@id': 'http://localhost:3000/Plone/news',\n            title: 'News'\n          }, {\n            '@id': 'http://localhost:3000/Plone/about',\n            title: 'About'\n          }]\n        },\n        navroot: {\n          navroot: {\n            '@id': 'http://localhost:3000/Plone',\n            title: 'Plone site'\n          }\n        },\n        site: {\n          'plone.site_title': 'Plone site'\n        }\n      }\n    }\n  }\n}",
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
