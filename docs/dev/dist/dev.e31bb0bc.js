// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"node_modules/fre/dist/fre-esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.h = exports.createElement = h;
exports.render = render;
exports.scheduleWork = scheduleWork;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useEffect = useEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useState = useState;
exports.options = void 0;

function h(type, config) {
  let props = config || {};
  let key = props.key || null;
  let children = [];

  for (let i = 2; i < arguments.length; i++) {
    let vnode = arguments[i];
    if (vnode === null || vnode === true || vnode === false) ;else if (vnode.pop || typeof vnode === 'object') {
      children.push(vnode);
    } else if (typeof vnode === 'function') {
      children = vnode;
    } else {
      children.push({
        type: 'text',
        props: {
          nodeValue: vnode
        }
      });
    }
  }

  props.children = children;
  return {
    type,
    props,
    key
  };
}

const arrayfy = arr => !arr ? [] : Array.isArray(arr) ? arr : [arr];

const isSame = (a, b) => a.type === b.type;

const isNew = (o, n) => k => k !== 'children' && k !== 'key' && o[k] !== n[k];

function hashfy(arr) {
  let out = {};
  let i = 0;
  let j = 0;
  const newKids = arrayfy(arr);
  newKids.forEach(item => {
    if (item.pop) {
      item.forEach(item => {
        let key = ((item || {}).props || {}).key;
        key ? out['.' + i + '.' + key] = item : (out['.' + i + '.' + j] = item) && j++;
      });
      i++;
    } else {
      (out['.' + i] = item) && i++;
    }
  });
  return out;
}

function merge(a, b) {
  let out = {};

  for (const i in a) out[i] = a[i];

  for (const i in b) out[i] = b[i];

  return out;
}

const defer = requestAnimationFrame || setTimeout;

const isFn = fn => typeof fn === 'function';

function updateProperty(dom, name, value, newValue) {
  if (name === 'style') {
    for (key in newValue) {
      let style = !newValue || !newValue[key] ? '' : newValue[key];
      dom[name][key] = style;
    }
  } else if (name[0] === 'o' && name[1] === 'n') {
    name = name.slice(2).toLowerCase();

    if (value) {
      dom.removeEventListener(name, value);
    }

    dom.addEventListener(name, newValue);
  } else {
    dom.setAttribute(name, newValue);
  }
}

function updateElement(dom, props, newProps) {
  Object.keys(newProps).filter(isNew(props, newProps)) // 进行浅比较和过滤
  .forEach(key => {
    if (key === 'value' || key === 'nodeValue') {
      dom[key] = newProps[key];
    } else {
      updateProperty(dom, key, props[key], newProps[key]);
    }
  });
}

function createElement(fiber) {
  const dom = fiber.type === 'text' ? document.createTextNode('') : document.createElement(fiber.type);
  updateElement(dom, [], fiber.props);
  return dom;
}

let cursor = 0;

function update(key, reducer, value) {
  const current = this ? this : getWIP();
  value = reducer ? reducer(current.state[key], value) : value;
  current.state[key] = value;
  scheduleWork(current);
}

function resetCursor() {
  cursor = 0;
}

function useState(initState) {
  return useReducer(null, initState);
}

function useReducer(reducer, initState) {
  let current = getWIP();
  if (!current) return [initState, setter];
  let key = '$' + cursor;
  let setter = update.bind(current, key, reducer);
  cursor++;
  let state = current.state || {};

  if (key in state) {
    return [state[key], setter];
  } else {
    current.state[key] = initState;
    return [initState, setter];
  }
}

function useEffect(cb, inputs) {
  let current = getWIP();
  if (current) current.effect = useCallback(cb, inputs);
}

function useCallback(cb, inputs) {
  return useMemo(() => cb, inputs);
}

function useMemo(cb, inputs) {
  let current = getWIP();

  if (current) {
    let hasChaged = inputs ? (current.oldInputs || []).some((v, i) => inputs[i] !== v) : true;

    if (inputs && !inputs.length && !current.isMounted) {
      hasChaged = true;
      current.isMounted = true;
    }

    current.oldInputs = inputs;
    if (hasChaged) return cb();
  }
}

function createContext(init = {}) {
  let context = init;
  let set = {};

  const update = context => {
    for (let key in set) set[key](context);
  };

  const subscribe = (fn, name) => {
    if (name in set) return;
    set[name] = fn;
  };

  return {
    context,
    update,
    subscribe,
    set
  };
}

function useContext(ctx) {
  const [context, setContext] = useState(ctx.context);
  const name = getWIP().type.name;
  ctx.subscribe(setContext, name);
  return [context, ctx.update];
}

const options = {};
exports.options = options;
const FPS = 1000 / 60;
const [HOST, HOOK, ROOT, PLACE, UPDATE, DELETE] = [0, 1, 2, 3, 4, 5];
let updateQueue = [];
let nextWork = null;
let pendingCommit = null;
let currentFiber = null;
let once = true;

function render(vnode, el) {
  let rootFiber = {
    tag: ROOT,
    base: el,
    props: {
      children: vnode
    }
  };
  scheduleWork(rootFiber);
}

function scheduleWork(fiber) {
  updateQueue.push(fiber);

  if (!nextWork) {
    nextWork = updateQueue.shift();
    defer(workLoop);
  }
}

function workLoop(startTime = 0) {
  if (startTime && performance.now() - startTime > FPS) {
    defer(workLoop);
  } else {
    const nextTime = performance.now();
    nextWork = performWork(nextWork);

    if (nextWork) {
      workLoop(nextTime);
    } else {
      options.commitWork ? options.commitWork(pendingCommit) : commitWork(pendingCommit);
    }
  }
}

