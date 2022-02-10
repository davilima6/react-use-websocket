import { DEFAULT_RECONNECT_INTERVAL_MS } from './constants';
import { Options } from './types';
import { MutableRefObject } from 'react';

export const getReconnectInterval = async (optionsRef: MutableRefObject<Options>): Promise<number> => {
  const { reconnectInterval } = optionsRef.current;
  let convertedInterval: number | (() => Promise<number>);

  if (typeof reconnectInterval === 'undefined') {
    convertedInterval = DEFAULT_RECONNECT_INTERVAL_MS;
  } else if (typeof reconnectInterval === 'function') {
    convertedInterval = await reconnectInterval();
  } else {
    convertedInterval = reconnectInterval;
  }

  return convertedInterval;
};
