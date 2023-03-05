import { ethers } from 'hardhat';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

async function main() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];
  const meeemorDeployContractFactory = await ethers.getContractFactory(
    'MEEEMORDeploy'
  );
  const poapContractFactory = await ethers.getContractFactory('Poap');

  const poapInstance = await poapContractFactory
    .connect(contractOwner)
    .deploy();

  const meeemorDeployInstance = await meeemorDeployContractFactory
    .connect(contractOwner)
    .deploy(poapInstance.address);

  const stream = createWriteStream(
    resolve('../frontend/src/environments/contracts.ts')
  );
  stream.write(`
  // DO NOT EDIT: This file is auto-generated

  export const contracts = {
    meeemorDeploy: '${meeemorDeployInstance.address}',
    poap: '${poapInstance.address}',
  };`);
  stream.close();
  console.log('MeeemorDeploy deployed to:', meeemorDeployInstance.address);
  console.log('Poap deployed to:', poapInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
