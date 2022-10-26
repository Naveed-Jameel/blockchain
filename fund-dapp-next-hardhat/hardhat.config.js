const { task } = require('hardhat/config');

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

// task("accounts","Print the List of accounts",async(taskArgs,hre)=>{
//   const accounts=await hre.ethers.getSigners();
//   for(const account of accounts){
//     console.log(account.address);
//   }
// })
const RPC_URL=process.env.RPC_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork:"rinkeby",
  networks:{
    hardhat:{},
    rinkeby:{
      chainId:4,
      url:RPC_URL,
      accounts:[PRIVATE_KEY]

    }
  }
};
