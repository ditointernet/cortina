'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.go = exports.spawn = exports.getIterator = exports.isPromise = exports.isObject = exports.isIterator = exports.isFunction = exports.filter = exports.map = exports.loopWhile = exports.loop = exports.after = exports.step = exports.all = exports.race = exports.compose = exports.pipe = exports.delay = exports.runProcess = exports.CancellationToken = exports.Query = undefined;

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _CancellationToken = require('./CancellationToken');

var _CancellationToken2 = _interopRequireDefault(_CancellationToken);

var _combinators = require('./combinators');

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Query = _Query2.default;
exports.CancellationToken = _CancellationToken2.default;
exports.runProcess = _process.runProcess;
exports.delay = _combinators.delay;
exports.pipe = _combinators.pipe;
exports.compose = _combinators.compose;
exports.race = _combinators.race;
exports.all = _combinators.all;
exports.step = _combinators.step;
exports.after = _combinators.after;
exports.loop = _combinators.loop;
exports.loopWhile = _combinators.loopWhile;
exports.map = _combinators.map;
exports.filter = _combinators.filter;
exports.isFunction = _types.isFunction;
exports.isIterator = _types.isIterator;
exports.isObject = _types.isObject;
exports.isPromise = _types.isPromise;
exports.getIterator = _types.getIterator;
exports.spawn = _channel.spawn;
exports.go = _channel.go;
exports.default = { Process: _process2.default, Channel: _channel2.default, Query: _Query2.default, CancellationToken: _CancellationToken2.default, getIterator: _types.getIterator };