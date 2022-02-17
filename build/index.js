(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e){return e&&"function"==typeof e}function n(t){return t&&"object"===e(t)}function r(e){return e&&t(e.then)}function o(e){return e&&t(e.next)}function i(e){return e&&t(e[Symbol.iterator])}function a(e){return e&&t(e[Symbol.asyncIterator])}function u(e){if(t(e)){for(var n=arguments.length,r=new Array(n>1?n-1:0),u=1;u<n;u++)r[u-1]=arguments[u];e=e.apply(void 0,r)}return i(e)?e[Symbol.iterator]():a(e)?e[Symbol.asyncIterator]():o(e)?e:null}function c(e,t,n){return c=l()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&s(o,n.prototype),o},c.apply(null,arguments)}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function s(e,t){return s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},s(e,t)}function f(e,r){if(r=r||e,e="string"==typeof e?e:"_query",!t(r))throw new Error("Expected a function as first or second argument to Query");function o(){for(var i=this,a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];if(!(this instanceof o))return c(o,u);this.arguments=u,this.displayName=this.name=e,this[Symbol.toStringTag]=e;var s=r.apply(this,u);if(t(s))this[Symbol.iterator]=function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=s.apply(i,n))[Symbol.iterator].apply(e,n)};else{if(!n(s)||!t(s[Symbol.iterator]))throw new Error("Query's constructor function should return a generator or iterator");this[Symbol.iterator]=function(){return s[Symbol.iterator].apply(s,arguments)}}}return o.displayName=e,o}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y,p=function(){function e(n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cancelled=!1,t(n)?this._shouldCancel=n:r(n)?n.then((function(){return o.cancel()})):this._cancelled=n||!1,this._cancelResolve=null,this._cancelPromise=new Promise((function(e){return o._cancelResolve=e}))}var n,o;return n=e,(o=[{key:"isCancelled",get:function(){return this._shouldCancel&&this._shouldCancel()&&this.cancel(),this._cancelled||!1}},{key:"whenCancelled",get:function(){return this.isCancelled?Promise.resolve(!0):this._cancelPromise}},{key:"cancel",value:function(){this._shouldCancel=null,this._cancelled=!0,this._cancelResolve(!0)}},{key:"restore",value:function(){this._cancelled=!1}}])&&h(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(e,t,n){return new b(e,t,n).run()};y=Symbol.iterator;var b=function(){function e(n){var c=this,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new p;if(v(this,e),_(this,"_onResolve",(function(e){if(!c._cancellationToken.isCancelled)try{var t=c._iterator.next(e);r(t)?t.then(c._onNext):c._onNext(t)}catch(e){return c._reject(e)}})),_(this,"_onReject",(function(e){try{if(!t(c._iterator.throw))throw e;c._onNext(c._iterator.throw(e)),c._cancellationToken.restore()}catch(e){return c._reject(e)}})),_(this,"_onNext",(function(n){var r=n.value,o=n.done;if(!c._cancellationToken.isCancelled){if(r=t(c._handler)?c._handler(r):r,o)return c._resolve(r);!t(r)||i(r)||a(r)||(r=r()),(i(r)||a(r)?new e(r,c._handler,c._cancellationToken).run():Promise.resolve(r)).then(c._onResolve,c._onReject)}})),this._iterator=u(n),this._handler=l,this._cancellationToken=s,this._isRunning=!1,this._promise=new Promise((function(e,t){c._resolve=e,c._reject=t})),!o(this._iterator))throw new TypeError("Supplied coroutine program is neither a function nor a generator: ".concat(n))}var n,c;return n=e,(c=[{key:"cancel",value:function(){this._cancellationToken.cancel()}},{key:y,value:regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(this._iterator,"t0",1);case 1:return e.abrupt("return",e.t0);case 2:case"end":return e.stop()}}),e,this)}))},{key:"promise",get:function(){return this._promise}},{key:"run",value:function(){if(this._isRunning)throw new Error("Process is already running");return this._isRunning=!0,this._onResolve(),this._promise}}])&&m(n.prototype,c),Object.defineProperty(n,"prototype",{writable:!1}),e}();function w(e){var t,n;function r(t,n){try{var i=e[t](n),a=i.value,u=a instanceof g;Promise.resolve(u?a.wrapped:a).then((function(e){u?r("return"===t?"return":"next",e):o(i.done?"return":"normal",e)}),(function(e){r("throw",e)}))}catch(e){o("throw",e)}}function o(e,o){switch(e){case"return":t.resolve({value:o,done:!0});break;case"throw":t.reject(o);break;default:t.resolve({value:o,done:!1})}(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,o){return new Promise((function(i,a){var u={key:e,arg:o,resolve:i,reject:a,next:null};n?n=n.next=u:(t=n=u,r(e,o))}))},"function"!=typeof e.return&&(this.return=void 0)}function g(e){this.wrapped=e}f("race",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return this.iterators=e,this.handler=null,regeneratorRuntime.mark((function e(){var n,r,o=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.iterators.map((function(e){return d(e,t||o.handler)})),e.next=3,Promise.race(n);case 3:return r=e.sent,n.forEach((function(e){return e.cancel()})),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e,this)}))})),f("all",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return this.iterators=e,this.handler=null,regeneratorRuntime.mark((function e(){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(this.iterators.map((function(e){return d(e,t||n.handler)})));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)}))})),w.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},w.prototype.next=function(e){return this._invoke("next",e)},w.prototype.throw=function(e){return this._invoke("throw",e)},w.prototype.return=function(e){return this._invoke("return",e)},Symbol.asyncIterator})();