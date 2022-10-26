const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.providers.getBlockBumber();
        console.log(`current block number is : ${blockNumber}`);
    }
)

module.exports = {};
