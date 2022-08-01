const {network,ethers}=require("hardhat");
const {developmentChains,networkConfig}=require("../hepler-hardhat-config")
const {verify}=require("../utils/verify")

module.exports=({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const { deployer}=await getNamedAccounts();
    const chainId=network.config.chainId;
    let vrfCoordinatorV2Address;
    let subscriptionId;

    if(developmentChains.includes(network.name)){
        const vrfCoordinatorV2Mock=await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address=vrfCoordinatorV2Mock.address;
        const txResponse=vrfCoordinatorV2Mock.createSubscription();
        const txReceipt=txResponse.wait(1);
        subscriptionId=txReceipt.events[0].args.subId;
        // Fund the subscription
        // Usually you dont need the link token on a real network
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId,"10")
    }
    else{
        vrfCoordinatorV2Address=networkConfig[chainId][vrfCoordinatorV2]
        subscriptionId=networkConfigg[chainId]["subscriptionId"]
    }
    const entranceFee=networkConfig[chainId]["entranceFee"]
    const gasLane=networkConfig[chainId]["gasLane"]
    const callbackGasLimit=networkConfig[chainId]["callbackGasLimit"]
    const interval=networkConfig[chainId]["interval"]

    const args=[vrfCoordinatorV2Address,entranceFee,gasLane,subscriptionId,callbackGasLimit,interval]
    const raffle=deploy("from:deployer,Raffle",{
        from:deployer,
        args:args,
        log:true,
        waitConfirmation:network.config.blockConfirmation || 1
    })

    // verify
    if(!developmentChains.includes(network.name && process.env.ETHERSCAN_API_KEY)){
        log("verifying......")
        await verify(raffle.address,args)
    }

}

module.exports.tags=["all","raffle"]