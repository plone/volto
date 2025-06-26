import { j as jsxRuntimeExports } from "./jsx-runtime-ChbgMHDT.js";
import { S as SlotRenderer } from "./SlotRenderer-FIE8NxhS.js";
import { a as $f645667febf57a63$export$f9762fab77588ecb, b as $f39a9eba43920ace$export$8dc98ba7eadeaa56, d as $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c, e as $b5e257d569688ac6$export$535bd6ca7f90a273, f as $65484d02dcb7eb3e$export$457c3d6518dd4c6f, g as $64fa3d84918910a7$export$29f1550f4b0d4415, h as $64fa3d84918910a7$export$fabf2dc03a41866e, i as $64fa3d84918910a7$export$4d86445c2cf5e3, j as $4f118338184dc1d9$export$e2509388b49734e7, k as ce, t as twMerge, H as HomeIcon, C as ChevronrightIcon, l as $64fa3d84918910a7$export$c245e6201fed2f75, $ as $4f118338184dc1d9$export$a6c7ac8248d6e38a } from "./chunk-DDZFNAN4-BkXFyrin.js";
import { r as reactExports, R as React$1 } from "./index-CFtE-bf8.js";
import { r as reactDomExports } from "./index-d0xbMisk.js";
class $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {
  get childNodes() {
    throw new Error("childNodes is not supported");
  }
  clone() {
    let node = new $23b9f4fcf0fe224b$export$d68d59712b04d9d1(this.type, this.key);
    node.value = this.value;
    node.level = this.level;
    node.hasChildNodes = this.hasChildNodes;
    node.rendered = this.rendered;
    node.textValue = this.textValue;
    node["aria-label"] = this["aria-label"];
    node.index = this.index;
    node.parentKey = this.parentKey;
    node.prevKey = this.prevKey;
    node.nextKey = this.nextKey;
    node.firstChildKey = this.firstChildKey;
    node.lastChildKey = this.lastChildKey;
    node.props = this.props;
    node.render = this.render;
    node.colSpan = this.colSpan;
    node.colIndex = this.colIndex;
    return node;
  }
  constructor(type, key) {
    this.value = null;
    this.level = 0;
    this.hasChildNodes = false;
    this.rendered = null;
    this.textValue = "";
    this["aria-label"] = void 0;
    this.index = 0;
    this.parentKey = null;
    this.prevKey = null;
    this.nextKey = null;
    this.firstChildKey = null;
    this.lastChildKey = null;
    this.props = {};
    this.colSpan = null;
    this.colIndex = null;
    this.type = type;
    this.key = key;
  }
}
class $23b9f4fcf0fe224b$export$408d25a4e12db025 {
  get size() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  *[Symbol.iterator]() {
    let node = this.firstKey != null ? this.keyMap.get(this.firstKey) : void 0;
    while (node) {
      yield node;
      node = node.nextKey != null ? this.keyMap.get(node.nextKey) : void 0;
    }
  }
  getChildren(key) {
    let keyMap = this.keyMap;
    return {
      *[Symbol.iterator]() {
        let parent = keyMap.get(key);
        let node = (parent === null || parent === void 0 ? void 0 : parent.firstChildKey) != null ? keyMap.get(parent.firstChildKey) : null;
        while (node) {
          yield node;
          node = node.nextKey != null ? keyMap.get(node.nextKey) : void 0;
        }
      }
    };
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    if (!node) return null;
    if (node.prevKey != null) {
      node = this.keyMap.get(node.prevKey);
      while (node && node.type !== "item" && node.lastChildKey != null) node = this.keyMap.get(node.lastChildKey);
      var _node_key;
      return (_node_key = node === null || node === void 0 ? void 0 : node.key) !== null && _node_key !== void 0 ? _node_key : null;
    }
    return node.parentKey;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    if (!node) return null;
    if (node.type !== "item" && node.firstChildKey != null) return node.firstChildKey;
    while (node) {
      if (node.nextKey != null) return node.nextKey;
      if (node.parentKey != null) node = this.keyMap.get(node.parentKey);
      else return null;
    }
    return null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    let node = this.lastKey != null ? this.keyMap.get(this.lastKey) : null;
    while ((node === null || node === void 0 ? void 0 : node.lastChildKey) != null) node = this.keyMap.get(node.lastChildKey);
    var _node_key;
    return (_node_key = node === null || node === void 0 ? void 0 : node.key) !== null && _node_key !== void 0 ? _node_key : null;
  }
  getItem(key) {
    var _this_keyMap_get;
    return (_this_keyMap_get = this.keyMap.get(key)) !== null && _this_keyMap_get !== void 0 ? _this_keyMap_get : null;
  }
  at() {
    throw new Error("Not implemented");
  }
  clone() {
    let Constructor = this.constructor;
    let collection = new Constructor();
    collection.keyMap = new Map(this.keyMap);
    collection.firstKey = this.firstKey;
    collection.lastKey = this.lastKey;
    return collection;
  }
  addNode(node) {
    if (this.frozen) throw new Error("Cannot add a node to a frozen collection");
    this.keyMap.set(node.key, node);
  }
  removeNode(key) {
    if (this.frozen) throw new Error("Cannot remove a node to a frozen collection");
    this.keyMap.delete(key);
  }
  commit(firstKey, lastKey, isSSR = false) {
    if (this.frozen) throw new Error("Cannot commit a frozen collection");
    this.firstKey = firstKey;
    this.lastKey = lastKey;
    this.frozen = !isSSR;
  }
  // TODO: this is pretty specific to menu, will need to check if it is generic enough
  // Will need to handle varying levels I assume but will revisit after I get searchable menu working for base menu
  // TODO: an alternative is to simply walk the collection and add all item nodes that match the filter and any sections/separators we encounter
  // to an array, then walk that new array and fix all the next/Prev keys while adding them to the new collection
  UNSTABLE_filter(filterFn) {
    let newCollection = new $23b9f4fcf0fe224b$export$408d25a4e12db025();
    let lastNode = null;
    for (let node of this) {
      if (node.type === "section" && node.hasChildNodes) {
        let clonedSection = node.clone();
        let lastChildInSection = null;
        for (let child of this.getChildren(node.key)) if ($23b9f4fcf0fe224b$var$shouldKeepNode(child, filterFn, this, newCollection)) {
          let clonedChild = child.clone();
          if (lastChildInSection == null) clonedSection.firstChildKey = clonedChild.key;
          if (newCollection.firstKey == null) newCollection.firstKey = clonedSection.key;
          if (lastChildInSection && lastChildInSection.parentKey === clonedChild.parentKey) {
            lastChildInSection.nextKey = clonedChild.key;
            clonedChild.prevKey = lastChildInSection.key;
          } else clonedChild.prevKey = null;
          clonedChild.nextKey = null;
          newCollection.addNode(clonedChild);
          lastChildInSection = clonedChild;
        }
        if (lastChildInSection) {
          if (lastChildInSection.type !== "header") {
            clonedSection.lastChildKey = lastChildInSection.key;
            if (lastNode == null) clonedSection.prevKey = null;
            else if (lastNode.type === "section" || lastNode.type === "separator") {
              lastNode.nextKey = clonedSection.key;
              clonedSection.prevKey = lastNode.key;
            }
            clonedSection.nextKey = null;
            lastNode = clonedSection;
            newCollection.addNode(clonedSection);
          } else {
            if (newCollection.firstKey === clonedSection.key) newCollection.firstKey = null;
            newCollection.removeNode(lastChildInSection.key);
          }
        }
      } else if (node.type === "separator") {
        let clonedSeparator = node.clone();
        clonedSeparator.nextKey = null;
        if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) === "section") {
          lastNode.nextKey = clonedSeparator.key;
          clonedSeparator.prevKey = lastNode.key;
          lastNode = clonedSeparator;
          newCollection.addNode(clonedSeparator);
        }
      } else {
        let clonedNode = node.clone();
        if ($23b9f4fcf0fe224b$var$shouldKeepNode(clonedNode, filterFn, this, newCollection)) {
          if (newCollection.firstKey == null) newCollection.firstKey = clonedNode.key;
          if (lastNode != null && lastNode.type !== "section" && lastNode.type !== "separator" && lastNode.parentKey === clonedNode.parentKey) {
            lastNode.nextKey = clonedNode.key;
            clonedNode.prevKey = lastNode.key;
          } else clonedNode.prevKey = null;
          clonedNode.nextKey = null;
          newCollection.addNode(clonedNode);
          lastNode = clonedNode;
        }
      }
    }
    if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) === "separator" && lastNode.nextKey === null) {
      let lastSection;
      if (lastNode.prevKey != null) {
        lastSection = newCollection.getItem(lastNode.prevKey);
        lastSection.nextKey = null;
      }
      newCollection.removeNode(lastNode.key);
      lastNode = lastSection;
    }
    newCollection.lastKey = (lastNode === null || lastNode === void 0 ? void 0 : lastNode.key) || null;
    return newCollection;
  }
  constructor() {
    this.keyMap = /* @__PURE__ */ new Map();
    this.firstKey = null;
    this.lastKey = null;
    this.frozen = false;
  }
}
function $23b9f4fcf0fe224b$var$shouldKeepNode(node, filterFn, oldCollection, newCollection) {
  if (node.type === "subdialogtrigger" || node.type === "submenutrigger") {
    let triggerChild = [
      ...oldCollection.getChildren(node.key)
    ][0];
    if (triggerChild && filterFn(triggerChild.textValue)) {
      let clonedChild = triggerChild.clone();
      newCollection.addNode(clonedChild);
      return true;
    } else return false;
  } else if (node.type === "header") return true;
  else return filterFn(node.textValue);
}
class $681cc3c98f569e39$export$410b0c854570d131 {
  *[Symbol.iterator]() {
    let node = this.firstChild;
    while (node) {
      yield node;
      node = node.nextSibling;
    }
  }
  get firstChild() {
    return this._firstChild;
  }
  set firstChild(firstChild) {
    this._firstChild = firstChild;
    this.ownerDocument.markDirty(this);
  }
  get lastChild() {
    return this._lastChild;
  }
  set lastChild(lastChild) {
    this._lastChild = lastChild;
    this.ownerDocument.markDirty(this);
  }
  get previousSibling() {
    return this._previousSibling;
  }
  set previousSibling(previousSibling) {
    this._previousSibling = previousSibling;
    this.ownerDocument.markDirty(this);
  }
  get nextSibling() {
    return this._nextSibling;
  }
  set nextSibling(nextSibling) {
    this._nextSibling = nextSibling;
    this.ownerDocument.markDirty(this);
  }
  get parentNode() {
    return this._parentNode;
  }
  set parentNode(parentNode) {
    this._parentNode = parentNode;
    this.ownerDocument.markDirty(this);
  }
  get isConnected() {
    var _this_parentNode;
    return ((_this_parentNode = this.parentNode) === null || _this_parentNode === void 0 ? void 0 : _this_parentNode.isConnected) || false;
  }
  invalidateChildIndices(child) {
    if (this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || child.index < this._minInvalidChildIndex.index) {
      this._minInvalidChildIndex = child;
      this.ownerDocument.markDirty(this);
    }
  }
  updateChildIndices() {
    let node = this._minInvalidChildIndex;
    while (node) {
      node.index = node.previousSibling ? node.previousSibling.index + 1 : 0;
      node = node.nextSibling;
    }
    this._minInvalidChildIndex = null;
  }
  appendChild(child) {
    if (child.parentNode) child.parentNode.removeChild(child);
    if (this.firstChild == null) this.firstChild = child;
    if (this.lastChild) {
      this.lastChild.nextSibling = child;
      child.index = this.lastChild.index + 1;
      child.previousSibling = this.lastChild;
    } else {
      child.previousSibling = null;
      child.index = 0;
    }
    child.parentNode = this;
    child.nextSibling = null;
    this.lastChild = child;
    this.ownerDocument.markDirty(this);
    if (this.isConnected) this.ownerDocument.queueUpdate();
  }
  insertBefore(newNode, referenceNode) {
    if (referenceNode == null) return this.appendChild(newNode);
    if (newNode.parentNode) newNode.parentNode.removeChild(newNode);
    newNode.nextSibling = referenceNode;
    newNode.previousSibling = referenceNode.previousSibling;
    newNode.index = referenceNode.index - 1;
    if (this.firstChild === referenceNode) this.firstChild = newNode;
    else if (referenceNode.previousSibling) referenceNode.previousSibling.nextSibling = newNode;
    referenceNode.previousSibling = newNode;
    newNode.parentNode = referenceNode.parentNode;
    this.invalidateChildIndices(newNode);
    if (this.isConnected) this.ownerDocument.queueUpdate();
  }
  removeChild(child) {
    if (child.parentNode !== this || !this.ownerDocument.isMounted) return;
    if (this._minInvalidChildIndex === child) this._minInvalidChildIndex = null;
    if (child.nextSibling) {
      this.invalidateChildIndices(child.nextSibling);
      child.nextSibling.previousSibling = child.previousSibling;
    }
    if (child.previousSibling) child.previousSibling.nextSibling = child.nextSibling;
    if (this.firstChild === child) this.firstChild = child.nextSibling;
    if (this.lastChild === child) this.lastChild = child.previousSibling;
    child.parentNode = null;
    child.nextSibling = null;
    child.previousSibling = null;
    child.index = 0;
    this.ownerDocument.markDirty(child);
    if (this.isConnected) this.ownerDocument.queueUpdate();
  }
  addEventListener() {
  }
  removeEventListener() {
  }
  get previousVisibleSibling() {
    let node = this.previousSibling;
    while (node && node.isHidden) node = node.previousSibling;
    return node;
  }
  get nextVisibleSibling() {
    let node = this.nextSibling;
    while (node && node.isHidden) node = node.nextSibling;
    return node;
  }
  get firstVisibleChild() {
    let node = this.firstChild;
    while (node && node.isHidden) node = node.nextSibling;
    return node;
  }
  get lastVisibleChild() {
    let node = this.lastChild;
    while (node && node.isHidden) node = node.previousSibling;
    return node;
  }
  constructor(ownerDocument) {
    this._firstChild = null;
    this._lastChild = null;
    this._previousSibling = null;
    this._nextSibling = null;
    this._parentNode = null;
    this._minInvalidChildIndex = null;
    this.ownerDocument = ownerDocument;
  }
}
class $681cc3c98f569e39$export$dc064fe9e59310fd extends $681cc3c98f569e39$export$410b0c854570d131 {
  get index() {
    return this._index;
  }
  set index(index) {
    this._index = index;
    this.ownerDocument.markDirty(this);
  }
  get level() {
    if (this.parentNode instanceof $681cc3c98f569e39$export$dc064fe9e59310fd) return this.parentNode.level + (this.node.type === "item" ? 1 : 0);
    return 0;
  }
  /**
  * Lazily gets a mutable instance of a Node. If the node has already
  * been cloned during this update cycle, it just returns the existing one.
  */
  getMutableNode() {
    if (!this.isMutated) {
      this.node = this.node.clone();
      this.isMutated = true;
    }
    this.ownerDocument.markDirty(this);
    return this.node;
  }
  updateNode() {
    var _this_previousVisibleSibling, _this_firstVisibleChild, _this_lastVisibleChild;
    let nextSibling = this.nextVisibleSibling;
    let node = this.getMutableNode();
    node.index = this.index;
    node.level = this.level;
    node.parentKey = this.parentNode instanceof $681cc3c98f569e39$export$dc064fe9e59310fd ? this.parentNode.node.key : null;
    var _this_previousVisibleSibling_node_key;
    node.prevKey = (_this_previousVisibleSibling_node_key = (_this_previousVisibleSibling = this.previousVisibleSibling) === null || _this_previousVisibleSibling === void 0 ? void 0 : _this_previousVisibleSibling.node.key) !== null && _this_previousVisibleSibling_node_key !== void 0 ? _this_previousVisibleSibling_node_key : null;
    var _nextSibling_node_key;
    node.nextKey = (_nextSibling_node_key = nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.node.key) !== null && _nextSibling_node_key !== void 0 ? _nextSibling_node_key : null;
    node.hasChildNodes = !!this.firstChild;
    var _this_firstVisibleChild_node_key;
    node.firstChildKey = (_this_firstVisibleChild_node_key = (_this_firstVisibleChild = this.firstVisibleChild) === null || _this_firstVisibleChild === void 0 ? void 0 : _this_firstVisibleChild.node.key) !== null && _this_firstVisibleChild_node_key !== void 0 ? _this_firstVisibleChild_node_key : null;
    var _this_lastVisibleChild_node_key;
    node.lastChildKey = (_this_lastVisibleChild_node_key = (_this_lastVisibleChild = this.lastVisibleChild) === null || _this_lastVisibleChild === void 0 ? void 0 : _this_lastVisibleChild.node.key) !== null && _this_lastVisibleChild_node_key !== void 0 ? _this_lastVisibleChild_node_key : null;
    if ((node.colSpan != null || node.colIndex != null) && nextSibling) {
      var _node_colIndex, _node_colSpan;
      let nextColIndex = ((_node_colIndex = node.colIndex) !== null && _node_colIndex !== void 0 ? _node_colIndex : node.index) + ((_node_colSpan = node.colSpan) !== null && _node_colSpan !== void 0 ? _node_colSpan : 1);
      if (nextColIndex !== nextSibling.node.colIndex) {
        let siblingNode = nextSibling.getMutableNode();
        siblingNode.colIndex = nextColIndex;
      }
    }
  }
  setProps(obj, ref, rendered, render) {
    let node = this.getMutableNode();
    let { value: value1, textValue, id, ...props } = obj;
    props.ref = ref;
    node.props = props;
    node.rendered = rendered;
    node.render = render;
    node.value = value1;
    node.textValue = textValue || (typeof props.children === "string" ? props.children : "") || obj["aria-label"] || "";
    if (id != null && id !== node.key) {
      if (this.hasSetProps) throw new Error("Cannot change the id of an item");
      node.key = id;
    }
    if (props.colSpan != null) node.colSpan = props.colSpan;
    this.hasSetProps = true;
    if (this.isConnected) this.ownerDocument.queueUpdate();
  }
  get style() {
    let element = this;
    return {
      get display() {
        return element.isHidden ? "none" : "";
      },
      set display(value) {
        let isHidden = value === "none";
        if (element.isHidden !== isHidden) {
          var _element_parentNode, _element_parentNode1;
          if (((_element_parentNode = element.parentNode) === null || _element_parentNode === void 0 ? void 0 : _element_parentNode.firstVisibleChild) === element || ((_element_parentNode1 = element.parentNode) === null || _element_parentNode1 === void 0 ? void 0 : _element_parentNode1.lastVisibleChild) === element) element.ownerDocument.markDirty(element.parentNode);
          let prev = element.previousVisibleSibling;
          let next = element.nextVisibleSibling;
          if (prev) element.ownerDocument.markDirty(prev);
          if (next) element.ownerDocument.markDirty(next);
          element.isHidden = isHidden;
          element.ownerDocument.markDirty(element);
        }
      }
    };
  }
  hasAttribute() {
  }
  setAttribute() {
  }
  setAttributeNS() {
  }
  removeAttribute() {
  }
  constructor(type, ownerDocument) {
    super(ownerDocument), this.nodeType = 8, this.isMutated = true, this._index = 0, this.hasSetProps = false, this.isHidden = false;
    this.node = new $23b9f4fcf0fe224b$export$d68d59712b04d9d1(type, `react-aria-${++ownerDocument.nodeId}`);
  }
}
class $681cc3c98f569e39$export$b34a105447964f9f extends $681cc3c98f569e39$export$410b0c854570d131 {
  get isConnected() {
    return this.isMounted;
  }
  createElement(type) {
    return new $681cc3c98f569e39$export$dc064fe9e59310fd(type, this);
  }
  getMutableCollection() {
    if (!this.nextCollection) this.nextCollection = this.collection.clone();
    return this.nextCollection;
  }
  markDirty(node) {
    this.dirtyNodes.add(node);
  }
  addNode(element) {
    if (element.isHidden) return;
    let collection = this.getMutableCollection();
    if (!collection.getItem(element.node.key)) for (let child of element) this.addNode(child);
    collection.addNode(element.node);
  }
  removeNode(node) {
    for (let child of node) this.removeNode(child);
    let collection = this.getMutableCollection();
    collection.removeNode(node.node.key);
  }
  /** Finalizes the collection update, updating all nodes and freezing the collection. */
  getCollection() {
    if (this.inSubscription) return this.collection.clone();
    this.queuedRender = false;
    this.updateCollection();
    return this.collection;
  }
  updateCollection() {
    for (let element of this.dirtyNodes) if (element instanceof $681cc3c98f569e39$export$dc064fe9e59310fd && (!element.isConnected || element.isHidden)) this.removeNode(element);
    else element.updateChildIndices();
    for (let element of this.dirtyNodes) if (element instanceof $681cc3c98f569e39$export$dc064fe9e59310fd) {
      if (element.isConnected && !element.isHidden) {
        element.updateNode();
        this.addNode(element);
      }
      element.isMutated = false;
    }
    this.dirtyNodes.clear();
    if (this.nextCollection) {
      var _this_firstVisibleChild, _this_lastVisibleChild;
      var _this_firstVisibleChild_node_key, _this_lastVisibleChild_node_key;
      this.nextCollection.commit((_this_firstVisibleChild_node_key = (_this_firstVisibleChild = this.firstVisibleChild) === null || _this_firstVisibleChild === void 0 ? void 0 : _this_firstVisibleChild.node.key) !== null && _this_firstVisibleChild_node_key !== void 0 ? _this_firstVisibleChild_node_key : null, (_this_lastVisibleChild_node_key = (_this_lastVisibleChild = this.lastVisibleChild) === null || _this_lastVisibleChild === void 0 ? void 0 : _this_lastVisibleChild.node.key) !== null && _this_lastVisibleChild_node_key !== void 0 ? _this_lastVisibleChild_node_key : null, this.isSSR);
      if (!this.isSSR) {
        this.collection = this.nextCollection;
        this.nextCollection = null;
      }
    }
  }
  queueUpdate() {
    if (this.dirtyNodes.size === 0 || this.queuedRender) return;
    this.queuedRender = true;
    this.inSubscription = true;
    for (let fn of this.subscriptions) fn();
    this.inSubscription = false;
  }
  subscribe(fn) {
    this.subscriptions.add(fn);
    return () => this.subscriptions.delete(fn);
  }
  resetAfterSSR() {
    if (this.isSSR) {
      this.isSSR = false;
      this.firstChild = null;
      this.lastChild = null;
      this.nodeId = 0;
    }
  }
  constructor(collection) {
    super(null), this.nodeType = 11, this.ownerDocument = this, this.dirtyNodes = /* @__PURE__ */ new Set(), this.isSSR = false, this.nodeId = 0, this.nodesByProps = /* @__PURE__ */ new WeakMap(), this.isMounted = true, this.nextCollection = null, this.subscriptions = /* @__PURE__ */ new Set(), this.queuedRender = false, this.inSubscription = false;
    this.collection = collection;
    this.nextCollection = collection;
  }
}
function $e948873055cbafe4$export$727c8fc270210f13(props) {
  let { children, items, idScope, addIdAndValue, dependencies = [] } = props;
  let cache = reactExports.useMemo(() => /* @__PURE__ */ new WeakMap(), dependencies);
  return reactExports.useMemo(() => {
    if (items && typeof children === "function") {
      let res = [];
      for (let item of items) {
        let rendered = cache.get(item);
        if (!rendered) {
          rendered = children(item);
          var _rendered_props_id, _ref;
          let key = (_ref = (_rendered_props_id = rendered.props.id) !== null && _rendered_props_id !== void 0 ? _rendered_props_id : item.key) !== null && _ref !== void 0 ? _ref : item.id;
          if (key == null) throw new Error("Could not determine key for item");
          if (idScope) key = idScope + ":" + key;
          rendered = reactExports.cloneElement(rendered, addIdAndValue ? {
            key,
            id: key,
            value: item
          } : {
            key
          });
          cache.set(item, rendered);
        }
        res.push(rendered);
      }
      return res;
    } else if (typeof children !== "function") return children;
  }, [
    children,
    items,
    cache,
    idScope,
    addIdAndValue
  ]);
}
var shim$1 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports;
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
{
  shim$1.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$1.exports;
const $e1995378a142960e$var$ShallowRenderContext = /* @__PURE__ */ reactExports.createContext(false);
const $e1995378a142960e$var$CollectionDocumentContext = /* @__PURE__ */ reactExports.createContext(null);
function $e1995378a142960e$export$bf788dd355e3a401(props) {
  let doc = reactExports.useContext($e1995378a142960e$var$CollectionDocumentContext);
  if (doc)
    return props.content;
  let { collection, document } = $e1995378a142960e$var$useCollectionDocument(props.createCollection);
  return /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, /* @__PURE__ */ React$1.createElement($f39a9eba43920ace$export$8dc98ba7eadeaa56, null, /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$CollectionDocumentContext.Provider, {
    value: document
  }, props.content)), /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$CollectionInner, {
    render: props.children,
    collection
  }));
}
function $e1995378a142960e$var$CollectionInner({ collection, render }) {
  return render(collection);
}
function $e1995378a142960e$var$useSyncExternalStoreFallback(subscribe, getSnapshot, getServerSnapshot) {
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  let isSSRRef = reactExports.useRef(isSSR);
  isSSRRef.current = isSSR;
  let getSnapshotWrapper = reactExports.useCallback(() => {
    return isSSRRef.current ? getServerSnapshot() : getSnapshot();
  }, [
    getSnapshot,
    getServerSnapshot
  ]);
  return shimExports.useSyncExternalStore(subscribe, getSnapshotWrapper);
}
const $e1995378a142960e$var$useSyncExternalStore = typeof React$1["useSyncExternalStore"] === "function" ? React$1["useSyncExternalStore"] : $e1995378a142960e$var$useSyncExternalStoreFallback;
function $e1995378a142960e$var$useCollectionDocument(createCollection) {
  let [document] = reactExports.useState(() => new $681cc3c98f569e39$export$b34a105447964f9f((createCollection === null || createCollection === void 0 ? void 0 : createCollection()) || new $23b9f4fcf0fe224b$export$408d25a4e12db025()));
  let subscribe = reactExports.useCallback((fn) => document.subscribe(fn), [
    document
  ]);
  let getSnapshot = reactExports.useCallback(() => {
    let collection2 = document.getCollection();
    if (document.isSSR)
      document.resetAfterSSR();
    return collection2;
  }, [
    document
  ]);
  let getServerSnapshot = reactExports.useCallback(() => {
    document.isSSR = true;
    return document.getCollection();
  }, [
    document
  ]);
  let collection = $e1995378a142960e$var$useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    document.isMounted = true;
    return () => {
      document.isMounted = false;
    };
  }, [
    document
  ]);
  return {
    collection,
    document
  };
}
const $e1995378a142960e$var$SSRContext = /* @__PURE__ */ reactExports.createContext(null);
function $e1995378a142960e$var$useSSRCollectionNode(Type, props, ref, rendered, children, render) {
  let itemRef = reactExports.useCallback((element) => {
    element === null || element === void 0 ? void 0 : element.setProps(props, ref, rendered, render);
  }, [
    props,
    ref,
    rendered,
    render
  ]);
  let parentNode = reactExports.useContext($e1995378a142960e$var$SSRContext);
  if (parentNode) {
    let element = parentNode.ownerDocument.nodesByProps.get(props);
    if (!element) {
      element = parentNode.ownerDocument.createElement(Type);
      element.setProps(props, ref, rendered, render);
      parentNode.appendChild(element);
      parentNode.ownerDocument.updateCollection();
      parentNode.ownerDocument.nodesByProps.set(props, element);
    }
    return children ? /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$SSRContext.Provider, {
      value: element
    }, children) : null;
  }
  return /* @__PURE__ */ React$1.createElement(Type, {
    ref: itemRef
  }, children);
}
function $e1995378a142960e$export$18af5c7a9e9b3664(type, render) {
  let Component = ({ node }) => render(node.props, node.props.ref, node);
  let Result = reactExports.forwardRef((props, ref) => {
    let focusableProps = reactExports.useContext($f645667febf57a63$export$f9762fab77588ecb);
    let isShallow = reactExports.useContext($e1995378a142960e$var$ShallowRenderContext);
    if (!isShallow) {
      if (render.length >= 3) throw new Error(render.name + " cannot be rendered outside a collection.");
      return render(props, ref);
    }
    return $e1995378a142960e$var$useSSRCollectionNode(type, props, ref, "children" in props ? props.children : null, null, (node) => (
      // Forward FocusableContext to real DOM tree so tooltips work.
      /* @__PURE__ */ React$1.createElement($f645667febf57a63$export$f9762fab77588ecb.Provider, {
        value: focusableProps
      }, /* @__PURE__ */ React$1.createElement(Component, {
        node
      }))
    ));
  });
  Result.displayName = render.name;
  return Result;
}
function $e1995378a142960e$var$useCollectionChildren(options) {
  return $e948873055cbafe4$export$727c8fc270210f13({
    ...options,
    addIdAndValue: true
  });
}
const $e1995378a142960e$var$CollectionContext = /* @__PURE__ */ reactExports.createContext(null);
function $e1995378a142960e$export$fb8073518f34e6ec(props) {
  let ctx = reactExports.useContext($e1995378a142960e$var$CollectionContext);
  let dependencies = ((ctx === null || ctx === void 0 ? void 0 : ctx.dependencies) || []).concat(props.dependencies);
  let idScope = props.idScope || (ctx === null || ctx === void 0 ? void 0 : ctx.idScope);
  let children = $e1995378a142960e$var$useCollectionChildren({
    ...props,
    idScope,
    dependencies
  });
  let doc = reactExports.useContext($e1995378a142960e$var$CollectionDocumentContext);
  if (doc) children = /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$CollectionRoot, null, children);
  ctx = reactExports.useMemo(() => ({
    dependencies,
    idScope
  }), [
    idScope,
    ...dependencies
  ]);
  return /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$CollectionContext.Provider, {
    value: ctx
  }, children);
}
function $e1995378a142960e$var$CollectionRoot({ children }) {
  let doc = reactExports.useContext($e1995378a142960e$var$CollectionDocumentContext);
  let wrappedChildren = reactExports.useMemo(() => /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$CollectionDocumentContext.Provider, {
    value: null
  }, /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$ShallowRenderContext.Provider, {
    value: true
  }, children)), [
    children
  ]);
  return $b5e257d569688ac6$export$535bd6ca7f90a273() ? /* @__PURE__ */ React$1.createElement($e1995378a142960e$var$SSRContext.Provider, {
    value: doc
  }, wrappedChildren) : /* @__PURE__ */ reactDomExports.createPortal(wrappedChildren, doc);
}
var $b91590b2dc47de39$exports = {};
$b91590b2dc47de39$exports = {
  "breadcrumbs": `عناصر الواجهة`
};
var $55b0693b2cf3fe91$exports = {};
$55b0693b2cf3fe91$exports = {
  "breadcrumbs": `Трохи хляб`
};
var $6ec1ed7729e948cc$exports = {};
$6ec1ed7729e948cc$exports = {
  "breadcrumbs": `Popis cesty`
};
var $5a41bb2baa6861e4$exports = {};
$5a41bb2baa6861e4$exports = {
  "breadcrumbs": `Brødkrummer`
};
var $f28bbea439e87eca$exports = {};
$f28bbea439e87eca$exports = {
  "breadcrumbs": `Breadcrumbs`
};
var $b3eca51cb720961a$exports = {};
$b3eca51cb720961a$exports = {
  "breadcrumbs": `Πλοηγήσεις breadcrumb`
};
var $0b39b205118db415$exports = {};
$0b39b205118db415$exports = {
  "breadcrumbs": `Breadcrumbs`
};
var $f467c0ee7bfb0950$exports = {};
$f467c0ee7bfb0950$exports = {
  "breadcrumbs": `Migas de pan`
};
var $ab711d2ffb4cdf3d$exports = {};
$ab711d2ffb4cdf3d$exports = {
  "breadcrumbs": `Lingiread`
};
var $b63105d663e6f9d5$exports = {};
$b63105d663e6f9d5$exports = {
  "breadcrumbs": `Navigointilinkit`
};
var $9d2ed7be7fcdc2a1$exports = {};
$9d2ed7be7fcdc2a1$exports = {
  "breadcrumbs": `Chemin de navigation`
};
var $c5704294d85c7b5d$exports = {};
$c5704294d85c7b5d$exports = {
  "breadcrumbs": `שבילי ניווט`
};
var $20c975671d6bbc63$exports = {};
$20c975671d6bbc63$exports = {
  "breadcrumbs": `Navigacijski putovi`
};
var $2569ca3917233115$exports = {};
$2569ca3917233115$exports = {
  "breadcrumbs": `Morzsamenü`
};
var $caa152f7f8e96c85$exports = {};
$caa152f7f8e96c85$exports = {
  "breadcrumbs": `Breadcrumb`
};
var $cbc6af0cc98fad10$exports = {};
$cbc6af0cc98fad10$exports = {
  "breadcrumbs": `パンくずリスト`
};
var $ad9be5d332b4d607$exports = {};
$ad9be5d332b4d607$exports = {
  "breadcrumbs": `탐색 표시`
};
var $659de19a00ff9617$exports = {};
$659de19a00ff9617$exports = {
  "breadcrumbs": `Naršymo kelias`
};
var $173e9fb4d14fe309$exports = {};
$173e9fb4d14fe309$exports = {
  "breadcrumbs": `Atpakaļceļi`
};
var $d8e2640a066567a9$exports = {};
$d8e2640a066567a9$exports = {
  "breadcrumbs": `Navigasjonsstier`
};
var $d71fd764236c0d12$exports = {};
$d71fd764236c0d12$exports = {
  "breadcrumbs": `Broodkruimels`
};
var $f4ad3faf9f4aaec6$exports = {};
$f4ad3faf9f4aaec6$exports = {
  "breadcrumbs": `Struktura nawigacyjna`
};
var $9703be9d55d8e9c2$exports = {};
$9703be9d55d8e9c2$exports = {
  "breadcrumbs": `Caminho detalhado`
};
var $7e23baec8a14f309$exports = {};
$7e23baec8a14f309$exports = {
  "breadcrumbs": `Categorias`
};
var $568f95594049d56e$exports = {};
$568f95594049d56e$exports = {
  "breadcrumbs": `Miez de pâine`
};
var $625df06cecc70764$exports = {};
$625df06cecc70764$exports = {
  "breadcrumbs": `Навигация`
};
var $b5a67525f3a2f594$exports = {};
$b5a67525f3a2f594$exports = {
  "breadcrumbs": `Navigačné prvky Breadcrumbs`
};
var $16125922964febca$exports = {};
$16125922964febca$exports = {
  "breadcrumbs": `Drobtine`
};
var $de104bf355206bcf$exports = {};
$de104bf355206bcf$exports = {
  "breadcrumbs": `Putanje navigacije`
};
var $d5ab76bcbadc9c07$exports = {};
$d5ab76bcbadc9c07$exports = {
  "breadcrumbs": `Sökvägar`
};
var $a6a1af5968159b55$exports = {};
$a6a1af5968159b55$exports = {
  "breadcrumbs": `İçerik haritaları`
};
var $5204a30f0d17ffec$exports = {};
$5204a30f0d17ffec$exports = {
  "breadcrumbs": `Навігаційна стежка`
};
var $8d15e736e12d3dfd$exports = {};
$8d15e736e12d3dfd$exports = {
  "breadcrumbs": `导航栏`
};
var $f8c49dd804b75140$exports = {};
$f8c49dd804b75140$exports = {
  "breadcrumbs": `導覽列`
};
var $8229b34715874f89$exports = {};
$8229b34715874f89$exports = {
  "ar-AE": $b91590b2dc47de39$exports,
  "bg-BG": $55b0693b2cf3fe91$exports,
  "cs-CZ": $6ec1ed7729e948cc$exports,
  "da-DK": $5a41bb2baa6861e4$exports,
  "de-DE": $f28bbea439e87eca$exports,
  "el-GR": $b3eca51cb720961a$exports,
  "en-US": $0b39b205118db415$exports,
  "es-ES": $f467c0ee7bfb0950$exports,
  "et-EE": $ab711d2ffb4cdf3d$exports,
  "fi-FI": $b63105d663e6f9d5$exports,
  "fr-FR": $9d2ed7be7fcdc2a1$exports,
  "he-IL": $c5704294d85c7b5d$exports,
  "hr-HR": $20c975671d6bbc63$exports,
  "hu-HU": $2569ca3917233115$exports,
  "it-IT": $caa152f7f8e96c85$exports,
  "ja-JP": $cbc6af0cc98fad10$exports,
  "ko-KR": $ad9be5d332b4d607$exports,
  "lt-LT": $659de19a00ff9617$exports,
  "lv-LV": $173e9fb4d14fe309$exports,
  "nb-NO": $d8e2640a066567a9$exports,
  "nl-NL": $d71fd764236c0d12$exports,
  "pl-PL": $f4ad3faf9f4aaec6$exports,
  "pt-BR": $9703be9d55d8e9c2$exports,
  "pt-PT": $7e23baec8a14f309$exports,
  "ro-RO": $568f95594049d56e$exports,
  "ru-RU": $625df06cecc70764$exports,
  "sk-SK": $b5a67525f3a2f594$exports,
  "sl-SI": $16125922964febca$exports,
  "sr-SP": $de104bf355206bcf$exports,
  "sv-SE": $d5ab76bcbadc9c07$exports,
  "tr-TR": $a6a1af5968159b55$exports,
  "uk-UA": $5204a30f0d17ffec$exports,
  "zh-CN": $8d15e736e12d3dfd$exports,
  "zh-TW": $f8c49dd804b75140$exports
};
const $148a7a147e38ea7f$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
const $148a7a147e38ea7f$var$RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
  if (Intl.Locale) {
    let locale = new Intl.Locale(localeString).maximize();
    let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
    if (textInfo) return textInfo.direction === "rtl";
    if (locale.script) return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
  }
  let lang = localeString.split("-")[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}
