parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"2iMt":[function(require,module,exports) {

},{}],"6oLy":[function(require,module,exports) {
var define;
var global = arguments[3];
var t,e=arguments[3];!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof t&&t.amd?t(["exports"],n):n((e=e||self).fre={})}(this,function(t){"use strict";const e="text";const n=t=>t.startsWith("on"),s=t=>"nodeValue"===t,r=t=>"class"===t||"id"===t||"href"===t||"target"===t||"src"===t,a=(t,e)=>n=>t[n]!==e[n];function o(t,e,o){Object.keys(o).filter(s).filter(a(e,o)).forEach(e=>{t[e]=o[e]}),Object.keys(o).filter(r).filter(a(e,o)).forEach(e=>{t.setAttribute(e,o[e])}),o.style=o.style||{},Object.keys(o.style).filter(a(e.style,o.style)).forEach(e=>{t.style[e]=o.style[e]}),Object.keys(o).filter(n).filter(a(e,o)).forEach(e=>{const n=e.toLowerCase().substring(2);t.addEventListener(n,o[e])})}let f=0;function c(t,e,n){e&&(n=e(this.state[t],n)),setTimeout(()=>(function(t,e,n){t.state[e]=n,y.push({from:p,instance:t,state:t.state}),requestIdleCallback(k)})(this,t,n))}function l(t,e){let n,s="$"+f,r=c.bind(j,s,t);return j&&f++,j&&(n=j.state),"object"==typeof n&&s in n?[n[s],r]:(j&&(j.state[s]=e),[e,r])}const i="host",p="hook",u="root",b=1,g=2,d=3,h=1,y=[];let m=null,_=null,j=null;function k(t){!function(t){m||function(){const t=y.shift();if(!t)return;t.state&&(t.instance.__fiber.state=t.state);const e=t.from==u?t.dom._rootContainerFiber:function(t){let e=t;for(;e.parent;)e=e.parent;return e}(t.instance.__fiber);m={type:u,base:t.dom||e.base,props:t.newProps||e.props,alternate:e}}();for(;m&&t.timeRemaining()>h;)m=E(m);_&&((e=_).effects.forEach(t=>{!function(t){if(t.type==u)return;let e=t.parent;for(;e.type==p;)e=e.parent;const n=e.base;t.effectTag==b&&t.type==i?n.appendChild(t.base):t.effectTag==d?o(t.base,t.alternate.props,t.props):t.effectTag==g&&function(t,e){let n=t;for(;;)if(n.type!=p){for(e.removeChild(n.base);n!=t&&!n.sibling;)n=n.parent;if(n==t)return;n=n.sibling}else n=n.child}(t,n)}(t)}),e.base._rootContainerFiber=e,m=null,_=null);var e;n=j.effects,Object.keys(n).forEach(t=>{let e=n[t];e()});var n}(t),(m||y.length>0)&&requestIdleCallback(k)}function E(t){if(function(t){t.type==p?function(t){let e=t.base;null==e?e=t.base=function(t){const e=new t.tag(t.props);return e.__fiber=t,e}(t):t.props!=e.props||t.state||function(t){const e=t.alternate;if(!e.child)return;let n=e.child,s=null;for(;n;){const e={tag:n.tag,type:n.type,base:n.base,props:n.props,state:n.state,alternate:n,parent:t};s?s.sibling=e:t.child=e,s=e,n=n.sibling}}(t);e.props=t.props||{},e.state=t.state||{},e.effects=t.effects||{},j=e,f=0;const n=t.tag(t.props);T(t,n)}(t):function(t){t.base||(t.base=function(t){const n=t.tag===e?document.createTextNode(""):document.createElement(t.tag);return o(n,[],t.props),n}(t));const n=t.props.children;T(t,n)}(t)}(t),t.child)return t.child;let n=t;for(;n;){if(C(n),n.sibling)return n.sibling;n=n.parent}}function T(t,e){const n=null==(s=e)?[]:Array.isArray(s)?s:[s];var s;let r=0,a=t.alternate?t.alternate.child:null,o=null;for(;r<n.length||null!=a;){const e=o,s=r<n.length&&n[r],f=a&&s&&s.tag==a.tag;f&&(o={tag:a.tag,type:a.type,base:a.base,props:s.props,parent:t,alternate:a,state:a.state,effectTag:d}),s&&!f&&(o={tag:s.tag,type:"string"==typeof s.tag?i:p,props:s.props,parent:t,effectTag:b}),a&&!f&&(a.effectTag=g,t.effects=t.effects||[],t.effects.push(a)),a&&(a=a.sibling),0==r?t.child=o:e&&s&&(e.sibling=o),r++}}function C(t){if(t.type==p&&(t.base.__fiber=t),t.parent){const e=t.effects||[],n=null!=t.effectTag?[t]:[],s=t.parent.effects||[];t.parent.effects=s.concat(e,n)}else _=t}t.h=function t(n,s,...r){const a=Object.assign({},s),o=r.length>0?[].concat(...r):[];return a.children=o.filter(t=>null!=t&&!1!==t).map(n=>n instanceof Object?n:t(e,{nodeValue:n})),{tag:n,props:a}},t.render=function(t,e){y.push({from:u,dom:e,newProps:{children:t}}),requestIdleCallback(k)},t.useState=function(t){return l(null,t)},t.useReducer=l,t.useEffect=function(t,e){if(j){let e="$"+f;j.effects[e]=t,f++}},Object.defineProperty(t,"__esModule",{value:!0})});
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./style.css");var l=require("fre"),e="http://www.clicli.top/app/clicli.apk",c="https://ws1.sinaimg.cn/large/0065Zy9egy1g0eyxkjvcfj308c08cdh3.jpg";function i(){return(0,l.h)("div",{class:"mainer"},(0,l.h)("div",{class:"logo"}),(0,l.h)("h1",null,"人·生·就·是·佛"),(0,l.h)("ul",{class:"link"},(0,l.h)("a",{href:e,target:"_blank"},(0,l.h)("li",null,"Android")),(0,l.h)("a",{href:""},(0,l.h)("li",null,"IOS"))),(0,l.h)("div",{class:"qcode"},(0,l.h)("img",{src:c,alt:"c站 app"})))}(0,l.render)((0,l.h)(i,null),document.getElementById("root"));
},{"./style.css":"2iMt","fre":"6oLy"}]},{},["Focm"], null)
//# sourceMappingURL=/dev.69972d6f.map