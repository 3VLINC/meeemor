import { ContractReceipt } from 'ethers';
import { getEvent } from './getEvent';

export const findEmittedEvent =
  <T>(searchEvent: string) =>
  (res: ContractReceipt) => {
    const event = getEvent<T>(searchEvent, res);

    return event as T;
  };
