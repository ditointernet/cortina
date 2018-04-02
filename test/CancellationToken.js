import CancellationToken from '../src/CancellationToken';

test('CancellationToken should initialize isCancelled property', () => {
  expect(new CancellationToken(true).isCancelled).toBe(true);
  expect(new CancellationToken(false).isCancelled).toBe(false);
});

test('CancellationToken should accept a function as argument', () => {
  let cancelled = false;

  const token = new CancellationToken(() => cancelled);
  expect(token.isCancelled).toBe(false);

  cancelled = true;
  expect(token.isCancelled).toBe(true);
});

test('CancellationToken should cancel and restore', () => {
  const token = new CancellationToken();
  expect(token.isCancelled).toBe(false);

  token.cancel();
  expect(token.isCancelled).toBe(true);

  token.restore();
  expect(token.isCancelled).toBe(false);
});

test('CancellationToken should be awaited for cancellation', async () => {
  const token = new CancellationToken(true);
  await expect(token.whenCancelled).resolves.toBe(true);

  token.restore();
  setTimeout(() => token.cancel(), 500);
  await expect(token.whenCancelled).resolves.toBe(true);

  const token2 = new CancellationToken(new Promise(resolve => setTimeout(resolve, 500)));
  await expect(token2.whenCancelled).resolves.toBe(true);
});