const $1e5a04cdaf7d1af8$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch {
    locale = "en-US";
  }
  return {
    locale,
    direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
  };
}
let $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
let $1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
  $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
  for (let listener of $1e5a04cdaf7d1af8$var$listeners) listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  let [defaultLocale, setDefaultLocale] = reactExports.useState($1e5a04cdaf7d1af8$var$currentLocale);
  reactExports.useEffect(() => {
    if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
    return () => {
      $1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
      if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    };
  }, []);
  if (isSSR) return {
    locale: "en-US",
    direction: "ltr"
  };
  return defaultLocale;
}
const $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ React$1.createContext(null);
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let context = reactExports.useContext($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}
const $5b160d28a433310d$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
const $5b160d28a433310d$var$stringsSymbol = Symbol.for("react-aria.i18n.strings");
let $5b160d28a433310d$var$cachedGlobalStrings = void 0;
class $5b160d28a433310d$export$c17fa47878dc55b6 {
  /** Returns a localized string for the given key and locale. */
  getStringForLocale(key, locale) {
    let strings = this.getStringsForLocale(locale);
    let string = strings[key];
    if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
    return string;
  }
  /** Returns all localized strings for the given locale. */
  getStringsForLocale(locale) {
    let strings = this.strings[locale];
    if (!strings) {
      strings = $5b160d28a433310d$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
      this.strings[locale] = strings;
    }
    return strings;
  }
  static getGlobalDictionaryForPackage(packageName) {
    if (typeof window === "undefined") return null;
    let locale = window[$5b160d28a433310d$var$localeSymbol];
    if ($5b160d28a433310d$var$cachedGlobalStrings === void 0) {
      let globalStrings = window[$5b160d28a433310d$var$stringsSymbol];
      if (!globalStrings) return null;
      $5b160d28a433310d$var$cachedGlobalStrings = {};
      for (let pkg in globalStrings) $5b160d28a433310d$var$cachedGlobalStrings[pkg] = new $5b160d28a433310d$export$c17fa47878dc55b6({
        [locale]: globalStrings[pkg]
      }, locale);
    }
    let dictionary = $5b160d28a433310d$var$cachedGlobalStrings === null || $5b160d28a433310d$var$cachedGlobalStrings === void 0 ? void 0 : $5b160d28a433310d$var$cachedGlobalStrings[packageName];
    if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
    return dictionary;
  }
  constructor(messages, defaultLocale = "en-US") {
    this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v));
    this.defaultLocale = defaultLocale;
  }
}
function $5b160d28a433310d$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
  if (strings[locale]) return strings[locale];
  let language = $5b160d28a433310d$var$getLanguage(locale);
  if (strings[language]) return strings[language];
  for (let key in strings) {
    if (key.startsWith(language + "-")) return strings[key];
  }
  return strings[defaultLocale];
}
function $5b160d28a433310d$var$getLanguage(locale) {
  if (Intl.Locale)
    return new Intl.Locale(locale).language;
  return locale.split("-")[0];
}
const $6db58dc88e78b024$var$pluralRulesCache = /* @__PURE__ */ new Map();
const $6db58dc88e78b024$var$numberFormatCache = /* @__PURE__ */ new Map();
class $6db58dc88e78b024$export$2f817fcdc4b89ae0 {
  /** Formats a localized string for the given key with the provided variables. */
  format(key, variables) {
    let message = this.strings.getStringForLocale(key, this.locale);
    return typeof message === "function" ? message(variables, this) : message;
  }
  plural(count, options, type = "cardinal") {
    let opt = options["=" + count];
    if (opt) return typeof opt === "function" ? opt() : opt;
    let key = this.locale + ":" + type;
    let pluralRules = $6db58dc88e78b024$var$pluralRulesCache.get(key);
    if (!pluralRules) {
      pluralRules = new Intl.PluralRules(this.locale, {
        type
      });
      $6db58dc88e78b024$var$pluralRulesCache.set(key, pluralRules);
    }
    let selected = pluralRules.select(count);
    opt = options[selected] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
  number(value) {
    let numberFormat = $6db58dc88e78b024$var$numberFormatCache.get(this.locale);
    if (!numberFormat) {
      numberFormat = new Intl.NumberFormat(this.locale);
      $6db58dc88e78b024$var$numberFormatCache.set(this.locale, numberFormat);
    }
    return numberFormat.format(value);
  }
  select(options, value) {
    let opt = options[value] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
  constructor(locale, strings) {
    this.locale = locale;
    this.strings = strings;
  }
}
const $fca6afa0e843324b$var$cache = /* @__PURE__ */ new WeakMap();
function $fca6afa0e843324b$var$getCachedDictionary(strings) {
  let dictionary = $fca6afa0e843324b$var$cache.get(strings);
  if (!dictionary) {
    dictionary = new $5b160d28a433310d$export$c17fa47878dc55b6(strings);
    $fca6afa0e843324b$var$cache.set(strings, dictionary);
  }
  return dictionary;
}
function $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName) {
  return packageName && $5b160d28a433310d$export$c17fa47878dc55b6.getGlobalDictionaryForPackage(packageName) || $fca6afa0e843324b$var$getCachedDictionary(strings);
}
function $fca6afa0e843324b$export$f12b703ca79dfbb1(strings, packageName) {
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let dictionary = $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName);
  return reactExports.useMemo(() => new $6db58dc88e78b024$export$2f817fcdc4b89ae0(locale, dictionary), [
    locale,
    dictionary
  ]);
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $848231d7a2b3998e$export$8cefe241bd876ca0(props) {
  let { "aria-label": ariaLabel, ...otherProps } = props;
  let strings = $fca6afa0e843324b$export$f12b703ca79dfbb1($parcel$interopDefault($8229b34715874f89$exports), "@react-aria/breadcrumbs");
  return {
    navProps: {
      ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps, {
        labelable: true
      }),
      "aria-label": ariaLabel || strings.format("breadcrumbs")
    }
  };
}
const $7135fc7d473fd974$export$a164736487e3f0ae = {
  CollectionRoot({ collection, renderDropIndicator }) {
    return $7135fc7d473fd974$var$useCollectionRender(collection, null, renderDropIndicator);
  },
  CollectionBranch({ collection, parent, renderDropIndicator }) {
    return $7135fc7d473fd974$var$useCollectionRender(collection, parent, renderDropIndicator);
  }
};
function $7135fc7d473fd974$var$useCollectionRender(collection, parent, renderDropIndicator) {
  return $e948873055cbafe4$export$727c8fc270210f13({
    items: parent ? collection.getChildren(parent.key) : collection,
    dependencies: [
      renderDropIndicator
    ],
    children(node) {
      let rendered = node.render(node);
      if (!renderDropIndicator || node.type !== "item") return rendered;
      return /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, renderDropIndicator({
        type: "item",
        key: node.key,
        dropPosition: "before"
      }), rendered, $7135fc7d473fd974$export$2dbbd341daed716d(collection, node, renderDropIndicator));
    }
  });
}
function $7135fc7d473fd974$export$2dbbd341daed716d(collection, node, renderDropIndicator) {
  let key = node.key;
  let keyAfter = collection.getKeyAfter(key);
  let nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
  while (nextItemInFlattenedCollection != null && nextItemInFlattenedCollection.type !== "item") {
    keyAfter = collection.getKeyAfter(nextItemInFlattenedCollection.key);
    nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
  }
  let nextItemInSameLevel = node.nextKey != null ? collection.getItem(node.nextKey) : null;
  while (nextItemInSameLevel != null && nextItemInSameLevel.type !== "item") nextItemInSameLevel = nextItemInSameLevel.nextKey != null ? collection.getItem(nextItemInSameLevel.nextKey) : null;
  let afterIndicators = [];
  if (nextItemInSameLevel == null) {
    let current = node;
    while (current && (!nextItemInFlattenedCollection || current.parentKey !== nextItemInFlattenedCollection.parentKey && nextItemInFlattenedCollection.level < current.level)) {
      let indicator = renderDropIndicator({
        type: "item",
        key: current.key,
        dropPosition: "after"
      });
      if (/* @__PURE__ */ reactExports.isValidElement(indicator)) afterIndicators.push(/* @__PURE__ */ reactExports.cloneElement(indicator, {
        key: `${current.key}-after`
      }));
      current = current.parentKey != null ? collection.getItem(current.parentKey) : null;
    }
  }
  return afterIndicators;
}
const $7135fc7d473fd974$export$4feb769f8ddf26c5 = /* @__PURE__ */ reactExports.createContext($7135fc7d473fd974$export$a164736487e3f0ae);
const $778035c5624f61e7$export$65596d3621b0a4a0 = /* @__PURE__ */ reactExports.createContext(null);
const $778035c5624f61e7$export$2dc68d50d56fbbd = /* @__PURE__ */ reactExports.forwardRef(function Breadcrumbs(props, ref) {
  [props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $778035c5624f61e7$export$65596d3621b0a4a0);
  let { CollectionRoot } = reactExports.useContext($7135fc7d473fd974$export$4feb769f8ddf26c5);
  let { navProps } = $848231d7a2b3998e$export$8cefe241bd876ca0(props);
  return /* @__PURE__ */ React$1.createElement($e1995378a142960e$export$bf788dd355e3a401, {
    content: /* @__PURE__ */ React$1.createElement($e1995378a142960e$export$fb8073518f34e6ec, props)
  }, (collection) => {
    var _props_className;
    return /* @__PURE__ */ React$1.createElement("ol", {
      ref,
      ...navProps,
      slot: props.slot || void 0,
      style: props.style,
      className: (_props_className = props.className) !== null && _props_className !== void 0 ? _props_className : "react-aria-Breadcrumbs"
    }, /* @__PURE__ */ React$1.createElement($778035c5624f61e7$export$65596d3621b0a4a0.Provider, {
      value: props
    }, /* @__PURE__ */ React$1.createElement(CollectionRoot, {
      collection
    })));
  });
});
const $778035c5624f61e7$export$dabcc1ec9dd9d1cc = /* @__PURE__ */ $e1995378a142960e$export$18af5c7a9e9b3664("item", function Breadcrumb(props, ref, node) {
  let isCurrent = node.nextKey == null;
  let { isDisabled, onAction } = $64fa3d84918910a7$export$fabf2dc03a41866e($778035c5624f61e7$export$65596d3621b0a4a0);
  let linkProps = {
    "aria-current": isCurrent ? "page" : null,
    isDisabled: isDisabled || isCurrent,
    onPress: () => onAction === null || onAction === void 0 ? void 0 : onAction(node.key)
  };
  let renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
    ...node.props,
    children: node.rendered,
    values: {
      isDisabled: isDisabled || isCurrent,
      isCurrent
    },
    defaultClassName: "react-aria-Breadcrumb"
  });
  return /* @__PURE__ */ React$1.createElement("li", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(props),
    ...renderProps,
    ref,
    "data-disabled": isDisabled || isCurrent || void 0,
    "data-current": isCurrent || void 0
  }, /* @__PURE__ */ React$1.createElement($4f118338184dc1d9$export$e2509388b49734e7.Provider, {
    value: linkProps
  }, renderProps.children));
});
var focusRing = ce({
  base: "outline-quanta-cobalt outline forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-3"
    }
  }
});
function composeTailwindRenderProps(className, tw) {
  return $64fa3d84918910a7$export$c245e6201fed2f75(className, (className2) => twMerge(tw, className2));
}
ce({
  extend: focusRing,
  base: "cursor-default rounded-md px-3 py-1.5 text-center text-base font-medium transition hover:shadow-sm focus:shadow-sm active:shadow-md has-[svg]:rounded-full has-[svg]:p-1.5 has-[svg]:text-xs",
  variants: {
    variant: {
      neutral: "pressed:bg-quanta-cobalt bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-snow text-quanta-iron has-[svg]:text-quanta-iron",
      primary: "pressed:bg-quanta-cobalt bg-quanta-air hover:bg-quanta-arctic hover:text-quanta-royal active:bg-quanta-sky active:text-quanta-royal focus:bg-quanta-artic focus:text-quanta-royal text-quanta-sapphire",
      destructive: "pressed:bg-quanta-rose active:bg-quanta-flamingo bg-quanta-air hover:bg-quanta-ballet hover:text-quanta-wine active:text-quanta-wine focus:bg-quanta-ballet focus:text-quanta-wine text-quanta-candy",
      icon: "pressed:bg-quanta-cobalt pressed:[&_svg]:text-white bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-artic text-quanta-iron has-[svg]:text-quanta-iron flex items-center justify-center border-0 p-1"
    },
    accent: {
      true: ""
    },
    size: {
      S: "text-xs has-[svg]:p-1.5 [&_svg]:size-5",
      L: "px-4.5 py-3 text-xl/6 has-[svg]:p-3 has-[svg]:text-xs"
    },
    isDisabled: {
      true: "bg-quanta-air hover:bg-quanta-air hover:text-quanta-silver has-[svg]:hover:text-quanta-silver text-quanta-smoke has-[svg]:text-quanta-smoke cursor-not-allowed"
    }
  },
  compoundVariants: [
    {
      variant: "neutral",
      accent: true,
      class: "pressed:bg-quanta-smoke focus:bg-quanta-smoke bg-quanta-snow hover:bg-quanta-smoke active:bg-quanta-silver text-quanta-iron"
    },
    {
      variant: "primary",
      accent: true,
      class: "text-quanta-air pressed:bg-quanta-cobalt bg-quanta-sapphire hover:bg-quanta-royal hover:text-quanta-air active:text-quanta-air focus:text-quanta-air active:bg-quanta-cobalt focus:bg-quanta-royal"
    },
    {
      variant: "icon",
      accent: true,
      class: "pressed:bg-quanta-cobalt pressed:[&_svg]:text-white bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-artic text-quanta-iron has-[svg]:text-quanta-iron flex items-center justify-center border-0 p-1"
    },
    {
      variant: "destructive",
      accent: true,
      class: "pressed:bg-quanta-rose active:bg-quanta-rose bg-quanta-candy hover:bg-quanta-wine focus:bg-quanta-wine text-quanta-air hover:text-quanta-air active:text-quanta-air focus:text-quanta-air"
    },
    {
      isDisabled: true,
      accent: true,
      class: "bg-quanta-snow hover:bg-quanta-smoke text-quanta-silver"
    }
  ],
  defaultVariants: {
    variant: "neutral"
  }
});
var styles = ce({
  extend: focusRing,
  base: "rounded-xs underline transition disabled:cursor-default disabled:no-underline forced-colors:disabled:text-[GrayText]",
  variants: {
    variant: {
      primary: "text-quanta-sapphire decoration-quanta-sapphire/40 hover:decoration-quanta-royal hover:text-quanta-royal active:text-quanta-cobalt active:decoration-quanta-cobalt focus:decoration-quanta-royal focus:text-quanta-royal underline",
      secondary: "text-gray-700 underline decoration-gray-700/50 hover:decoration-gray-700"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});
function Link(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $4f118338184dc1d9$export$a6c7ac8248d6e38a,
    {
      ...props,
      className: $64fa3d84918910a7$export$c245e6201fed2f75(
        props.className,
        (className, renderProps) => styles({ ...renderProps, className, variant: props.variant })
      )
    }
  );
}
function Breadcrumb2(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $778035c5624f61e7$export$dabcc1ec9dd9d1cc,
    {
      ...props,
      className: composeTailwindRenderProps(
        props.className,
        "flex items-center gap-1 [&_a>svg]:mx-1 [&_a>svg]:inline [&_a>svg]:align-text-top"
      ),
      children: ({ isCurrent }) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          ((_a = props.value) == null ? void 0 : _a.icon) && ((_b = props.value) == null ? void 0 : _b.icon),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { variant: "secondary", ...props }),
          !isCurrent && (props.separator ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronrightIcon, { className: "h-3 w-3 text-gray-600" }))
        ] });
      }
    }
  );
}
function Breadcrumbs2(props) {
  const { root, items } = props;
  let itemsWithRoot;
  if (root && items) {
    const rootItem = {
      "@id": root["@id"] || "/",
      title: "Home",
      icon: root.icon || /* @__PURE__ */ jsxRuntimeExports.jsx(HomeIcon, { size: "sm" })
    };
    itemsWithRoot = [rootItem, ...items];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $778035c5624f61e7$export$2dc68d50d56fbbd,
    {
      ...props,
      items: itemsWithRoot || items,
      className: twMerge("flex gap-1", props.className)
    }
  );
}
ce({
  extend: focusRing,
  base: "m-px flex h-9 w-9 cursor-default items-center justify-center rounded-full text-sm forced-color-adjust-none",
  variants: {
    isSelected: {
      false: "pressed:bg-gray-200 dark:pressed:bg-zinc-600 text-zinc-900 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-700",
      true: "bg-blue-600 text-white invalid:bg-red-600 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]"
    }
  }
});
var fieldBorderStyles = ce({
  variants: {
    isFocusWithin: {
      false: "border-gray-300 forced-colors:border-[ButtonBorder]",
      true: "inset-ring-quanta-sapphire inset-ring-2 outline-2 group-data-readonly:inset-ring-0 forced-colors:border-[Highlight]"
    },
    isInvalid: {
      true: "bg-quanta-ballet hover:bg-quanta-flamingo focus:inset-ring-quanta-candy outline-2 focus:inset-ring-2 forced-colors:border-[Mark]"
    },
    isDisabled: {
      true: "bg-quanta-air hover:bg-quanta-air text-quanta-silver forced-colors:border-[GrayText]"
    }
  }
});
ce({
  extend: focusRing,
  base: "group bg-quanta-air flex h-9 items-center overflow-hidden rounded-lg border-2 forced-colors:bg-[Field]",
  variants: fieldBorderStyles.variants
});
ce({
  base: "group flex items-center gap-2 text-sm transition",
  variants: {
    isDisabled: {
      false: "text-gray-800 dark:text-zinc-200",
      true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]"
    }
  }
});
ce({
  extend: focusRing,
  base: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition",
  variants: {
    isSelected: {
      false: "group-pressed:[--color:theme(colors.gray.500)] dark:group-pressed:[--color:theme(colors.zinc.300)] border-[--color] bg-white [--color:theme(colors.gray.400)] dark:bg-zinc-900 dark:[--color:colors.zinc-400)]",
      true: "group-pressed:[--color:theme(colors.gray.800)] dark:group-pressed:[--color:theme(colors.slate.200)] border-[--color] bg-[--color] [--color:theme(colors.gray.700)] dark:[--color:theme(colors.slate.300)] forced-colors:![--color:Highlight]"
    },
    isInvalid: {
      true: "group-pressed:[--color:theme(colors.red.800)] dark:group-pressed:[--color:theme(colors.red.700)] [--color:theme(colors.red.700)] dark:[--color:theme(colors.red.600)] forced-colors:![--color:Mark]"
    },
    isDisabled: {
      true: "[--color:theme(colors.gray.200)] dark:[--color:theme(colors.zinc.700)] forced-colors:![--color:GrayText]"
    }
  }
});
var Container = (props) => {
  const { as: Component = "div", children, width, ...rest } = props;
  const container = ce({
    base: "@container mx-auto",
    variants: {
      width: {
        layout: "max-w-(--layout-container-width)",
        default: "max-w-(--default-container-width)",
        narrow: "max-w-(--narrow-container-width)",
        full: "w-full"
      }
    },
    defaultVariants: {
      width: "full"
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Component,
    {
      ...rest,
      className: twMerge(props.className, container({ width })),
      children
    }
  );
};
ce({
  extend: focusRing,
  base: "rounded-md",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled
  }
});
ce({
  base: "rounded-xl border border-black/10 bg-white bg-clip-padding text-slate-700 shadow-2xl dark:border-white/[15%] dark:bg-zinc-900/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 duration-200 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 duration-150 ease-in"
    }
  }
});
ce({
  base: "type-literal:px-0 inline rounded-xs p-0.5 text-gray-800 caret-transparent outline outline-0 forced-color-adjust-none dark:text-zinc-200 forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-gray-600 italic dark:text-zinc-400"
    },
    isDisabled: {
      true: "text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText]"
    },
    isFocused: {
      true: "bg-blue-600 text-white dark:text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    }
  }
});
ce({
  extend: focusRing,
  base: "h-5 w-5 rounded-full border-2 bg-white transition-all dark:bg-zinc-900",
  variants: {
    isSelected: {
      false: "group-pressed:border-gray-500 dark:group-pressed:border-zinc-300 border-gray-400 dark:border-zinc-400",
      true: "group-pressed:border-gray-800 dark:group-pressed:border-slate-200 border-[7px] border-gray-700 dark:border-slate-300 forced-colors:border-[Highlight]!"
    },
    isInvalid: {
      true: "group-pressed:border-red-800 dark:group-pressed:border-red-700 border-red-700 dark:border-red-600 forced-colors:border-[Mark]!"
    },
    isDisabled: {
      true: "border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]!"
    }
  }
});
ce({
  base: "bg-gray-300 dark:bg-zinc-600 forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
ce({
  base: "",
  variants: {
    orientation: {
      vertical: "flex flex-row",
      horizontal: "flex flex-col"
    }
  }
});
ce({
  base: "flex gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start"
    }
  }
});
ce({
  extend: focusRing,
  base: "flex cursor-default items-center px-4 py-1.5 text-sm font-medium transition",
  variants: {
    isSelected: {
      false: "pressed:text-gray-700 dark:pressed:text-zinc-200 pressed:bg-gray-200 dark:pressed:bg-zinc-800 text-gray-600 hover:bg-gray-200 hover:text-gray-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
      true: "bg-gray-800 text-white dark:bg-zinc-200 dark:text-black forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
    },
    isDisabled: {
      true: "selected:text-gray-300 dark:selected:text-zinc-500 forced-colors:selected:text-[HighlightText] selected:bg-gray-200 dark:selected:bg-zinc-600 forced-colors:selected:bg-[GrayText] text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText]"
    }
  }
});
ce({
  extend: focusRing,
  base: "flex-1 p-4 text-sm text-gray-900 dark:text-zinc-100"
});
const Header = (props) => {
  const { content, location } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { width: "layout", className: "header-logo-nav-tools-wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "logo", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SlotRenderer, { name: "navigation", content, location }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-tools", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlotRenderer,
      {
        name: "headertools",
        content,
        location
      }
    ) })
  ] });
};
try {
  Header.displayName = "Header";
  Header.__docgenInfo = { "description": "", "displayName": "Header", "props": { "content": { "defaultValue": null, "description": "", "name": "content", "required": true, "type": { "name": "Content" } }, "location": { "defaultValue": null, "description": "", "name": "location", "required": true, "type": { "name": "Location<any>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  Breadcrumbs2 as B,
  Container as C,
  Header as H,
  Link as L,
  Breadcrumb2 as a
};
