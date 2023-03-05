import { ethers } from 'hardhat';

async function main() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];
  const meeemorDeployContractFactory = await ethers.getContractFactory(
    'MEEEMORDeploy'
  );
  const poapContractFactory = await ethers.getContractFactory('Poap');

  await Promise.all([
    poapContractFactory.connect(contractOwner).deploy(),
    // meeemorDeployContractFactory.connect(contractOwner).deploy(),
  ]).then();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
