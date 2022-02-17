'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancellationToken = exports.Query = exports.isPromise = exports.isObject = exports.isIterator = exports.isFunction = exports.Process = exports.runProcess = exports.filter = exports.map = exports.loopWhile = exports.loop = exports.after = exports.step = exports.all = exports.race = exports.compose = exports.pipe = exports.delay = exports.go = exports.spawn = undefined;

var _channel = require('./channel');

Object.defineProperty(exports, 'spawn', {
  enumerable: true,
  get: function () {
    return _channel.spawn;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function () {
    return _channel.go;
  }
});

var _combinators = require('./combinators');

Object.defineProperty(exports, 'delay', {
  enumerable: true,
  get: function () {
    return _combinators.delay;
  }
});
Object.defineProperty(exports, 'pipe', {
  enumerable: true,
  get: function () {
    return _combinators.pipe;
  }
});
Object.defineProperty(exports, 'compose', {
  enumerable: true,
  get: function () {
    return _combinators.compose;
  }
});
Object.defineProperty(exports, 'race', {
  enumerable: true,
  get: function () {
    return _combinators.race;
  }
});
Object.defineProperty(exports, 'all', {
  enumerable: true,
  get: function () {
    return _combinators.all;
  }
});
Object.defineProperty(exports, 'step', {
  enumerable: true,
  get: function () {
    return _combinators.step;
  }
});
Object.defineProperty(exports, 'after', {
  enumerable: true,
  get: function () {
    return _combinators.after;
  }
});
Object.defineProperty(exports, 'loop', {
  enumerable: true,
  get: function () {
    return _combinators.loop;
  }
});
Object.defineProperty(exports, 'loopWhile', {
  enumerable: true,
  get: function () {
    return _combinators.loopWhile;
  }
});
Object.defineProperty(exports, 'map', {
  enumerable: true,
  get: function () {
    return _combinators.map;
  }
});
Object.defineProperty(exports, 'filter', {
  enumerable: true,
  get: function () {
    return _combinators.filter;
  }
});

var _process = require('./process');

Object.defineProperty(exports, 'runProcess', {
  enumerable: true,
  get: function () {
    return _process.runProcess;
  }
});
Object.defineProperty(exports, 'Process', {
  enumerable: true,
  get: function () {
    return _process.Process;
  }
});

var _types = require('./types');

Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function () {
    return _types.isFunction;
  }
});
Object.defineProperty(exports, 'isIterator', {
  enumerable: true,
  get: function () {
    return _types.isIterator;
  }
});
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return _types.isObject;
  }
});
Object.defineProperty(exports, 'isPromise', {
  enumerable: true,
  get: function () {
    return _types.isPromise;
  }
});

var _process2 = _interopRequireDefault(_process);

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _CancellationToken = require('./CancellationToken');

var _CancellationToken2 = _interopRequireDefault(_CancellationToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Query = _Query2.default;
exports.CancellationToken = _CancellationToken2.default;
exports.default = { Process: _process2.default, Channel: _channel.Channel, Query: _Query2.default, CancellationToken: _CancellationToken2.default, getIterator: _types.getIterator };