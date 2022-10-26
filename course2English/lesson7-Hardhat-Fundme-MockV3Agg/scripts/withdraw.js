const { getNamedAccounts, ethers } = require("hardhat");

// yarn hh run scripts/withdraw.js run like this
async function main() {
  const deployer = await getNamedAccounts().deployer;
  //get contract and connect with deployer
  const fundMe = await ethers.getContract("FundMe", deployer);

  console.log("withdrawing...");
  const txResponse = await fundMe.withdraw();
  await txResponse.wait(1);
  console.log("got it");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
