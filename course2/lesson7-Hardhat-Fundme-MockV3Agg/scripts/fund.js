const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const deployer = await getNamedAccounts().deployer;
    const fundMe = await ethers.getContract("FundMe", deployer);

    console.log("Funding contract");
    const txResponse = await fundMe.fund({ val: 1000000000000 });
    await txResponse.wait(1);
    console.log("funded");
}

main().then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })