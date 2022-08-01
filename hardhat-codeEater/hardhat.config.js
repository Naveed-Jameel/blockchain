/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const RINKEBY_RPC_URL="https://eth-rinkeby.alchemyapi.io/v2/GzvRRSqhwmKoB82euEWZk-biLNuDqHbN"
const PRIVATE_KEY="df28effc29035dfc4cc45880f2309438d1969a2edc8eb43819eecb721b9ca169"

module.exports = {
  solidity: "0.8.9",

  networks:{
    rinkeby:{
      chainId:4,
      url:RINKEBY_RPC_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