function performWork(WIP) {
  WIP.tag == HOOK ? updateHOOK(WIP) : updateHost(WIP);
  if (WIP.child) return WIP.child;

  while (WIP) {
    completeWork(WIP);
    if (WIP.sibling) return WIP.sibling;
    WIP = WIP.parent;
  }
}

function updateHost(WIP) {
  if (!options.end && !WIP.base) {
    WIP.base = createElement(WIP);
  }

  let parent = WIP.parent || {};
  WIP.insertPoint = parent.oldPoint;
  parent.oldPoint = WIP;
  const children = WIP.props.children;
  reconcileChildren(WIP, children);
}

function updateHOOK(WIP) {
  WIP.props = WIP.props || {};
  WIP.state = WIP.state || {};
  currentFiber = WIP;
  resetCursor();
  const children = WIP.type(WIP.props);
  reconcileChildren(WIP, children);
  currentFiber.patches = WIP.patches;
}

function fiberize(children, WIP) {
  return WIP.children = hashfy(children, WIP.children);
}

function reconcileChildren(WIP, children) {
  const oldFibers = WIP.children;
  const newFibers = fiberize(children, WIP);
  let reused = {};

  for (let k in oldFibers) {
    let newFiber = newFibers[k];
    let oldFiber = oldFibers[k];

    if (newFiber && isSame(newFiber, oldFiber)) {
      reused[k] = oldFiber;
    } else {
      oldFiber.patchTag = DELETE;
      WIP.patches.push(oldFiber);
    }
  }

  let prevFiber = null;
  let alternate = null;

  for (let k in newFibers) {
    let newFiber = newFibers[k];
    let oldFiber = reused[k]; // console.log(newFiber,oldFiber)

    if (oldFiber) {
      alternate = createFiber(oldFiber, {
        patchTag: UPDATE
      });
      if (!options.end) newFiber.patchTag = UPDATE;
      newFiber = merge(alternate, newFiber);
      newFiber.alternate = alternate;

      if (oldFiber.key) {
        newFiber.patchTag = PLACE;
      }
    } else {
      newFiber = createFiber(newFiber, {
        patchTag: PLACE
      });
    }

    newFibers[k] = newFiber;
    newFiber.parent = WIP;

    if (prevFiber) {
      prevFiber.sibling = newFiber;
    } else {
      WIP.child = newFiber;
      newFiber.oldPoint = null;
    }

    prevFiber = newFiber;
  }

  if (prevFiber) prevFiber.sibling = null;
}

function createFiber(vnode, data) {
  data.tag = isFn(vnode.type) ? HOOK : HOST;
  vnode.props = vnode.props;
  return merge(vnode, data);
}

function completeWork(fiber) {
  if (!options.end && fiber.parent) {
    fiber.parent.patches = (fiber.parent.patches || []).concat(fiber.patches || [], fiber.patchTag ? [fiber] : []);
  } else {
    pendingCommit = fiber;
  }
}

function commitWork(WIP) {
  WIP.patches.forEach(p => commit(p));
  once = false;
  nextWork = null;
  pendingCommit = null;
}

function commit(fiber) {
  let p = fiber.parent;

  while (p.tag == HOOK) p = p.parent;

  const parent = p.base;
  let dom = fiber.base || fiber.child.base;
  p.patches = fiber.patches = [];
  if (fiber.parent.tag == ROOT) return;

  switch (fiber.patchTag) {
    case UPDATE:
      updateElement(dom, fiber.alternate.props, fiber.props);
      break;

    case DELETE:
      parent.removeChild(dom);
      break;

    default:
      const insertPoint = fiber.insertPoint;
      let point = insertPoint ? insertPoint.base : null;
      let after = point ? point.nextSibling : parent.firstChild;
      if (after == dom) return;
      if (after === null && dom === parent.lastChild) return;
      if (once) after = null;
      parent.insertBefore(dom, after);
      break;
  }
}

function getWIP() {
  return currentFiber || null;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./style.css");

var _fre = require("fre");

var DOWN1 = 'https://cdn.jsdelivr.net/gh/cliclitv/clicli-hybrid-app@master/bin/clicli.apk';
var DOWN2 = 'https://cdn.staticaly.com/gh/cliclitv/clicli-hybrid-app/master/bin/clicli.apk?env=dev';
var QCODE = 'https://ae01.alicdn.com/kf/Had6fa2a0d8e54465820740a3317a8725t.png';

function App() {
  return (0, _fre.h)("div", {
    class: "main"
  }, (0, _fre.h)("div", {
    class: "left"
  }, (0, _fre.h)("div", {
    class: "logo"
  }), (0, _fre.h)("h1", null, "\u4EBA\xB7\u751F\xB7\u5C31\xB7\u662F\xB7\u4F5B"), (0, _fre.h)("ul", {
    class: "link"
  }, (0, _fre.h)("a", {
    href: DOWN1,
    target: "_blank"
  }, (0, _fre.h)("li", null, "\u4E0B\u8F7D\u4E00\uFF08\u56FD\u5185\uFF09")), (0, _fre.h)("a", {
    href: DOWN2,
    target: "_blank"
  }, (0, _fre.h)("li", null, "\u4E0B\u8F7D\u4E8C\uFF08\u56FD\u5916\uFF09"))), (0, _fre.h)("div", {
    class: "qcode"
  }, (0, _fre.h)("img", {
    src: QCODE,
    alt: "c\u7AD9 app"
  }))), (0, _fre.h)("div", {
    class: "right"
  }));
}

(0, _fre.render)((0, _fre.h)(App, null), document.getElementById('root'));
},{"./style.css":"style.css","fre":"node_modules/fre/dist/fre-esm.js"}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "13333" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/dev.e31bb0bc.js.map