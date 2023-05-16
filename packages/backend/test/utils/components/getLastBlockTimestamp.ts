import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export const getLastBlockTimestamp = () =>
  ethers.provider
    .getBlockNumber()
    .then((blockNumber) => ethers.provider.getBlock(blockNumber))
    .then((block) => BigNumber.from(block.timestamp));
