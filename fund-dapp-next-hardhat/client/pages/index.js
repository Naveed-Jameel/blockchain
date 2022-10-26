import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { useState } from "react";

export default function Index({
  allData,
  healthData,
  educationData,
  animalData,
}) {
  //const [filter, setFilter] = useState(allData); // uncomment this and del below one
  const [filter, setFilter] = useState([]);

  return (
    <HomeWrapper>
      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
        <Category onClick={() => setFilter(allData)}>All</Category>
        <Category onClick={() => setFilter(healthData)}>Health</Category>
        <Category onClick={() => setFilter(educationData)}>Education</Category>
        <Category onClick={() => setFilter(animalData)}>Animal</Category>
      </FilterWrapper>

      <CardsWrapper>
        <Card>
          <CardImg>
            <Image layout="fill" src={``} />
          </CardImg>
          <Title>Title</Title>
          <CardData>
            <Text>
              Owner
              <AccountBoxIcon />
            </Text>
            <Text>anvbcnc.....ek9s</Text>
          </CardData>
          <CardData>
            <Text>
              Amount
              <PaidIcon />
            </Text>
            <Text>100 Matic</Text>
          </CardData>
          <CardData>
            <Text>
              <EventIcon />
            </Text>
            <Text>1 / 2 / 22</Text>
          </CardData>
          <Button>Go to Campaign</Button>
        </Card>
      </CardsWrapper>

      {/* <CardsWrapper> // this will uncomment and above delete
        {filter.map((campaign) => (
          <Card>
            <CardImg>
              <Image
                layout="fill"
                src={`https://ipfs.infura.io/ipfs/${campaign.image}`}
              />
            </CardImg>
            <Title>{campaign.title}</Title>
            <CardData>
              <Text>
                Owner
                <AccountBoxIcon />
              </Text>
              <Text>
                {campaign.owner.slice(0, 6)}...{campaign.owner.slice(39)}
              </Text>
            </CardData>
            <CardData>
              <Text>
                Amount
                <PaidIcon />
              </Text>
              <Text>{campaign.amount} Matic</Text>
            </CardData>
            <CardData>
              <Text>
                <EventIcon />
              </Text>
              <Text>
                {new Date(campaign.timeStamp * 1000).toLocaleString()}
              </Text>
            </CardData>
            <Button>Go to Campaign</Button>
          </Card>
        ))}
      </CardsWrapper> */}
    </HomeWrapper>
  );
}

// uncomment below function
/**export async function getStaticProps() {
  // env.NEXT_PUBLIC_RPC_URL
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(
    process.env.CONTRACT_DEPLOYED_ADDRESS, // contract deployed on that address
    CampaignFactory.abi,
    provider
  );
  // event createCampaign return array
  const getAllCampaigns = contract.filters.campaignCreated();
  const allCampaigns = await contract.queryFilter(getAllCampaigns);
  const allData = allCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imageUrl,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
    };
  });

  const getHealthCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Health"
  );
  const allHealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const healthData = allHealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imageUrl,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Education"
  );
  const allEducationCampaigns = await contract.queryFilter(
    getEducationCampaigns
  );
  const educationData = allEducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imageUrl,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      
    };
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Animal"
  );
  const allAnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const animalData = allAnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imageUrl,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      
    };
  });

  return {
    // pass data as props
    props: {
      allData,
      healthData,
      educationData,
      animalData,
    },
  };
}
**/

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`;

const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: normal;
  cursor: pointer;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`;

const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`;

const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;

const Title = styled.div`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;

const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  padding: 0px;
  margin: 0px;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, 5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
