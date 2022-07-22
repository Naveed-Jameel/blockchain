const { ethers, run, network } = require("hardhat");

async function main() {
  // our contract file name
  const simpleStorageFactory = await ethers.getContractFactory("simpleStorage");
  console.log("deploy contract");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();

  // 31337 hardhat network id bcz on hardhat network cannot be verified
  if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);// wait for 6 block to mine then goto next linecode
    await verify(simpleStorage.address, []);
  }

  // interacting with contract in hardhat
  const currentFavNum = simpleStorage.retrieve();
  console.log(`current fav number is : ${currentFavNum}`);
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated fav number is : ${updatedValue}`);
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  }
  catch (e) {
    if (e.message.toLowerCase.Includes("already verified")) {
      console.log("already verified");
    }
    else {
      console.log(e);
    }
  }

}

main().then(() => console.log("success"))
  .catch((err) => console.log(err));