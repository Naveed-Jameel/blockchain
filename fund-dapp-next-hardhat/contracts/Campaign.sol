//SPDX-License-Identifier:MIT

pragma solidity >0.7.0 <=0.9.0;

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event donated(
        address indexed donar,
        uint indexed amount,
        uint indexed timestamp
    );

    constructor(
        string memory campaignTitle,
        uint campaignRequiredAmount,
        string memory imageUrl,
        string memory storyUrl,
        address campaignOwner
    ) {
        title = campaignTitle;
        requiredAmount = campaignRequiredAmount;
        image = imageUrl;
        story = storyUrl;
        owner = payable(campaignOwner);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount, "required amount fullfilled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
