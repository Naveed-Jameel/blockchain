const { network } = require("hardhat");
const { developmentChain, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config");
// for mock deploy run cmd
// yarn hardhat deploy --tags mocks
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = getNamedAccounts();
    const chainId = network.config.chainId;
    if (chainId == 31337) { // 31337 for hardhat and localhost
        log("Local network detected! Deploying mocks..");
        await deploy("MockAggV3", {
            contract: "MockAggV3",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        })
        log("Mocks deployed");
    }

}

module.exports.tags = ["all", "mocks"]