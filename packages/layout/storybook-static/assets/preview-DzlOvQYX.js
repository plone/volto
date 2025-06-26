var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  {
    throw new Error(prefix);
  }
}
const { useEffect } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var PARAM_KEY = "measureEnabled";
function getDocumentWidthAndHeight() {
  let container = global.document.documentElement, height = Math.max(container.scrollHeight, container.offsetHeight);
  return { width: Math.max(container.scrollWidth, container.offsetWidth), height };
}
function createCanvas() {
  let canvas = global.document.createElement("canvas");
  canvas.id = "storybook-addon-measure";
  let context = canvas.getContext("2d");
  invariant(context != null);
  let { width, height } = getDocumentWidthAndHeight();
  return setCanvasWidthAndHeight(canvas, context, { width, height }), canvas.style.position = "absolute", canvas.style.left = "0", canvas.style.top = "0", canvas.style.zIndex = "2147483647", canvas.style.pointerEvents = "none", global.document.body.appendChild(canvas), { canvas, context, width, height };
}
function setCanvasWidthAndHeight(canvas, context, { width, height }) {
  canvas.style.width = `${width}px`, canvas.style.height = `${height}px`;
  let scale = global.window.devicePixelRatio;
  canvas.width = Math.floor(width * scale), canvas.height = Math.floor(height * scale), context.scale(scale, scale);
}
var state = {};
function init() {
  state.canvas || (state = createCanvas());
}
function clear() {
  state.context && state.context.clearRect(0, 0, state.width ?? 0, state.height ?? 0);
}
function draw(callback) {
  clear(), callback(state.context);
}
function rescale() {
  invariant(state.canvas), invariant(state.context), setCanvasWidthAndHeight(state.canvas, state.context, { width: 0, height: 0 });
  let { width, height } = getDocumentWidthAndHeight();
  setCanvasWidthAndHeight(state.canvas, state.context, { width, height }), state.width = width, state.height = height;
}
function destroy() {
  var _a;
  state.canvas && (clear(), (_a = state.canvas.parentNode) == null ? void 0 : _a.removeChild(state.canvas), state = {});
}
var colors = { margin: "#f6b26b", border: "#ffe599", padding: "#93c47d", content: "#6fa8dc", text: "#232020" }, labelPadding = 6;
function roundedRect(context, { x, y, w, h, r }) {
  x = x - w / 2, y = y - h / 2, w < 2 * r && (r = w / 2), h < 2 * r && (r = h / 2), context.beginPath(), context.moveTo(x + r, y), context.arcTo(x + w, y, x + w, y + h, r), context.arcTo(x + w, y + h, x, y + h, r), context.arcTo(x, y + h, x, y, r), context.arcTo(x, y, x + w, y, r), context.closePath();
}
function positionCoordinate(position, { padding, border, width, height, top, left }) {
  let contentWidth = width - border.left - border.right - padding.left - padding.right, contentHeight = height - padding.top - padding.bottom - border.top - border.bottom, x = left + border.left + padding.left, y = top + border.top + padding.top;
  return position === "top" ? x += contentWidth / 2 : position === "right" ? (x += contentWidth, y += contentHeight / 2) : position === "bottom" ? (x += contentWidth / 2, y += contentHeight) : position === "left" ? y += contentHeight / 2 : position === "center" && (x += contentWidth / 2, y += contentHeight / 2), { x, y };
}
function offset(type, position, { margin, border, padding }, labelPaddingSize, external) {
  let shift = (dir) => 0, offsetX = 0, offsetY = 0, locationMultiplier = external ? 1 : 0.5, labelPaddingShift = external ? labelPaddingSize * 2 : 0;
  return type === "padding" ? shift = (dir) => padding[dir] * locationMultiplier + labelPaddingShift : type === "border" ? shift = (dir) => padding[dir] + border[dir] * locationMultiplier + labelPaddingShift : type === "margin" && (shift = (dir) => padding[dir] + border[dir] + margin[dir] * locationMultiplier + labelPaddingShift), position === "top" ? offsetY = -shift("top") : position === "right" ? offsetX = shift("right") : position === "bottom" ? offsetY = shift("bottom") : position === "left" && (offsetX = -shift("left")), { offsetX, offsetY };
}
function collide(a, b) {
  return Math.abs(a.x - b.x) < Math.abs(a.w + b.w) / 2 && Math.abs(a.y - b.y) < Math.abs(a.h + b.h) / 2;
}
function overlapAdjustment(position, currentRect, prevRect) {
  return position === "top" ? currentRect.y = prevRect.y - prevRect.h - labelPadding : position === "right" ? currentRect.x = prevRect.x + prevRect.w / 2 + labelPadding + currentRect.w / 2 : position === "bottom" ? currentRect.y = prevRect.y + prevRect.h + labelPadding : position === "left" && (currentRect.x = prevRect.x - prevRect.w / 2 - labelPadding - currentRect.w / 2), { x: currentRect.x, y: currentRect.y };
}
function textWithRect(context, type, { x, y, w, h }, text) {
  return roundedRect(context, { x, y, w, h, r: 3 }), context.fillStyle = `${colors[type]}dd`, context.fill(), context.strokeStyle = colors[type], context.stroke(), context.fillStyle = colors.text, context.fillText(text, x, y), roundedRect(context, { x, y, w, h, r: 3 }), context.fillStyle = `${colors[type]}dd`, context.fill(), context.strokeStyle = colors[type], context.stroke(), context.fillStyle = colors.text, context.fillText(text, x, y), { x, y, w, h };
}
function configureText(context, text) {
  context.font = "600 12px monospace", context.textBaseline = "middle", context.textAlign = "center";
  let metrics = context.measureText(text), actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent, w = metrics.width + labelPadding * 2, h = actualHeight + labelPadding * 2;
  return { w, h };
}
function drawLabel(context, measurements, { type, position = "center", text }, prevRect, external = false) {
  let { x, y } = positionCoordinate(position, measurements), { offsetX, offsetY } = offset(type, position, measurements, labelPadding + 1, external);
  x += offsetX, y += offsetY;
  let { w, h } = configureText(context, text);
  if (prevRect && collide({ x, y, w, h }, prevRect)) {
    let adjusted = overlapAdjustment(position, { x, y, w }, prevRect);
    x = adjusted.x, y = adjusted.y;
  }
  return textWithRect(context, type, { x, y, w, h }, text);
}
function floatingOffset(alignment, { w, h }) {
  let deltaW = w * 0.5 + labelPadding, deltaH = h * 0.5 + labelPadding;
  return { offsetX: (alignment.x === "left" ? -1 : 1) * deltaW, offsetY: (alignment.y === "top" ? -1 : 1) * deltaH };
}
function drawFloatingLabel(context, measurements, { type, text }) {
  let { floatingAlignment: floatingAlignment2, extremities } = measurements, x = extremities[floatingAlignment2.x], y = extremities[floatingAlignment2.y], { w, h } = configureText(context, text), { offsetX, offsetY } = floatingOffset(floatingAlignment2, { w, h });
  return x += offsetX, y += offsetY, textWithRect(context, type, { x, y, w, h }, text);
}
function drawStack(context, measurements, stack, external) {
  let rects = [];
  stack.forEach((l, idx) => {
    let rect = external && l.position === "center" ? drawFloatingLabel(context, measurements, l) : drawLabel(context, measurements, l, rects[idx - 1], external);
    rects[idx] = rect;
  });
}
function labelStacks(context, measurements, labels, externalLabels) {
  let stacks = labels.reduce((acc, l) => {
    var _a;
    return Object.prototype.hasOwnProperty.call(acc, l.position) || (acc[l.position] = []), (_a = acc[l.position]) == null ? void 0 : _a.push(l), acc;
  }, {});
  stacks.top && drawStack(context, measurements, stacks.top, externalLabels), stacks.right && drawStack(context, measurements, stacks.right, externalLabels), stacks.bottom && drawStack(context, measurements, stacks.bottom, externalLabels), stacks.left && drawStack(context, measurements, stacks.left, externalLabels), stacks.center && drawStack(context, measurements, stacks.center, externalLabels);
}
var colors2 = { margin: "#f6b26ba8", border: "#ffe599a8", padding: "#93c47d8c", content: "#6fa8dca8" }, SMALL_NODE_SIZE = 30;
function pxToNumber(px) {
  return parseInt(px.replace("px", ""), 10);
}
function round(value) {
  return Number.isInteger(value) ? value : value.toFixed(2);
}
function filterZeroValues(labels) {
  return labels.filter((l) => l.text !== 0 && l.text !== "0");
}
function floatingAlignment(extremities) {
  let windowExtremities = { top: global.window.scrollY, bottom: global.window.scrollY + global.window.innerHeight, left: global.window.scrollX, right: global.window.scrollX + global.window.innerWidth }, distances = { top: Math.abs(windowExtremities.top - extremities.top), bottom: Math.abs(windowExtremities.bottom - extremities.bottom), left: Math.abs(windowExtremities.left - extremities.left), right: Math.abs(windowExtremities.right - extremities.right) };
  return { x: distances.left > distances.right ? "left" : "right", y: distances.top > distances.bottom ? "top" : "bottom" };
}
function measureElement(element) {
  let style = global.getComputedStyle(element), { top, left, right, bottom, width, height } = element.getBoundingClientRect(), { marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight, borderBottomWidth, borderTopWidth, borderLeftWidth, borderRightWidth } = style;
  top = top + global.window.scrollY, left = left + global.window.scrollX, bottom = bottom + global.window.scrollY, right = right + global.window.scrollX;
  let margin = { top: pxToNumber(marginTop), bottom: pxToNumber(marginBottom), left: pxToNumber(marginLeft), right: pxToNumber(marginRight) }, padding = { top: pxToNumber(paddingTop), bottom: pxToNumber(paddingBottom), left: pxToNumber(paddingLeft), right: pxToNumber(paddingRight) }, border = { top: pxToNumber(borderTopWidth), bottom: pxToNumber(borderBottomWidth), left: pxToNumber(borderLeftWidth), right: pxToNumber(borderRightWidth) }, extremities = { top: top - margin.top, bottom: bottom + margin.bottom, left: left - margin.left, right: right + margin.right };
  return { margin, padding, border, top, left, bottom, right, width, height, extremities, floatingAlignment: floatingAlignment(extremities) };
}
function drawMargin(context, { margin, width, height, top, left, bottom, right }) {
  let marginHeight = height + margin.bottom + margin.top;
  context.fillStyle = colors2.margin, context.fillRect(left, top - margin.top, width, margin.top), context.fillRect(right, top - margin.top, margin.right, marginHeight), context.fillRect(left, bottom, width, margin.bottom), context.fillRect(left - margin.left, top - margin.top, margin.left, marginHeight);
  let marginLabels = [{ type: "margin", text: round(margin.top), position: "top" }, { type: "margin", text: round(margin.right), position: "right" }, { type: "margin", text: round(margin.bottom), position: "bottom" }, { type: "margin", text: round(margin.left), position: "left" }];
  return filterZeroValues(marginLabels);
}
function drawPadding(context, { padding, border, width, height, top, left, bottom, right }) {
  let paddingWidth = width - border.left - border.right, paddingHeight = height - padding.top - padding.bottom - border.top - border.bottom;
  context.fillStyle = colors2.padding, context.fillRect(left + border.left, top + border.top, paddingWidth, padding.top), context.fillRect(right - padding.right - border.right, top + padding.top + border.top, padding.right, paddingHeight), context.fillRect(left + border.left, bottom - padding.bottom - border.bottom, paddingWidth, padding.bottom), context.fillRect(left + border.left, top + padding.top + border.top, padding.left, paddingHeight);
  let paddingLabels = [{ type: "padding", text: padding.top, position: "top" }, { type: "padding", text: padding.right, position: "right" }, { type: "padding", text: padding.bottom, position: "bottom" }, { type: "padding", text: padding.left, position: "left" }];
  return filterZeroValues(paddingLabels);
}
function drawBorder(context, { border, width, height, top, left, bottom, right }) {
  let borderHeight = height - border.top - border.bottom;
  context.fillStyle = colors2.border, context.fillRect(left, top, width, border.top), context.fillRect(left, bottom - border.bottom, width, border.bottom), context.fillRect(left, top + border.top, border.left, borderHeight), context.fillRect(right - border.right, top + border.top, border.right, borderHeight);
  let borderLabels = [{ type: "border", text: border.top, position: "top" }, { type: "border", text: border.right, position: "right" }, { type: "border", text: border.bottom, position: "bottom" }, { type: "border", text: border.left, position: "left" }];
  return filterZeroValues(borderLabels);
}
function drawContent(context, { padding, border, width, height, top, left }) {
  let contentWidth = width - border.left - border.right - padding.left - padding.right, contentHeight = height - padding.top - padding.bottom - border.top - border.bottom;
  return context.fillStyle = colors2.content, context.fillRect(left + border.left + padding.left, top + border.top + padding.top, contentWidth, contentHeight), [{ type: "content", position: "center", text: `${round(contentWidth)} x ${round(contentHeight)}` }];
}
function drawBoxModel(element) {
  return (context) => {
    if (element && context) {
      let measurements = measureElement(element), marginLabels = drawMargin(context, measurements), paddingLabels = drawPadding(context, measurements), borderLabels = drawBorder(context, measurements), contentLabels = drawContent(context, measurements), externalLabels = measurements.width <= SMALL_NODE_SIZE * 3 || measurements.height <= SMALL_NODE_SIZE;
      labelStacks(context, measurements, [...contentLabels, ...paddingLabels, ...borderLabels, ...marginLabels], externalLabels);
    }
  };
}
function drawSelectedElement(element) {
  draw(drawBoxModel(element));
}
var deepElementFromPoint = (x, y) => {
  let element = global.document.elementFromPoint(x, y), crawlShadows = (node) => {
    if (node && node.shadowRoot) {
      let nestedElement = node.shadowRoot.elementFromPoint(x, y);
      return node.isEqualNode(nestedElement) ? node : nestedElement.shadowRoot ? crawlShadows(nestedElement) : nestedElement;
    }
    return node;
  };
  return crawlShadows(element) || element;
};
var nodeAtPointerRef, pointer = { x: 0, y: 0 };
function findAndDrawElement(x, y) {
  nodeAtPointerRef = deepElementFromPoint(x, y), drawSelectedElement(nodeAtPointerRef);
}
var withMeasure = (StoryFn, context) => {
  let { measureEnabled } = context.globals;
  return useEffect(() => {
    let onPointerMove = (event) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation(), pointer.x = event.clientX, pointer.y = event.clientY;
      });
    };
    return document.addEventListener("pointermove", onPointerMove), () => {
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []), useEffect(() => {
    let onPointerOver = (event) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation(), findAndDrawElement(event.clientX, event.clientY);
      });
    }, onResize = () => {
      window.requestAnimationFrame(() => {
        rescale();
      });
    };
    return context.viewMode === "story" && measureEnabled && (document.addEventListener("pointerover", onPointerOver), init(), window.addEventListener("resize", onResize), findAndDrawElement(pointer.x, pointer.y)), () => {
      window.removeEventListener("resize", onResize), destroy();
    };
  }, [measureEnabled, context.viewMode]), StoryFn();
};
var decorators = [withMeasure], initialGlobals = { [PARAM_KEY]: false };
export {
  decorators,
  initialGlobals
};
