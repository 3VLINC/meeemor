import { Signer } from 'ethers';
import { MeeemorDeploy } from '../../../typechain-types';
import { E2EContractsProp, getContracts } from './getContracts';

export interface DeployerOutput {
  meeemorDeploy: MeeemorDeploy;
  contracts: E2EContractsProp;
}
export const getDeployer =
  (deployer: Signer) => async (): Promise<DeployerOutput> => {
    const contracts = await getContracts();

    const meeemorDeploy = await contracts.meeemorDeploy
      .connect(deployer)
      .deploy();

    await meeemorDeploy.deployed();

    return {
      meeemorDeploy,
      contracts,
    };
  };
