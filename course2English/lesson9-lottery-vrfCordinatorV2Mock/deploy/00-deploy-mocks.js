const {network}=require("hardhat");
const {developmentChains}=require("../hepler-hardhat-config");

const BASE_FEE=0.25 // link per request
const GAS_PRICE_LINK=1e9 //1000000000 // calculated value based on gas price of the chain
module.exports=({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const { deployer}=await getNamedAccounts();
    //const chainId=network.config.chainId;
    const args=[BASE_FEE,GAS_PRICE_LINK]

    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...");
        // so now deploy a mock vfrCo0rdinator
        await deploy("VRFCoordinatorV2Mock",{
            from:deployer,
            log:true,
            args:args

        })
        log("Mock deployed")
    }
}
module.exports.tags=["all","mocks"]