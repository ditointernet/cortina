import Process from './process';
import Query from './Query';
import CancellationToken from './CancellationToken';
import { Channel } from './channel';
import { getIterator } from './types';

export {spawn, go, } from './channel';
export {delay, pipe, compose, race, all, step, after, loop, loopWhile, map, filter} from './combinators';
export { runProcess, Process } from './process'
export {  isFunction, isIterator, isObject, isPromise } from './types';

export {  Query, CancellationToken };
export default { Process, Channel, Query, CancellationToken, getIterator };
