import { ContractReceipt } from 'ethers';

export const getEvent = <T>(
  searchEvent: string,
  { events = [] }: ContractReceipt
): T | undefined => {
  const foundItem = events.find(({ event }) => event === searchEvent);

  if (!foundItem) {
    return undefined;
  }

  return foundItem as any as T;
};
