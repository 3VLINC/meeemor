require('dotenv').config();require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer')

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ALCHEMY_API_KEY_GOERLI = process.env.ALCHEMY_API_KEY_GOERLI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ALCHEMY_API_KEY_MAINNET = process.env.ALCHEMY_API_KEY_MAINNET;
const PRIVATE_KEY_DEPLOYER = process.env.PRIVATE_KEY_DEPLOYER;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings:{
      optimizer: {
        enabled: true,
        runs: 1e9
      }
    }
  },
  etherscan:{
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY
    }
  },
  networks: {
    hardhat:{
      allowUnlimitedContractSize: false,
    },
    goerli:{
      allowUnlimitedContractSize: false,
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY_GOERLI}`,
      accounts: [PRIVATE_KEY]
    },
    mainnet:{
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_MAINNET}`,
      accounts: [PRIVATE_KEY_DEPLOYER]
    },

    w3q: {
        url: "https://galileo.web3q.io:8545",
        accounts: [PRIVATE_KEY]
      }
  },


};
