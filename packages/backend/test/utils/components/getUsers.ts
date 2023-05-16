import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

export interface UsersProp {
  owner: SignerWithAddress;
  voter: SignerWithAddress;
  creator: SignerWithAddress;
}

export const getUsers = async (): Promise<UsersProp> => {
  const [owner, voter, creator] = await ethers.getSigners();

  return {
    owner,
    voter,
    creator,
  };
};
