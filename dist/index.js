'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('./types');

class CancellationToken {
  constructor(cancelled) {
    this._cancelled = false;

    if ((0, _types.isFunction)(cancelled)) {
      this._shouldCancel = cancelled;
    } else if ((0, _types.isPromise)(cancelled)) {
      cancelled.then(() => this.cancel());
    } else {
      this._cancelled = cancelled || false;
    }

    this._cancelResolve = null;
    this._cancelPromise = new Promise(resolve => this._cancelResolve = resolve);
  }

  get isCancelled() {
    if (this._shouldCancel && this._shouldCancel()) {
      this.cancel();
    }
    return this._cancelled || false;
  }

  get whenCancelled() {
    return this.isCancelled ? Promise.resolve(true) : this._cancelPromise;
  }

  cancel() {
    this._shouldCancel = null;
    this._cancelled = true;
    this._cancelResolve(true);
  }

  restore() {
    this._cancelled = false;
  }
}
exports.default = CancellationToken;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Query;

var _types = require('./types');

function Query(name, constructor) {
  constructor = constructor || name;
  name = typeof name === 'string' ? name : '_query';

  if (!(0, _types.isFunction)(constructor)) {
    throw new Error('Expected a function as first or second argument to Query');
  }

  function _query(...args) {
    if (!(this instanceof _query)) return new _query(...args);
    this.arguments = args;
    this.displayName = this.name = name;
    this[Symbol.toStringTag] = name;

    const gen = constructor.apply(this, args);

    if ((0, _types.isFunction)(gen)) {
      this[Symbol.iterator] = (...iterArgs) => gen.apply(this, iterArgs)[Symbol.iterator](...iterArgs);
    } else if ((0, _types.isObject)(gen) && (0, _types.isFunction)(gen[Symbol.iterator])) {
      this[Symbol.iterator] = (...iterArgs) => gen[Symbol.iterator](...iterArgs);
    } else {
      throw new Error('Query\'s constructor function should return a generator or iterator');
    }
  }

  _query.displayName = name;

  return _query;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.put = exports.take = exports.chan = undefined;

var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function (fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function (value) { return new AwaitValue(value); } }; }();

exports.spawn = spawn;
exports.go = go;

var _process = require('./process');

var _types = require('./types');

const chan = exports.chan = () => new Channel();
const take = exports.take = ch => ch.take;
const put = exports.put = (ch, value) => ch.put(value);

//
function spawn(iter, handler) {
  const channel = new Channel();
  (0, _process.runProcess)(gen, value => {
    const transformedValue = (0, _types.isFunction)(handler) ? handler(value) : value;
    channel.put(transformedValue);
    return transformedValue;
  });
  return channel;
}

function go(gen, ...args) {
  return spawn((0, _types.getIterator)(gen, ...args));
}

class Channel {
  constructor() {
    this._listeners = [];
    this._closeResolve = null;
    this._closePromise = new Promise(resolve => this._closeResolve = resolve);
  }

  clear() {
    this._listeners = [];
  }

  close() {
    this._closed = true;
    this._closeResolve();
  }

  put(value) {
    if (this._listeners.length > 0) {
      for (let resolve of this._listeners) {
        resolve(value);
      }
      this.clear();
    } else {
      this._value = value;
      this._hasValue = true;
    }
  }

  get take() {
    if (this._hasValue) {
      const value = this._value;
      this._value = undefined;
      this._hasValue = false;
      return Promise.resolve(value);
    } else {
      return new Promise(resolve => this._listeners.push(resolve));
    }
  }

  get whenClosed() {
    return this._closePromise;
  }

  get isClosed() {
    return this._closed;
  }

  [Symbol.asyncIterator]() {
    var _this = this;

    return _asyncGenerator.wrap(function* () {
      while (!_this.isClosed) {
        yield yield _asyncGenerator.await(_this.take);
      }
    })();
  }
}
exports.default = Channel;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.race = undefined;
exports.delay = delay;
exports.pipe = pipe;
exports.compose = compose;
exports.step = step;
exports.after = after;
exports.loop = loop;
exports.loopWhile = loopWhile;
exports.map = map;
exports.filter = filter;

