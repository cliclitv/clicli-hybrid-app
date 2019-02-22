// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/fre/dist/fre.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.fre = {}));
}(this, function (exports) { 'use strict';

  const TEXT = 'text';

  function h(tag, config, ...args) {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];
    props.children = rawChildren
      .filter(c => c != null && c !== false)
      .map(c => (c instanceof Object ? c : h(TEXT, { nodeValue: c })));
    return { tag, props }
  }

  const isEvent = name => name.startsWith('on');
  const isText = name => name === 'nodeValue';
  const isAttribute = name => name === 'class' || name === 'id' || name === 'href' || name === 'target' || name === 'src';
  const isNew = (prev, next) => key => prev[key] !== next[key];

  function updateProperties(dom, prevProps, nextProps) {
    Object.keys(nextProps)
      .filter(isText)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom[name] = nextProps[name];
      });

      Object.keys(nextProps)
      .filter(isAttribute)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom.setAttribute(name,nextProps[name]);
      });   

    nextProps.style = nextProps.style || {};
    Object.keys(nextProps.style)
      .filter(isNew(prevProps.style, nextProps.style))
      .forEach(key => {
        dom.style[key] = nextProps.style[key];
      });

    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
  }

  function createElement(fiber) {
    const isTextElement = fiber.tag === TEXT;
    const dom = isTextElement
      ? document.createTextNode('')
      : document.createElement(fiber.tag);
    updateProperties(dom, [], fiber.props);
    return dom
  }

  let cursor = 0;

  function update(k, r, v) {
    r ? (v = r(this.state[k], v)) : v;
    //这里实现不太理想，之后想办法搞成微任务
    setTimeout(() => scheduleUpdate(this, k, v));
  }
  function resetCursor() {
    cursor = 0;
  }
  function useState(initState) {
    return useReducer(null, initState)
  }
  function useReducer(reducer, initState) {
    let key = '$' + cursor;
    let setter = update.bind(currentInstance, key, reducer);
    if (currentInstance) cursor++;
    let state;
    if (currentInstance) state = currentInstance.state;
    if (typeof state === 'object' && key in state) {
      return [state[key], setter]
    } else {
      if (currentInstance) currentInstance.state[key] = initState;
    }
    let value = initState;
    return [value, setter]
  }

  // 这个实现并不准确
  function useEffect(effect, inputs) {
    if (currentInstance) {
      let key = '$' + cursor;
      currentInstance.effects[key] = effect;
      cursor++;
    }
  }

  const HOST = 'host';
  const HOOK = 'hook';
  const ROOT = 'root';

  const PLACE = 1;
  const DELETE = 2;
  const UPDATE = 3;

  const ENOUGH_TIME = 1;

  const updateQueue = [];
  let nextUnitOfWork = null;
  let pendingCommit = null;
  let currentInstance = null;

  function render(vdom, el) {
    updateQueue.push({
      from: ROOT,
      dom: el,
      newProps: { children: vdom }
    });
    requestIdleCallback(performWork);
  }

  function scheduleUpdate(instance, k, v) {
    instance.state[k] = v;
    updateQueue.push({
      from: HOOK,
      instance,
      state: instance.state
    });
    requestIdleCallback(performWork);
  }

  function performWork(deadline) {
    workLoop(deadline);
    if (nextUnitOfWork || updateQueue.length > 0) {
      requestIdleCallback(performWork);
    }
  }

  function workLoop(deadline) {
    if (!nextUnitOfWork) {
      resetNextUnitOfWork();
    }
    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (pendingCommit) {
      commitAllWork(pendingCommit);
    }
    commitEffects(currentInstance.effects);
  }

  function commitEffects(effects) {
    Object.keys(effects).forEach(key => {
      let effect = effects[key];
      effect();
    });
  }

  function resetNextUnitOfWork() {
    const update = updateQueue.shift();
    if (!update) {
      return
    }

    if (update.state) {
      update.instance.__fiber.state = update.state;
    }
    const root =
      update.from == ROOT
        ? update.dom._rootContainerFiber
        : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
      type: ROOT,
      base: update.dom || root.base,
      props: update.newProps || root.props,
      alternate: root
    };
  }

  function getRoot(fiber) {
    let node = fiber;
    while (node.parent) {
      node = node.parent;
    }
    return node
  }

  function performUnitOfWork(wipFiber) {
    beginWork(wipFiber);
    if (wipFiber.child) {
      return wipFiber.child
    }
    let uow = wipFiber;
    while (uow) {
      completeWork(uow);
      if (uow.sibling) {
        return uow.sibling
      }
      uow = uow.parent;
    }
  }

  function beginWork(wipFiber) {
    if (wipFiber.type == HOOK) {
      updateHOOKComponent(wipFiber);
    } else {
      updateHostComponent(wipFiber);
    }
  }

  function updateHostComponent(wipFiber) {
    if (!wipFiber.base) {
      wipFiber.base = createElement(wipFiber);
    }

    const newChildren = wipFiber.props.children;
    reconcileChildren(wipFiber, newChildren);
  }

  function updateHOOKComponent(wipFiber) {
    let instance = wipFiber.base;
    if (instance == null) {
      instance = wipFiber.base = createInstance(wipFiber);
    } else if (wipFiber.props == instance.props && !wipFiber.state) {
      cloneChildFibers(wipFiber);
    }
    instance.props = wipFiber.props || {};
    instance.state = wipFiber.state || {};
    instance.effects = wipFiber.effects || {};
    currentInstance = instance;
    resetCursor();
    const newChildren = wipFiber.tag(wipFiber.props);
    reconcileChildren(wipFiber, newChildren);
  }

  function arrify(val) {
    return val == null ? [] : Array.isArray(val) ? val : [val]
  }

  function reconcileChildren(wipFiber, newChildren) {
    const elements = arrify(newChildren);

    let index = 0;
    let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    let newFiber = null;
    while (index < elements.length || oldFiber != null) {
      const prevFiber = newFiber;
      const element = index < elements.length && elements[index];
      const sameTag = oldFiber && element && element.tag == oldFiber.tag;

      if (sameTag) {
        newFiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          base: oldFiber.base,
          props: element.props,
          parent: wipFiber,
          alternate: oldFiber,
          state: oldFiber.state,
          effectTag: UPDATE
        };
      }

      if (element && !sameTag) {
        newFiber = {
          tag: element.tag,
          type: typeof element.tag === 'string' ? HOST : HOOK,
          props: element.props,
          parent: wipFiber,
          effectTag: PLACE
        };
      }

      if (oldFiber && !sameTag) {
        oldFiber.effectTag = DELETE;
        wipFiber.effects = wipFiber.effects || [];
        wipFiber.effects.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index == 0) {
        wipFiber.child = newFiber;
      } else if (prevFiber && element) {
        prevFiber.sibling = newFiber;
      }

      index++;
    }
  }

  function createInstance(fiber) {
    const instance = new fiber.tag(fiber.props);
    instance.__fiber = fiber;
    return instance
  }

  function cloneChildFibers(parentFiber) {
    const oldFiber = parentFiber.alternate;
    if (!oldFiber.child) {
      return
    }

    let oldChild = oldFiber.child;
    let prevChild = null;
    while (oldChild) {
      const newChild = {
        tag: oldChild.tag,
        type: oldChild.type,
        base: oldChild.base,
        props: oldChild.props,
        state: oldChild.state,
        alternate: oldChild,
        parent: parentFiber
      };
      if (prevChild) {
        prevChild.sibling = newChild;
      } else {
        parentFiber.child = newChild;
      }
      prevChild = newChild;
      oldChild = oldChild.sibling;
    }
  }

  function completeWork(fiber) {
    if (fiber.type == HOOK) {
      fiber.base.__fiber = fiber;
    }

    if (fiber.parent) {
      const childEffects = fiber.effects || [];
      const thisEffect = fiber.effectTag != null ? [fiber] : [];
      const parentEffects = fiber.parent.effects || [];
      fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
      pendingCommit = fiber;
    }
  }

  function commitAllWork(fiber) {
    fiber.effects.forEach(f => {
      commitWork(f);
    });
    fiber.base._rootContainerFiber = fiber;
    nextUnitOfWork = null;
    pendingCommit = null;
  }

  function commitWork(fiber) {
    if (fiber.type == ROOT) {
      return
    }

    let domParentFiber = fiber.parent;
    while (domParentFiber.type == HOOK) {
      domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.base;

    if (fiber.effectTag == PLACE && fiber.type == HOST) {
      domParent.appendChild(fiber.base);
    } else if (fiber.effectTag == UPDATE) {
      updateProperties(fiber.base, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag == DELETE) {
      commitDELETE(fiber, domParent);
    }
  }

  function commitDELETE(fiber, domParent) {
    let node = fiber;
    while (true) {
      if (node.type == HOOK) {
        node = node.child;
        continue
      }
      domParent.removeChild(node.base);
      while (node != fiber && !node.sibling) {
        node = node.parent;
      }
      if (node == fiber) {
        return
      }
      node = node.sibling;
    }
  }

  exports.h = h;
  exports.render = render;
  exports.useState = useState;
  exports.useReducer = useReducer;
  exports.useEffect = useEffect;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./style.css");

var _fre = require("fre");

var DOWN_URL = 'http://d0.ananas.chaoxing.com/download/ce2bc417d5d9636bf5cd9da5e09e180c?fn=clicli-beta';
var QCODE = 'https://ws1.sinaimg.cn/large/0065Zy9egy1g0eyxkjvcfj308c08cdh3.jpg';

function App() {
  return (0, _fre.h)("div", {
    class: "mainer"
  }, (0, _fre.h)("div", {
    class: "logo"
  }), (0, _fre.h)("h1", null, "\u4EBA\xB7\u751F\xB7\u5C31\xB7\u662F\xB7\u4F5B"), (0, _fre.h)("ul", {
    class: "link"
  }, (0, _fre.h)("a", {
    href: DOWN_URL,
    target: "_blank"
  }, (0, _fre.h)("li", null, "Android")), (0, _fre.h)("a", {
    href: ""
  }, (0, _fre.h)("li", null, "IOS"))), (0, _fre.h)("div", {
    class: "qcode"
  }, (0, _fre.h)("img", {
    src: QCODE,
    alt: "c\u7AD9 app"
  })));
}

(0, _fre.render)((0, _fre.h)(App, null), document.getElementById('root'));
},{"./style.css":"style.css","fre":"node_modules/fre/dist/fre.js"}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56132" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/dev.e31bb0bc.map