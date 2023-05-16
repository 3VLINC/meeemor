import { ethers, network } from 'hardhat';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

async function main() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];
  const meeemorDeployContractFactory = await ethers.getContractFactory(
    'MeeemorDeploy'
  );

  const meeemorDeployInstance = await meeemorDeployContractFactory
    .connect(contractOwner)
    .deploy();

  const {
    deployTransaction: { blockNumber },
  } = await meeemorDeployInstance.deployed();

  const stream = createWriteStream(
    resolve(`../../contracts.${network.name}.json`)
  );

  stream.write(
    JSON.stringify({
      meeemorDeploy: {
        address: meeemorDeployInstance.address,
        blockNumber,
      },
    })
  );

  stream.close();
  console.log(
    'MeeemorDeploy deployed to:',
    meeemorDeployInstance.address,
    'at block',
    blockNumber
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
