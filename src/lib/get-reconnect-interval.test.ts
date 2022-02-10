import { MutableRefObject } from 'react';
import { DEFAULT_RECONNECT_INTERVAL_MS } from './constants';
import { getReconnectInterval } from './get-reconnect-interval';
import { Options } from './types';

let optionRef: MutableRefObject<Options>;

const INTERVAL_MS = 3000;

const getReconnectIntervalAsync = () => {
  return new Promise<number>((resolve) => {
    window.setTimeout(() => {
      resolve(INTERVAL_MS);
    }, 500);
  });
};

beforeEach(() => {
  optionRef = { current: {} };
});

test('If passed undefined, it will return the default interval', async (done) => {
  optionRef.current.reconnectInterval = undefined;
  const reconnectInterval = await getReconnectInterval(optionRef);
  expect(reconnectInterval).toBe(DEFAULT_RECONNECT_INTERVAL_MS);
  done();
});

test('If passed a number that is returned directly', async (done) => {
  optionRef.current.reconnectInterval = INTERVAL_MS;
  const reconnectInterval = await getReconnectInterval(optionRef);
  expect(reconnectInterval).toBe(INTERVAL_MS);
  done();
});

test('If passed a function, it will return a promise that resolves to the return value of the function, after being parsed', async (done) => {
  optionRef.current.reconnectInterval = getReconnectIntervalAsync;
  const reconnectInterval = await getReconnectInterval(optionRef);
  expect(reconnectInterval).toBe(INTERVAL_MS);
  done();
});
