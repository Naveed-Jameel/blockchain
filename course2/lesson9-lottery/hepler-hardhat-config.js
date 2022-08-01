const {ethers}=require("hardhat");

const networkConfig={
    4:{
        name:"rinkeby",
        vrfCoordinatorV2:"0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        entranceFee:ethers.utils.parseEther("0.01"), // this mean 0.01 eth
        gasLane:"abc", // gwei key hash from bm where vrfCoordinatorV2 address 
        subscriptionId:"0",
        callbackGasLimit:"500,000",
        interval:"30"
    },
    31337:{
        name:"hardhat",
        entranceFee:ethers.utils.parseEther("0.01"),
        gasLane:"anything",// bcz no need in local
        callbackGasLimit:"500,000",
        interval:"30"


    }
}

const developmentChains=["hardhat","localhost"]

module.exports={
    networkConfig,
    developmentChains
}