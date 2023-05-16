import { EventCreated as EventCreatedEvent } from '../generated/MeeemorDeploy/MeeemorDeploy';
import { MeeemorEvent } from '../generated/schema';
import { log } from '@graphprotocol/graph-ts';

export function handleEventCreated(ev: EventCreatedEvent): void {
  log.debug('handleEventCreated: {}', [ev.params.eventId.toString()]);
  let event = MeeemorEvent.load(ev.params.eventId.toString());

  if (!event) {
    log.debug('handleEventCreated: event not found', []);
    log.debug('handleEventCreated: creating new event', []);
    event = new MeeemorEvent(ev.params.eventId.toString());
    event.bounty = ev.params.bounty;
    event.name = ev.params.name;
    event.created = ev.block.timestamp;
    event.owner = ev.params.owner;
    event.save();
    log.debug('handleEventCreated: event saved', []);
  }
  log.debug('handleEventCreated: event already exists', []);
}
