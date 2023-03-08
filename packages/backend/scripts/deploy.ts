import { ethers } from 'hardhat';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

async function main() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];
  const meeemorDeployContractFactory = await ethers.getContractFactory(
    'MEEEMORDeploy'
  );

  const meeemorDeployInstance = await meeemorDeployContractFactory
    .connect(contractOwner)
    .deploy();

  const stream = createWriteStream(resolve('../../contracts.w3q.json'));

  stream.write(
    JSON.stringify({
      meeemorDeploy: meeemorDeployInstance.address,
    })
  );

  stream.close();
  console.log('MeeemorDeploy deployed to:', meeemorDeployInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
