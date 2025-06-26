var _a, _b, _c;
import { d as dedent } from "./index-BdOSk9or.js";
const { useEffect, useMemo } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
const { logger } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var PARAM_KEY = "backgrounds";
var DEFAULT_BACKGROUNDS = { light: { name: "light", value: "#F8F8F8" }, dark: { name: "dark", value: "#333" } };
var { document, window } = global, isReduceMotionEnabled = () => {
  var _a2;
  return !!((_a2 = window == null ? void 0 : window.matchMedia("(prefers-reduced-motion: reduce)")) == null ? void 0 : _a2.matches);
}, clearStyles = (selector) => {
  (Array.isArray(selector) ? selector : [selector]).forEach(clearStyle);
}, clearStyle = (selector) => {
  var _a2;
  let element = document.getElementById(selector);
  element && ((_a2 = element.parentElement) == null ? void 0 : _a2.removeChild(element));
}, addGridStyle = (selector, css) => {
  let existingStyle = document.getElementById(selector);
  if (existingStyle) existingStyle.innerHTML !== css && (existingStyle.innerHTML = css);
  else {
    let style = document.createElement("style");
    style.setAttribute("id", selector), style.innerHTML = css, document.head.appendChild(style);
  }
}, addBackgroundStyle = (selector, css, storyId) => {
  var _a2;
  let existingStyle = document.getElementById(selector);
  if (existingStyle) existingStyle.innerHTML !== css && (existingStyle.innerHTML = css);
  else {
    let style = document.createElement("style");
    style.setAttribute("id", selector), style.innerHTML = css;
    let gridStyleSelector = `addon-backgrounds-grid${storyId ? `-docs-${storyId}` : ""}`, existingGridStyle = document.getElementById(gridStyleSelector);
    existingGridStyle ? (_a2 = existingGridStyle.parentElement) == null ? void 0 : _a2.insertBefore(style, existingGridStyle) : document.head.appendChild(style);
  }
};
var defaultGrid = { cellSize: 100, cellAmount: 10, opacity: 0.8 }, BG_SELECTOR_BASE = "addon-backgrounds", GRID_SELECTOR_BASE = "addon-backgrounds-grid", transitionStyle = isReduceMotionEnabled() ? "" : "transition: background-color 0.3s;", withBackgroundAndGrid = (StoryFn, context) => {
  let { globals, parameters: parameters2, viewMode, id } = context, { options = DEFAULT_BACKGROUNDS, disable, grid = defaultGrid } = parameters2[PARAM_KEY] || {}, data = globals[PARAM_KEY] || {}, backgroundName = data.value, item = backgroundName ? options[backgroundName] : void 0, value = (item == null ? void 0 : item.value) || "transparent", showGrid = data.grid || false, shownBackground = !!item && !disable, backgroundSelector = viewMode === "docs" ? `#anchor--${id} .docs-story` : ".sb-show-main", gridSelector = viewMode === "docs" ? `#anchor--${id} .docs-story` : ".sb-show-main", isLayoutPadded = parameters2.layout === void 0 || parameters2.layout === "padded", defaultOffset = viewMode === "docs" ? 20 : isLayoutPadded ? 16 : 0, { cellAmount, cellSize, opacity, offsetX = defaultOffset, offsetY = defaultOffset } = grid, backgroundSelectorId = viewMode === "docs" ? `${BG_SELECTOR_BASE}-docs-${id}` : `${BG_SELECTOR_BASE}-color`, backgroundTarget = viewMode === "docs" ? id : null;
  useEffect(() => {
    let backgroundStyles = `
    ${backgroundSelector} {
      background: ${value} !important;
      ${transitionStyle}
      }`;
    if (!shownBackground) {
      clearStyles(backgroundSelectorId);
      return;
    }
    addBackgroundStyle(backgroundSelectorId, backgroundStyles, backgroundTarget);
  }, [backgroundSelector, backgroundSelectorId, backgroundTarget, shownBackground, value]);
  let gridSelectorId = viewMode === "docs" ? `${GRID_SELECTOR_BASE}-docs-${id}` : `${GRID_SELECTOR_BASE}`;
  return useEffect(() => {
    if (!showGrid) {
      clearStyles(gridSelectorId);
      return;
    }
    let gridSize = [`${cellSize * cellAmount}px ${cellSize * cellAmount}px`, `${cellSize * cellAmount}px ${cellSize * cellAmount}px`, `${cellSize}px ${cellSize}px`, `${cellSize}px ${cellSize}px`].join(", "), gridStyles = `
        ${gridSelector} {
          background-size: ${gridSize} !important;
          background-position: ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${opacity / 2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${opacity / 2}) 1px, transparent 1px) !important;
        }
      `;
    addGridStyle(gridSelectorId, gridStyles);
  }, [cellAmount, cellSize, gridSelector, gridSelectorId, showGrid, offsetX, offsetY, opacity]), StoryFn();
};
var getBackgroundColorByName = (currentSelectedValue, backgrounds = [], defaultName) => {
  if (currentSelectedValue === "transparent") return "transparent";
  if (backgrounds.find((background) => background.value === currentSelectedValue) || currentSelectedValue) return currentSelectedValue;
  let defaultBackground = backgrounds.find((background) => background.name === defaultName);
  if (defaultBackground) return defaultBackground.value;
  if (defaultName) {
    let availableColors = backgrounds.map((background) => background.name).join(", ");
    logger.warn(dedent`
        Backgrounds Addon: could not find the default color "${defaultName}".
        These are the available colors for your story based on your configuration:
        ${availableColors}.
      `);
  }
  return "transparent";
};
var withBackground = (StoryFn, context) => {
  var _a2;
  let { globals, parameters: parameters2 } = context, globalsBackgroundColor = (_a2 = globals[PARAM_KEY]) == null ? void 0 : _a2.value, backgroundsConfig = parameters2[PARAM_KEY], selectedBackgroundColor = useMemo(() => backgroundsConfig.disable ? "transparent" : getBackgroundColorByName(globalsBackgroundColor, backgroundsConfig.values, backgroundsConfig.default), [backgroundsConfig, globalsBackgroundColor]), isActive = useMemo(() => selectedBackgroundColor && selectedBackgroundColor !== "transparent", [selectedBackgroundColor]), selector = context.viewMode === "docs" ? `#anchor--${context.id} .docs-story` : ".sb-show-main", backgroundStyles = useMemo(() => `
      ${selector} {
        background: ${selectedBackgroundColor} !important;
        ${isReduceMotionEnabled() ? "" : "transition: background-color 0.3s;"}
      }
    `, [selectedBackgroundColor, selector]);
  return useEffect(() => {
    let selectorId = context.viewMode === "docs" ? `addon-backgrounds-docs-${context.id}` : "addon-backgrounds-color";
    if (!isActive) {
      clearStyles(selectorId);
      return;
    }
    addBackgroundStyle(selectorId, backgroundStyles, context.viewMode === "docs" ? context.id : null);
  }, [isActive, backgroundStyles, context]), StoryFn();
};
var withGrid = (StoryFn, context) => {
  var _a2;
  let { globals, parameters: parameters2 } = context, gridParameters = parameters2[PARAM_KEY].grid, isActive = ((_a2 = globals[PARAM_KEY]) == null ? void 0 : _a2.grid) === true && gridParameters.disable !== true, { cellAmount, cellSize, opacity } = gridParameters, isInDocs = context.viewMode === "docs", defaultOffset = parameters2.layout === void 0 || parameters2.layout === "padded" ? 16 : 0, offsetX = gridParameters.offsetX ?? (isInDocs ? 20 : defaultOffset), offsetY = gridParameters.offsetY ?? (isInDocs ? 20 : defaultOffset), gridStyles = useMemo(() => {
    let selector = context.viewMode === "docs" ? `#anchor--${context.id} .docs-story` : ".sb-show-main", backgroundSize = [`${cellSize * cellAmount}px ${cellSize * cellAmount}px`, `${cellSize * cellAmount}px ${cellSize * cellAmount}px`, `${cellSize}px ${cellSize}px`, `${cellSize}px ${cellSize}px`].join(", ");
    return `
      ${selector} {
        background-size: ${backgroundSize} !important;
        background-position: ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${opacity / 2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${opacity / 2}) 1px, transparent 1px) !important;
      }
    `;
  }, [cellSize]);
  return useEffect(() => {
    let selectorId = context.viewMode === "docs" ? `addon-backgrounds-grid-docs-${context.id}` : "addon-backgrounds-grid";
    if (!isActive) {
      clearStyles(selectorId);
      return;
    }
    addGridStyle(selectorId, gridStyles);
  }, [isActive, gridStyles, context]), StoryFn();
};
var decorators = ((_a = globalThis.FEATURES) == null ? void 0 : _a.backgroundsStoryGlobals) ? [withBackgroundAndGrid] : [withGrid, withBackground], parameters = { [PARAM_KEY]: { grid: { cellSize: 20, opacity: 0.5, cellAmount: 5 }, disable: false, ...!((_b = globalThis.FEATURES) == null ? void 0 : _b.backgroundsStoryGlobals) && { values: Object.values(DEFAULT_BACKGROUNDS) } } }, modern = { [PARAM_KEY]: { value: void 0, grid: false } }, initialGlobals = ((_c = globalThis.FEATURES) == null ? void 0 : _c.backgroundsStoryGlobals) ? modern : { [PARAM_KEY]: null };
export {
  decorators,
  initialGlobals,
  parameters
};
