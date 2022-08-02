// this deploy inside deploy folder
// run yarn hardhat deploy > i think run all deploy
// yarn hardhat deploy --tags fundme > run only this deploy

const { network } = require("hardhat");
const { networkConfig, developmentChain } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
//const {getNamedAccounts,deployments}=require("hardhat")//can also import like this instead of props 
    const { deploy, log } = deployments;
    const { deployer } = getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUsdPriceFeddAddress;
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockAggV3");
        ethUsdPriceFeddAddress = ethUsdAggregator.address;
    }
    else {
        ethUsdPriceFeddAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    const args = [ethUsdPriceFeddAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // this constructor of contract
        log: true,
        waitConfirmationa: network.config.blockConfirmations || 1
    })

    if (!developmentChain.includes(network.name) && etherscan_key) {
        await verify(fundMe.address, args);
    }


}
module.exports.tags = ["all", "fundme"]

// function deployFunc(hre) { // hre like props
//     const {getNamedAccounts,deployments}=hre // also like hre.getNamedAccounts
// }
// module.exports.default = deployFunc;
// same like above