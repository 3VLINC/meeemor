import { EventCreated as EventCreatedEvent } from '../generated/MeeemorDeployer/MEEEMORDeploy';

import { MeeemorEvent } from '../generated/schema';

export function handleEventCreated(ev: EventCreatedEvent): void {
  let event = MeeemorEvent.load(ev.params.eventId.toString());

  if (!event) {
    event = new MeeemorEvent(ev.params.eventId.toString());
    event.bounty = ev.params.bounty;
    event.name = ev.params.name;
    event.save();
  }
}
