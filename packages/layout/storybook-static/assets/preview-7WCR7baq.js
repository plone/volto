const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-Cnd7uBtV.js","./iframe-DB5sSH-w.js","./index-CFtE-bf8.js","./jsx-runtime-ChbgMHDT.js","./index-d0xbMisk.js","./index-BJ2pi0x4.js","./index-BdOSk9or.js","./react-18-DTejT3It.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-DB5sSH-w.js";
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var preview_exports = {};
__export(preview_exports, { parameters: () => parameters });
var excludeTags = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((acc, entry) => {
  let [tag, option] = entry;
  return option.excludeFromDocsStories && (acc[tag] = true), acc;
}, {}), parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-CFRXHY34-Cnd7uBtV.js").then((n) => n.D), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0, import.meta.url);
  return new DocsRenderer();
}, stories: { filter: (story) => {
  var _a;
  return (story.tags || []).filter((tag) => excludeTags[tag]).length === 0 && !((_a = story.parameters.docs) == null ? void 0 : _a.disable);
} } } };
export {
  parameters
};
