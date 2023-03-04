import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-web3';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';
import '@typechain/hardhat';

dotenv['config']();
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1e9,
      },
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    w3q: {
      url: 'https://galileo.web3q.io:8545',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
