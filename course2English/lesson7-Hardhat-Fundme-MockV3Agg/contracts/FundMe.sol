//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "./priceConverter.sol"; // imp library
// npm i @chainlink/contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.log"; // now can console.log("abc")
error FundMe_notOwner();

contract FundMe {
    using PriceConverter for uint256;

    // public uses more gas than private and internal
    // so we use getter setter for private
    uint public constant MINIMUM_USD = 50 * 1e18; // 1*10**18
    address public immutable i_owner;

    address[] public s_funders;
    mapping(address => uint) public s_addressToAmountFunded;
    AggregatorV3Interface public s_priceFeed;

    modifier onlyOwner() {
        //require(msg.sender==i_owner,"sender is not owner");
        //save gas by if than require
        if (msg.sender != i_owner) {
            revert FundMe_notOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        //msg.value.getConversionRate() // same getCR(msg.value);
        // use library function
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "less than limit"
        );
        funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public payable onlyOwner {
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            s_addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0); // reset erray
        // 3 ways to withdraw

        // // 1 transfer, auto revert,throws error if fail
        // payable(msg.sender).transfer(address(this).balance);
        // // 2 send, manually revert
        // bool sendSuccess= payable(msg.sender).send(address(this).balance);
        // // revert below
        // require(sendSuccess,"Send Failed"); // if return false mean tx failed
        // 3 call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call Failed");
    }

    // gas efficient withdraw function bcz in above fun we read & write storage/state var many time
    // bcz reading and writing storage var use gas
    function cheaperWithdrawable() public payable onlyOwner {
        address[] memory funders=s_funders;
            
        // mapping can't be in memory
        for(let i=0;i<funders.length;i++){
            address funder=funders[i];
            s_addressToAmountFunded[funder]=0;
        }
        s_funders=new address[](0); // reset array
        (bool callSuccess,)=i_owner.call{value:address(this).balance}("");
        require(callSuccess);

    }
}
