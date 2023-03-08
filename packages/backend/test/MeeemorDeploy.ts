import { parseEther } from 'ethers/lib/utils';
import { EventCreatedEvent } from '../typechain-types/contracts/MEEEMORDeploy';
import { findEmittedEvent } from './utils/components/findEmittedEvent';
import { harness, HarnessProp } from './utils/harness';

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
});
