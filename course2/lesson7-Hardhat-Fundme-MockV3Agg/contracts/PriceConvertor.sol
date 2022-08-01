//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
// first yarn add --dev @chainlink/contracts
// then below import
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        //(uint80 roundId,int256 price,uint startedAt,uint timeStamp,uint80 answeredInRound)=priceFeed.latestRoundData();
        (, int256 price, , , ) = priceFeed.latestRoundData(); // return price of eth in usd 3000.00000000
        return uint256(price * 1e10); // i.e 1**10=10000000000
    }

    function getConversionRate(
        uint256 etherAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint ethPrice = getPrice(priceFeed);
        uint ethAmountInUsd = (ethPrice * etherAmount) / 1e18; // divide bcz ethPrice has 18 zero additional
        return ethAmountInUsd;
    }
}
