import { ethers } from 'hardhat';
import {
  MeeemorDeploy__factory,
  Meeemor__factory,
} from '../../../typechain-types';

export interface E2EContractsProp {
  meeemorDeploy: MeeemorDeploy__factory;
  meeemor: Meeemor__factory;
}
export const getContracts = async (): Promise<E2EContractsProp> => {
  const meeemorDeploy = (await ethers.getContractFactory(
    'MeeemorDeploy'
  )) as MeeemorDeploy__factory;

  const meeemor = (await ethers.getContractFactory(
    'Meeemor'
  )) as Meeemor__factory;

  return {
    meeemorDeploy,
    meeemor,
  };
};
