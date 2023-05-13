import { parseEther } from 'ethers/lib/utils';
import { EventCreatedEvent } from '../typechain-types/contracts/MeeemorDeploy';
import { findEmittedEvent } from './utils/components/findEmittedEvent';
import { harness, HarnessProp } from './utils/harness';
import { MemeCreatedEvent } from '../typechain-types/contracts/Meeemor';
import { BigNumber } from 'ethers/lib/ethers';

const initialize =
  () =>
  async ({ users, deployer, expect }: HarnessProp) => {
    const props = await deployer();

    return {
      ...props,
      users,
      expect,
    };
  };

describe('Meeemor', async function () {
  it('should initialize correctly', async () =>
    harness(initialize()).then(async ({ users, expect, meeemorDeploy }) => {
      const result = await meeemorDeploy
        .connect(users.owner)
        .initialize('Eth Denver', { value: parseEther('3') })
        .then((tx) => tx.wait())
        .then(findEmittedEvent<EventCreatedEvent>('EventCreated'));

      expect(result.args.name).to.eql('Eth Denver');
    }));

  it('should allow for submitting a meme', async () =>
    harness(initialize()).then(
      async ({ users, expect, meeemorDeploy, contracts }) => {
        const meeemor = await meeemorDeploy.connect(users.owner);

        const result = await meeemor
          .initialize('Eth Denver', { value: parseEther('3') })
          .then((tx) => tx.wait())
          .then(findEmittedEvent<EventCreatedEvent>('EventCreated'));

        const {
          args: { eventId },
        } = result;

        const eventAddr = await meeemor.events(eventId);

        const event = contracts.meeemor.attach(eventAddr);

        const createMemeResult = await event
          .createMeme('https://i.imgur.com/0y8Ftya.jpeg')
          .then((tx) => tx.wait())
          .then(findEmittedEvent<MemeCreatedEvent>('MemeCreated'));

        expect(createMemeResult.args.addr).to.be.ok;
        expect(createMemeResult.args.tokenId.eq(BigNumber.from('0'))).to.be
          .true;
      }
    ));
});
