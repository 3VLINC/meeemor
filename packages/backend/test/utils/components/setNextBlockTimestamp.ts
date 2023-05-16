import { BigNumber } from 'ethers';
import { ethers, network } from 'hardhat';

export const setNextBlockTimestamp = (y: BigNumber) =>
  ethers.provider
    .send('evm_setNextBlockTimestamp', [y.toNumber()])
    .then(() => network.provider.send('evm_mine'));
