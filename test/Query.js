import Query from '../src/Query';

test('Query should throw if no constructor function is passed as argument', () => {
  expect(() => Query()).toThrow('Expected a function as first or second argument to Query');
});

test('Query should throw if no generator is returned from the constructor', () => {
  const testQuery = Query('testQuery', () => null);
  expect(() => testQuery()).toThrow();
});

test('Query instance should be named correctly', () => {
  const testQuery = Query('testQuery', () => function*() {});
  expect(testQuery().displayName).toBe('testQuery');
  expect(testQuery().name).toBe('testQuery');
});

test('Query instance should call constructor with its `this` context', () => {
  const testQuery = Query('testQuery', function(foo, bar) {
    this.foo = foo;
    this.bar = bar;
    return function*() {};
  });

  const q = testQuery('foo', 'bar')
  expect(q.arguments).toEqual(['foo', 'bar']);
  expect(q.foo).toBe('foo');
  expect(q.bar).toBe('bar');
});

test('Query instance should have iterator from a returned generator', () => {
  const testQuery = Query('testQuery', function(a, b) {
    this.a = a;
    this.b = b;
    return function*() {
      yield this.a;
      yield this.b;
      return this.a + this.b;
    };
  });

  const q = testQuery(1, 2);
  expect(typeof q[Symbol.iterator]).toBe('function');

  const iter = q[Symbol.iterator]();
  expect(iter.next().value).toBe(1);
  expect(iter.next().value).toBe(2);
  expect(iter.next()).toEqual({ value: 3, done: true });
});

test('Query instance should have iterator from a returned iterator', () => {
  const testQuery = Query('testQuery', function(a, b) {
    this.a = a;
    this.b = b;
    const iter = (function*() {
      const a = yield;
      yield this.b;
      return this.a + this.b;
    }).call(this);
    iter.next(this.a);
    return iter;
  });

  const q = testQuery(1, 2);
  expect(typeof q[Symbol.iterator]).toBe('function');

  const iter = q[Symbol.iterator]();
  expect(iter.next().value).toBe(2);
  expect(iter.next()).toEqual({ value: 3, done: true });
});
