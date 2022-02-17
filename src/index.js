import Query from './Query';
import CancellationToken from './CancellationToken';
import Channel, { spawn, go } from './channel';
import Process, { runProcess } from './process'

export { delay, pipe, compose, race, all, step, after, loop, loopWhile, map, filter } from './combinators';
export {  isFunction, isIterator, isObject, isPromise, getIterator } from './types';
export {  Query, CancellationToken, runProcess, spawn, go };
export default { Process, Channel, Query, CancellationToken };
