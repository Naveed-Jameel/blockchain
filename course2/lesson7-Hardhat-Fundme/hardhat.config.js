require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // this npm pkj for contract verification
require("./tasks/block-number");
require("hardhat-gas-reporter"); // when test run this work
require("solidity-coverage"); // npm pkj >run> y hh coverage
require("hardhat-deploy");
const RPC_URL = process.env.RPC_URL; // of blockchain network like mainnet,rinkeby etc
const PRIVATE_KEY = process.env.PRIVATE_KEY; // private of metamask wallet/account
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // my app key that i create on etherscan.io 
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.0" },
      { version: "0.6.6" },
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6
    },
    etherscan: { // show tx history on etherscan i think
      apiKey: ETHERSCAN_API_KEY,
    },
    // below for gas fee of every tx in usd
    gasReporter: {
      enabled: true,
      outputFile: "gas-reporter.txt", // generate this file of gas fee info
      noColors: true,
      currency: "USD", // below 2 lines can be remove i think 
      coinmarketcap: "coinmarket-api-key", // from coinmarketcap login and get key
      //token:"MATIC"
    },
    namedAccounts: { // these 0,1 from above networks>rinkeby>from accounts array 
      deployer: {
        default: 0,  // mean for default use account 0 
        //4: 1,       // for rinkeby use account 1 > 4 is chain Id of rinkeby
        //31337: 2
      }
    }
  }
};
