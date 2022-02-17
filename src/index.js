import Query from './Query';
import CancellationToken from './CancellationToken';

import { delay, pipe, compose, race, all, step, after, loop, loopWhile, map, filter } from './combinators';
import Channel, { spawn, go } from './channel';
import Process, { runProcess } from './process'
import {  isFunction, isIterator, isObject, isPromise, getIterator } from './types';

export {  Query, CancellationToken, runProcess, delay, pipe, compose, race, all, step, after, loop, loopWhile, map, filter, isFunction, isIterator, isObject, isPromise, getIterator, spawn, go };
export default { Process, Channel, Query, CancellationToken, getIterator };
