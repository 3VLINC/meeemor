import w3q from '../../../../contracts.w3q.json';
import hardhat from '../../../../contracts.hardhat.json';

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  contracts: {
    w3q,
    hardhat,
  },
};
