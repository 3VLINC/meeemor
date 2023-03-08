import { ethers } from 'hardhat';
import { MEEEMORDeploy__factory } from '../../../typechain-types';

export interface E2EContractsProp {
  meeemorDeploy: MEEEMORDeploy__factory;
}
export const getContracts = async (): Promise<E2EContractsProp> => {
  const meeemorDeploy = (await ethers.getContractFactory(
    'MEEEMORDeploy'
  )) as MEEEMORDeploy__factory;

  return {
    meeemorDeploy,
  };
};
