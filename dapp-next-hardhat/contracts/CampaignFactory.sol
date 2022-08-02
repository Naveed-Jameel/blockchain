//SPDX-License-Identifier:MIT

pragma solidity >0.7.0 <=0.9.0;
import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imageUrl,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint campaignRequiredAmount,
        string memory imageUrl,
        string memory storyUrl,
        string memory category
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            campaignRequiredAmount,
            imageUrl,
            storyUrl
        );
        deployedCampaigns.push(address(newCampaign));
        emit campaignCreated(
            campaignTitle,
            campaignRequiredAmount,
            msg.sender,
            address(newCampaign),
            imageUrl,
            block.timestamp,
            category
        );
    }
}
