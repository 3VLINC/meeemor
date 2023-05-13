import chaiAsPromised from 'chai-as-promised';
import { getUsers, UsersProp } from './components/getUsers';
import chai, { expect } from 'chai';
import { DeployerOutput, getDeployer } from './components/getDeployer';
import { E2EContractsProp, getContracts } from './components/getContracts';

chai.use(chaiAsPromised);

export interface HarnessProp {
  users: Omit<UsersProp, 'mockNftContractOwner'>;
  expect: Chai.ExpectStatic;
  deployer: () => Promise<DeployerOutput>;
  contracts: E2EContractsProp;
}

export async function harness<T>(
  initializer: ({ users, expect }: HarnessProp) => Promise<T>
): Promise<T> {
  const users = await getUsers();
  const deployer = getDeployer(users.owner);
  const contracts = await getContracts();

  return initializer({
    users,
    expect,
    deployer,
    contracts,
  });
}