var _process = require('./process');

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function delay(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function pipe(...fns) {
  return function* (arg) {
    let ret = arg;
    for (let fn of fns) {
      ret = yield fn(ret);
    }
    return ret;
  };
}

function* compose(...fns) {
  yield* pipe(fns.reverse());
}

const race = exports.race = (0, _Query2.default)('race', function (iterators = [], handler) {
  this.iterators = iterators;
  this.handler = null;

  return function* race() {
    const promises = this.iterators.map(iter => (0, _process.runProcess)(iter, handler || this.handler));
    const result = yield Promise.race(promises);
    promises.forEach(p => p.cancel());
    return result;
  };
});

const all = exports.all = (0, _Query2.default)('all', function (iterators = [], handler) {
  this.iterators = iterators;
  this.handler = null;

  return function* all() {
    return yield Promise.all(this.iterators.map(iter => (0, _process.runProcess)(iter, handler || this.handler)));
  };
});

function step(iterator, ...args) {
  var _iterator$next = iterator.next(...args);

  const value = _iterator$next.value,
        done = _iterator$next.done;

  return { value, iterator, done };
}

function* after(iter, gen) {
  const res = yield* iter;
  const iter2 = gen(res);
  if ((0, _types.hasIterator)(iter2)) {
    yield* iter2;
  } else {
    return iter2;
  }
}

function loop(fn) {
  return arg => loopWhile(() => true, fn)(arg);
}

function loopWhile(cond, fn) {
  return function* loopWhile(arg) {
    let ret = arg;
    do {
      ret = yield* fn(ret);
    } while (cond(ret));
    return ret;
  };
}

function* map(f, iter) {
  let result,
      input,
      index = 0;
  iter = (0, _types.getIterator)(iter);

  while (!(result = iter.next(input)).done) {
    input = yield f(result.value, index++);
  }

  return f(result.value, index++);
}

function* filter(f, iter) {
  let result,
      input,
      index = 0;
  iter = (0, _types.getIterator)(iter);

  while (!(result = iter.next(input)).done) {
    if (f(result.value, index++)) input = yield result.value;
  }

  if (f(result.value, index++)) return result.value;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIterator = exports.CancellationToken = exports.Query = exports.Channel = exports.Process = undefined;

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _CancellationToken = require('./CancellationToken');

var _CancellationToken2 = _interopRequireDefault(_CancellationToken);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Process = _process2.default;
exports.Channel = _channel2.default;
exports.Query = _Query2.default;
exports.CancellationToken = _CancellationToken2.default;
exports.getIterator = _types.getIterator;
exports.default = { Process: _process2.default, Channel: _channel2.default, Query: _Query2.default, CancellationToken: _CancellationToken2.default, getIterator: _types.getIterator };
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runProcess = undefined;

var _CancellationToken = require('./CancellationToken');

var _CancellationToken2 = _interopRequireDefault(_CancellationToken);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const runProcess = exports.runProcess = (gen, handler, cancellationToken) => new Process(gen, handler, cancellationToken).run();

class Process {
  constructor(gen, handler = null, cancellationToken = new _CancellationToken2.default()) {
    this._onResolve = input => {
      if (this._cancellationToken.isCancelled) return;

      try {
        const step = this._iterator.next(input);
        if ((0, _types.isPromise)(step)) {
          step.then(this._onNext);
        } else {
          this._onNext(step);
        }
      } catch (err) {
        return this._reject(err);
      }
    };

    this._onReject = err => {
      try {
        if ((0, _types.isFunction)(this._iterator.throw)) {
          this._onNext(this._iterator.throw(err));
          this._cancellationToken.restore();
        } else {
          throw err;
        }
      } catch (err) {
        return this._reject(err);
      }
    };

    this._onNext = ({ value, done }) => {
      if (this._cancellationToken.isCancelled) return;

      value = (0, _types.isFunction)(this._handler) ? this._handler(value) : value;

      if (done) return this._resolve(value);

      if ((0, _types.isFunction)(value) && !(0, _types.hasIterator)(value) && !(0, _types.hasAsyncIterator)(value)) {
        value = value();
      }

      const promise = (0, _types.hasIterator)(value) || (0, _types.hasAsyncIterator)(value) ? new Process(value, this._handler, this._cancellationToken).run() : Promise.resolve(value);

      promise.then(this._onResolve, this._onReject);
    };

    this._iterator = (0, _types.getIterator)(gen);
    this._handler = handler;
    this._cancellationToken = cancellationToken;
    this._isRunning = false;

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    if (!(0, _types.isIterator)(this._iterator)) {
      throw new TypeError(`Supplied coroutine program is neither a function nor a generator: ${gen}`);
    }
  }

  cancel() {
    this._cancellationToken.cancel();
  }

  *[Symbol.iterator]() {
    return yield* this._iterator;
  }

  get promise() {
    return this._promise;
  }

  run() {
    if (this._isRunning) {
      throw new Error('Process is already running');
    }

    this._isRunning = true;
    this._onResolve();
    return this._promise;
  }

}
exports.default = Process;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isIterator = isIterator;
exports.hasIterator = hasIterator;
exports.hasAsyncIterator = hasAsyncIterator;
exports.getIterator = getIterator;
/* istanbul ignore file */
function isFunction(fn) {
  return fn && typeof fn === 'function';
}

function isObject(obj) {
  return obj && typeof obj === 'object';
}

function isPromise(p) {
  return p && isFunction(p.then);
}

function isIterator(iter) {
  return iter && isFunction(iter.next);
}

function hasIterator(gen) {
  return gen && isFunction(gen[Symbol.iterator]);
}

function hasAsyncIterator(gen) {
  return gen && isFunction(gen[Symbol.asyncIterator]);
}

function getIterator(gen, ...args) {
  if (isFunction(gen)) {
    gen = gen(...args);
  }

  if (hasIterator(gen)) {
    return gen[Symbol.iterator]();
  } else if (hasAsyncIterator(gen)) {
    return gen[Symbol.asyncIterator]();
  } else if (isIterator(gen)) {
    return gen;
  }

  return null;
}
