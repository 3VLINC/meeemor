import { parseEther } from 'ethers/lib/utils';
import { EventCreatedEvent } from '../typechain-types/contracts/MeeemorDeploy';
import { findEmittedEvent } from './utils/components/findEmittedEvent';
import { harness, HarnessProp } from './utils/harness';
import {
  MemeCreatedEvent,
  BountyStartedEvent,
  VotedEvent,
  BountyEndedEvent,
} from '../typechain-types/contracts/Meeemor';
import { BigNumber } from 'ethers';
import { getLastBlockTimestamp } from './utils/components/getLastBlockTimestamp';
import { setNextBlockTimestamp } from './utils/components/setNextBlockTimestamp';

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
  it.only('should initialize correctly', async () =>
    harness(initialize()).then(async ({ users, expect, meeemorDeploy }) => {
      const result = await meeemorDeploy
        .connect(users.owner)
        .initialize('Eth Denver', { value: parseEther('3') })
        .then((tx) => tx.wait())
        .then(findEmittedEvent<EventCreatedEvent>('EventCreated'));
      console.log(result.args);
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

  it('should allow for beginning the bounty', async () =>
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

        const timerStarted = await event
          .begin(BigNumber.from(60 * 60 * 1000))
          .then((tx) => tx.wait())
          .then(findEmittedEvent<BountyStartedEvent>('BountyStarted'));

        expect(timerStarted.args.startTime).to.be.ok;
      }
    ));

  it('should allow for submitting a meme', () =>
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

        await event
          .begin(BigNumber.from(60 * 60 * 1000))
          .then((tx) => tx.wait())
          .then(findEmittedEvent<BountyStartedEvent>('BountyStarted'));

        const memeCreated = await event
          .connect(users.creator)
          .createMeme('https://i.imgur.com/0y8Ftya.jpeg')
          .then((tx) => tx.wait())
          .then(findEmittedEvent<MemeCreatedEvent>('MemeCreated'));

        expect(memeCreated.args.addr).to.be.ok;
        expect(memeCreated.args.tokenId.eq(BigNumber.from('0'))).to.be.true;
      }
    ));

  it('should allow for voting for a meme', () =>
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

        await event
          .begin(BigNumber.from(60 * 60 * 1000))
          .then((tx) => tx.wait())
          .then(findEmittedEvent<BountyStartedEvent>('BountyStarted'));

        const memeCreated = await event
          .connect(users.creator)
          .createMeme('https://i.imgur.com/0y8Ftya.jpeg')
          .then((tx) => tx.wait())
          .then(findEmittedEvent<MemeCreatedEvent>('MemeCreated'));

        const voted = await event
          .connect(users.voter)
          .vote(memeCreated.args.tokenId)
          .then((tx) => tx.wait())
          .then(findEmittedEvent<VotedEvent>('Voted'));

        expect(voted.args.addr).to.be.eql(users.voter.address);
        expect(voted.args.tokenId.eq(BigNumber.from('0'))).to.be.true;
      }
    ));
  it('should allow for ending the bounty', () =>
    harness(initialize()).then(
      async ({ users, expect, meeemorDeploy, contracts }) => {
        const meeemor = await meeemorDeploy.connect(users.owner);
        const originalCreatorBalance = await users.creator.getBalance();
        const bounty = parseEther('3');
        const result = await meeemor
          .initialize('Eth Denver', { value: bounty })
          .then((tx) => tx.wait())
          .then(findEmittedEvent<EventCreatedEvent>('EventCreated'));

        const {
          args: { eventId },
        } = result;

        const eventAddr = await meeemor.events(eventId);

        const event = contracts.meeemor.attach(eventAddr);

        await event
          .begin(BigNumber.from(60 * 60 * 1000))
          .then((tx) => tx.wait())
          .then(findEmittedEvent<BountyStartedEvent>('BountyStarted'));

        const memeCreated = await event
          .connect(users.creator)
          .createMeme('https://i.imgur.com/0y8Ftya.jpeg')
          .then((tx) => tx.wait())
          .then(findEmittedEvent<MemeCreatedEvent>('MemeCreated'));

        await event
          .connect(users.voter)
          .vote(memeCreated.args.tokenId)
          .then((tx) => tx.wait())
          .then(findEmittedEvent<VotedEvent>('Voted'));

        const lastTimestamp = await getLastBlockTimestamp();

        await setNextBlockTimestamp(lastTimestamp.add(60 * 60 * 1000));

        const bountyEnded = await event
          .connect(users.owner)
          .end()
          .then((tx) => tx.wait())
          .then(findEmittedEvent<BountyEndedEvent>('BountyEnded'));

        const newCreatorBalance = await users.creator.getBalance();

        expect(bountyEnded.args.endTime).to.be.ok;
        expect(
          newCreatorBalance
            .sub(originalCreatorBalance)
            .sub(bounty)
            .lt(parseEther('0.01'))
        ).to.be.true;
      }
    ));
});
