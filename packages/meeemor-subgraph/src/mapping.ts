import { ethereum, BigInt } from '@graphprotocol/graph-ts';
import { log } from '@graphprotocol/graph-ts';
import {
  EventToken as EventTokenEvent,
  Transfer as TransferEvent,
} from '../generated/Poap/Poap';

import { Token, Account, Event, Transfer } from '../generated/schema';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

function createEventID(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat('-')
    .concat(event.logIndex.toString());
}

export function handleEventToken(ev: EventTokenEvent): void {
  let event = Event.load(ev.params.eventId.toString());
  // This handler always run after the transfer handler
  const token = Token.load(ev.params.tokenId.toString());
  if (!event) {
    event = new Event(ev.params.eventId.toString());
    event.tokenCount = BigInt.fromI32(0);
    event.tokenMints = BigInt.fromI32(0);
    event.transferCount = BigInt.fromI32(0);
    event.created = ev.block.timestamp;
  }

  event.tokenCount = event.tokenCount.plus(BigInt.fromI32(1));
  event.tokenMints = event.tokenMints.plus(BigInt.fromI32(1));
  event.transferCount = event.transferCount.plus(BigInt.fromI32(1));
  if (token) {
    token.event = event.id;
    token.mintOrder = event.tokenMints;
    token.save();
  }
  event.save();
}

export function handleTransfer(ev: TransferEvent): void {
  log.debug('1', []);
  let token = Token.load(ev.params.tokenId.toString());
  let from = Account.load(ev.params.from.toHex());
  let to = Account.load(ev.params.to.toHex());
  const transfer = new Transfer(createEventID(ev));
  log.debug('2', []);
  if (!from) {
    from = new Account(ev.params.from.toHex());
    // The from account at least has to own one token
    from.tokensOwned = BigInt.fromI32(1);
  }
  // Don't subtracts from the ZERO_ADDRESS (it's the one that mint the token)
  // Avoid negative values
  log.debug('3', []);
  if (from.id != ZERO_ADDRESS) {
    from.tokensOwned = from.tokensOwned.minus(BigInt.fromI32(1));
  }
  from.save();
  log.debug('token04', []);
  if (!to) {
    to = new Account(ev.params.to.toHex());
    to.tokensOwned = BigInt.fromI32(0);
  }
  to.tokensOwned = to.tokensOwned.plus(BigInt.fromI32(1));
  to.save();
  log.debug('token12', []);
  if (!token) {
    token = new Token(ev.params.tokenId.toString());
    token.transferCount = BigInt.fromI32(0);
    token.created = ev.block.timestamp;
  }
  token.owner = to.id;
  token.transferCount = token.transferCount.plus(BigInt.fromI32(1));
  token.save();
  const tokenEvent = token.event;
  if (tokenEvent) {
    log.debug('token event', [tokenEvent]);
    const event = Event.load(tokenEvent);

    if (event) {
      const created = event.created;
      log.debug('event', [created.toString()]);
      // Add one transfer
      event.transferCount = event.transferCount.plus(BigInt.fromI32(1));

      // Burning the token
      if (to.id == ZERO_ADDRESS) {
        event.tokenCount = event.tokenCount.minus(BigInt.fromI32(1));
        // Subtract all the transfers from the burned token
        event.transferCount = event.transferCount.minus(token.transferCount);
      }
      log.debug('7', []);
      event.save();
    }
  }

  transfer.token = token.id;
  transfer.from = from.id;
  transfer.to = to.id;
  transfer.transaction = ev.transaction.hash;
  transfer.timestamp = ev.block.timestamp;
  transfer.save();
}
