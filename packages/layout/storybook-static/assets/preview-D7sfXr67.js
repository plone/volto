import { s as src_default } from "./index-NvtfmQ2G.js";
import { A as App } from "./App-DBWePUAt.js";
import { C as Container, B as Breadcrumbs$1, a as Breadcrumb, H as Header, L as Link } from "./Header-DWs9IDPp.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { S as SlotRenderer } from "./SlotRenderer-FIE8NxhS.js";
import { L as Logo } from "./Logo-DSr7yn3I.js";
import { N as Navigation } from "./Navigation-C0nDt2bV.js";
import { $ as $4f118338184dc1d9$export$a6c7ac8248d6e38a, c as clsx, H as HomeIcon } from "./chunk-DDZFNAN4-BkXFyrin.js";
import { r as reactExports } from "./index-CFtE-bf8.js";
import "./index-d0xbMisk.js";
const Main = (props) => {
  const { content, location } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { className: "content-area", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "aboveContent", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "contentArea", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "belowContent", content, location })
  ] });
};
try {
  Main.displayName = "Main";
  Main.__docgenInfo = { "description": "", "displayName": "Main", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const Footer$1 = (props) => {
  const { content, location } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "preFooter", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "mainFooter", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "postFooter", content, location })
  ] });
};
try {
  Footer$1.displayName = "Footer";
  Footer$1.__docgenInfo = { "description": "", "displayName": "Footer", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const HeaderTools = () => {
  const links = [
    {
      id: "3",
      label: "edit",
      icon: "🛠️",
      url: "/edit"
    },
    {
      id: "1",
      label: "login",
      icon: "🔧",
      url: "/login"
    },
    {
      id: "2",
      label: "logout",
      icon: "🔨",
      url: "/logout"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: links.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs($4f118338184dc1d9$export$a6c7ac8248d6e38a, { href: tool.url, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tool.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tool.label })
  ] }, tool.id)) });
};
function hasBlocksData(content) {
  return Object.keys(content).find(
    (key) => key !== "volto.blocks" && key.endsWith("blocks")
  ) !== void 0;
}
const DefaultBlockView = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "This block has no view assigned" });
};
const BlockWrapper = (props) => {
  var _a, _b;
  const { block, blocksConfig: blocksConfig2, children, content } = props;
  const data = (_a = content.blocks) == null ? void 0 : _a[block];
  const category = (_b = blocksConfig2 == null ? void 0 : blocksConfig2[data["@type"]]) == null ? void 0 : _b.category;
  const classNames = void 0;
  const style = void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: clsx(
        `block-${data["@type"]}`,
        { [`category-${category}`]: category },
        classNames
      ),
      style,
      children
    }
  );
};
try {
  BlockWrapper.displayName = "BlockWrapper";
  BlockWrapper.__docgenInfo = { "description": "", "displayName": "BlockWrapper", "props": { "content": { "defaultValue": null, "description": "Plone content object", "name": "content", "required": true, "type": { "name": "Content" } }, "blocksConfig": { "defaultValue": null, "description": "Current blocks configuration object\nFrom the registry or local to this instance (eg. in a blocks in block container)", "name": "blocksConfig", "required": true, "type": { "name": "BlocksConfigData" } }, "as": { "defaultValue": null, "description": "Wrap the blocks in an enclosing tag\nFrom the registry or local to this instance (eg. in a blocks in block container)", "name": "as", "required": false, "type": { "name": "ElementType<any, keyof IntrinsicElements>" } }, "pathname": { "defaultValue": null, "description": "Router location object", "name": "pathname", "required": true, "type": { "name": "string" } }, "metadata": { "defaultValue": null, "description": "Metadata object\nIn case of the blocks in block container use case, it's the metadata (content data)\nfrom the parent container, passed down to the contained blocks", "name": "metadata", "required": false, "type": { "name": "Content" } }, "block": { "defaultValue": null, "description": "", "name": "block", "required": true, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const RenderBlocks = (props) => {
  const { blocksConfig: blocksConfig2, content, pathname, metadata } = props;
  const CustomTag = props.as || reactExports.Fragment;
  return hasBlocksData(content) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTag, { children: content.blocks_layout.items.map((block) => {
    var _a, _b;
    const blockData = (_a = content.blocks) == null ? void 0 : _a[block];
    const blockType = blockData == null ? void 0 : blockData["@type"];
    const Block = ((_b = blocksConfig2[blockType]) == null ? void 0 : _b.view) || DefaultBlockView;
    return Block ? /* @__PURE__ */ jsxRuntimeExports.jsx(BlockWrapper, { ...props, block, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Block,
      {
        id: block,
        metadata,
        properties: content,
        data: blockData,
        path: pathname || "",
        blocksConfig: blocksConfig2
      },
      block
    ) }, block) : blockData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Unknown block found: ",
      blockType
    ] }, block) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Invalid Block" }, block);
  }) }) : "";
};
try {
  RenderBlocks.displayName = "RenderBlocks";
  RenderBlocks.__docgenInfo = { "description": "", "displayName": "RenderBlocks", "props": { "content": { "defaultValue": null, "description": "Plone content object", "name": "content", "required": true, "type": { "name": "Content" } }, "blocksConfig": { "defaultValue": null, "description": "Current blocks configuration object\nFrom the registry or local to this instance (eg. in a blocks in block container)", "name": "blocksConfig", "required": true, "type": { "name": "BlocksConfigData" } }, "as": { "defaultValue": null, "description": "Wrap the blocks in an enclosing tag\nFrom the registry or local to this instance (eg. in a blocks in block container)", "name": "as", "required": false, "type": { "name": "ElementType<any, keyof IntrinsicElements>" } }, "pathname": { "defaultValue": null, "description": "Router location object", "name": "pathname", "required": true, "type": { "name": "string" } }, "metadata": { "defaultValue": null, "description": "Metadata object\nIn case of the blocks in block container use case, it's the metadata (content data)\nfrom the parent container, passed down to the contained blocks", "name": "metadata", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const ContentArea = (props) => {
  const { content } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    RenderBlocks,
    {
      content,
      blocksConfig: src_default.blocks.blocksConfig,
      pathname: "/"
    }
  ) });
};
try {
  ContentArea.displayName = "ContentArea";
  ContentArea.__docgenInfo = { "description": "", "displayName": "ContentArea", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } }, "navRoot": { "defaultValue": null, "description": "", "name": "navRoot", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const Footer = (props) => {
  var _a, _b;
  const { content, location } = props;
  const siteActions = ((_b = (_a = content == null ? void 0 : content["@components"]) == null ? void 0 : _a.actions) == null ? void 0 : _b.site_actions) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { width: "layout", className: "footer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-message", children: [
      "The Plone® Open Source CMS/WCM is © 2000-2024 by the Plone Foundation and friends. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Distributed under the GNU GPL license."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: (siteActions == null ? void 0 : siteActions.length) ? siteActions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx($4f118338184dc1d9$export$a6c7ac8248d6e38a, { className: "item", href: item.url, children: item == null ? void 0 : item.title }) }, item.id)) : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "item powered-by", href: "https://plone.org", children: "Powered by Plone & Python" })
  ] });
};
try {
  MainFooter.displayName = "MainFooter";
  MainFooter.__docgenInfo = { "description": "", "displayName": "MainFooter", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } }, "navRoot": { "defaultValue": null, "description": "", "name": "navRoot", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const Breadcrumbs = (props) => {
  var _a, _b;
  const { content } = props;
  const items = (_a = content == null ? void 0 : content["@components"]) == null ? void 0 : _a.breadcrumbs.items;
  const root = (_b = content == null ? void 0 : content["@components"]) == null ? void 0 : _b.breadcrumbs.root;
  const rootItem = {
    "@id": root || "/",
    title: "Home",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HomeIcon, { size: "sm" })
  };
  const breacrumbs = [rootItem, ...items || []];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { as: "nav", width: "default", className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs$1, { items: breacrumbs, children: (item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { id: item["@id"], href: item["@id"], children: item.title }) }) });
};
try {
  Breadcrumbs.displayName = "Breadcrumbs";
  Breadcrumbs.__docgenInfo = { "description": "", "displayName": "Breadcrumbs", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } }, "navRoot": { "defaultValue": null, "description": "", "name": "navRoot", "required": false, "type": { "name": "Content" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function NotContentTypeCondition(contentType) {
  return ({ content, location }) => {
    return !contentType.includes(content == null ? void 0 : content["@type"]) && !contentType.some((type) => {
      return location.search.includes(`type=${encodeURIComponent(type)}`);
    });
  };
}
function install$3(config) {
  config.registerSlotComponent({ name: "App", slot: "App", component: App });
  config.registerSlotComponent({
    name: "Header",
    slot: "header",
    component: Header
  });
  config.registerSlotComponent({
    name: "Logo",
    slot: "logo",
    component: Logo
  });
  config.registerSlotComponent({
    name: "Navigation",
    slot: "navigation",
    component: Navigation
  });
  config.registerSlotComponent({
    name: "Tools",
    slot: "headertools",
    component: HeaderTools
  });
  config.registerSlotComponent({
    name: "Breadcrumbs",
    slot: "header",
    component: Breadcrumbs,
    predicates: [NotContentTypeCondition(config.settings.hideBreadcrumbs)]
  });
  config.registerSlotComponent({
    name: "Main",
    slot: "main",
    component: Main
  });
  config.registerSlotComponent({
    name: "contentArea",
    slot: "contentArea",
    component: ContentArea
  });
  config.registerSlotComponent({
    name: "Footer",
    slot: "footer",
    component: Footer$1
  });
  config.registerSlotComponent({
    name: "mainFooter",
    slot: "mainFooter",
    component: Footer
  });
  return config;
}
function install$2(config) {
  config.settings.hideBreadcrumbs = ["Plone Site", "Subsite", "LRF"];
  return config;
}
function install$1(config) {
  config.registerUtility({
    name: "translation",
    type: "factory",
    method: (id) => id
  });
  install$2(config);
  install$3(config);
  return config;
}
const renderSlate = (id, elements, topLevelTargetElements, nodes, override_toc, metadata) => {
  const renderedNodes = (nodes ?? []).map((node, i) => {
    if (node.text) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: node.text.split("\n").map(
        (t, x) => {
          var _a;
          return (((_a = node.text) == null ? void 0 : _a.indexOf("\n")) ?? -1) > -1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            t,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
          ] }, t + x) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t }, t + x);
        }
      ) }, id + i);
    }
    if (!node.type) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {}, id + i);
    }
    const shouldHaveID = topLevelTargetElements.includes(node.type) || override_toc;
    if (!elements[node.type]) {
      console.warn(`Unknown slate element type ${node.type}`);
    }
    const Element = elements[node.type] || elements["default"];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Element,
      {
        attributes: {
          id: shouldHaveID ? id : void 0
        },
        data: node.data,
        children: renderSlate(
          id,
          elements,
          topLevelTargetElements,
          node.children,
          void 0
        )
      },
      id + node.type + i
    );
  });
  return renderedNodes.flat();
};
const LinkElement = ({
  attributes,
  data,
  children
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const internal_link = (_d = (_c = (_b = (_a = data == null ? void 0 : data.link) == null ? void 0 : _a.internal) == null ? void 0 : _b.internal_link) == null ? void 0 : _c[0]) == null ? void 0 : _d["@id"];
  const external_link = (_f = (_e = data == null ? void 0 : data.link) == null ? void 0 : _e.external) == null ? void 0 : _f.external_link;
  const email = (_g = data == null ? void 0 : data.link) == null ? void 0 : _g.email;
  const target = ((_i = (_h = data == null ? void 0 : data.link) == null ? void 0 : _h.internal) == null ? void 0 : _i.target) ?? ((_k = (_j = data == null ? void 0 : data.link) == null ? void 0 : _j.external) == null ? void 0 : _k.target);
  const href = email ? `mailto:${email.email_address}${email.email_subject ? `?subject=${email.email_subject}` : ""}` : external_link || internal_link || (data == null ? void 0 : data.url);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      ...attributes,
      href,
      title: data == null ? void 0 : data.title,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      children
    }
  );
};
const slate = {
  topLevelTargetElements: ["h1", "h2", "h3", "h4", "h5", "h6"],
  // Default rendered elements
  elements: {
    default: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ...attributes, children }),
    h1: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { ...attributes, children }),
    h2: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { ...attributes, children }),
    h3: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { ...attributes, children }),
    h4: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { ...attributes, children }),
    li: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ...attributes, children }),
    ol: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { ...attributes, children }),
    ul: ({ attributes, children }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { ...attributes, children });
    },
    div: ({ attributes, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...attributes, children }),
    p: ({ attributes, children }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ...attributes, children });
    },
    // While usual slate editor consider these to be Leafs, we treat them as
    // inline elements because they can sometimes contain elements (ex:
    // <b><a/></b>
    em: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children }),
    i: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children }),
    b: ({ children }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children });
    },
    strong: ({ children }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children });
    },
    u: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children }),
    s: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("del", { children }),
    del: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("del", { children }),
    sub: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children }),
    sup: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children }),
    code: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children }),
    blockquote: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { children }),
    link: LinkElement,
    a: LinkElement
  }
};
const TitleBlockView = ({ properties, metadata }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "documentFirstHeading", children: (metadata || properties)["title"] || "" });
};
const TextBlockView = (props) => {
  const { id, data } = props;
  props.metadata || props.properties;
  return (data == null ? void 0 : data.value) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderSlate(
    id,
    src_default.settings.slate.elements,
    src_default.settings.slate.topLevelTargetElements,
    data.value,
    data == null ? void 0 : data.override_toc
  ) }) : null;
};
const ImageBlockView = (props) => {
  const { data } = props;
  if (!data.url) return null;
  const url = data.image_scales ? `${data.url}/${data.image_scales[data.image_field][0].scales.larger.download}` : data.url;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: data.alt }) });
};
const TeaserBlockView = (props) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { data } = props;
  const href = Array.isArray(data.href) ? (_b = (_a = data.href) == null ? void 0 : _a[0]) == null ? void 0 : _b["@id"] : data.href;
  (_c = data.preview_image) == null ? void 0 : _c[0];
  const url = ((_e = (_d = data.preview_image) == null ? void 0 : _d[0]) == null ? void 0 : _e["@id"]) || `${(_f = data.href[0]) == null ? void 0 : _f.image_scales[data.href[0].image_field][0].base_path}/${(_g = data.href[0]) == null ? void 0 : _g.image_scales[data.href[0].image_field][0].scales.larger.download}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx($4f118338184dc1d9$export$a6c7ac8248d6e38a, { href, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "teaser-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "teaser-image-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "teaser-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: data == null ? void 0 : data.description })
    ] })
  ] }) }) });
};
const blocksConfig = {
  title: {
    id: "title",
    title: "Title",
    view: TitleBlockView
  },
  slate: {
    id: "slate",
    title: "Rich text",
    view: TextBlockView
  },
  image: {
    id: "image",
    title: "Image",
    view: ImageBlockView
  },
  teaser: {
    id: "teaser",
    title: "Teaser",
    view: TeaserBlockView
  }
};
function install(config) {
  config.settings.slate = slate;
  config.blocks.blocksConfig = blocksConfig;
  return config;
}
src_default.set("slots", {});
src_default.set("utilities", {});
install$1(src_default);
install(src_default);
const parameters = {
  backgrounds: {
    default: "light"
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
export {
  parameters
};
