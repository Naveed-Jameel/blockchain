require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // this npm pkj for contract verification
require("./tasks/block-number");

/** @type import('hardhat/config').HardhatUserConfig */


const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4
    },
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    }
  }
};
