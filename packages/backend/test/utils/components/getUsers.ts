import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

export interface UsersProp {
  owner: SignerWithAddress;
}

export const getUsers = async (): Promise<UsersProp> => {
  const [owner] = await ethers.getSigners();

  return {
    owner,
  };
};
