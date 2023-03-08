import { Chain } from '@wagmi/core';
export const web3q: Chain = {
  id: 3334,
  name: 'Web3Q Galileo',
  network: 'web3q-galileo',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://galileo.web3q.io:8545'] },
    default: { http: ['https://galileo.web3q.io:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'Galileo', url: 'https://explorer.galileo.web3q.io/' },
    default: { name: 'Galileo', url: 'https://explorer.galileo.web3q.io/' },
  },
  contracts: {},
};

export const hardhat: Chain = {
  id: 1337,
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://localhost:8545'] },
    default: { http: ['http://localhost:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'Localhost', url: 'http://localhost:4000/' },
    default: { name: 'Localhost', url: 'http://localhost:4000/' },
  },
  contracts: {},
};

export const config = {
  walletConnect: {
    projectId: 'fd42f9d80a0ed21f81245e51d0d10e1c',
    chains: [web3q, hardhat],
  },
};
