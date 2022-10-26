const networkConfig = {
  4: {
    // chain id of rinkeby 4
    name: "rinkeby",
    ethUsdPriceFeed: "eth/usd address for rinkeby bookmark AggV3 priceFeed",
  },
  137: {
    // chain id of polygon 137
    name: "polygon",
    ethUsdPriceFeed: "eth/usd address for polygon",
  },
};

const developmentChain = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;
module.exports = {
  networkConfig,
  developmentChain,
  DECIMALS,
  INITIAL_ANSWER,
};
