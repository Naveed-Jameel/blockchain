import styled from "styled-components";
import FormLeftWrapper from "./components/FormLeftWrapper";
import FormRightWrapper from "./components/FormRightWrapper";
import { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import CampaignFactory from "../../../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";

const FormState = createContext();

const Form = () => {
  const [form, setForm] = useState({
    campaignTitle: "",
    story: "",
    requiredAmount: "",
    category: "education",
  });
  const [image, setImage] = useState(null);
  const [storyUrl, setStoryUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const startCampaign = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (form.campaignTitle === "") {
      toast.warn("Title Field is empty");
    } else if (form.story === "") {
      toast.warn("Story Field is empty");
    } else if (form.requiredAmount === "") {
      toast.warn("requiredAmount Field is empty");
    } else {
      setLoading(true);

      const contract = new ethers.Contract(
        // env.NEXT_PUBLIC_ADDRESS
        process.env.CONTRACT_DEPLOYED_TO_ADDRESS,
        CampaignFactory.abi,
        signer
      );

      console.log("Starting new Campaign");
      const campaignData = await contract.createCampaign(
        form.campaignTitle,
        parseInt(form.requiredAmount),
        imageUrl,
        storyUrl,
        form.category
      );

      await campaignData.wait();
      setAddress(campaignData.to);
    }
  };

  return (
    <FormState.Provider
      value={{
        form,
        formHandler,
        image,
        imageHandler,
        setImageUrl,
        setStoryUrl,
        startCampaign,
      }}
    >
      <FormWrapper>
        <FormMain>
          {loading ? (
            address == "" ? (
              <Spinner>
                <TailSpin height={60} />
              </Spinner>
            ) : (
              <Address>
                <h1>Campaign Started Successfully</h1>
                <h2>{address}</h2>
                <Button>Go to Campaign</Button>
              </Address>
            )
          ) : (
            <FormInputsWrapper>
              <FormLeftWrapper />
              <FormRightWrapper />
            </FormInputsWrapper>
          )}
        </FormMain>
      </FormWrapper>
    </FormState.Provider>
  );
};

const FormWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`;

const FormMain = styled.div`
  width: 80%;
`;

const FormTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 40px;
  font-family: poppins;
  color: ${(props) => props.theme.color};
  margin-top: 20px;
`;

const FormInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Address = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgSubDiv};
  border-radius: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default Form;
export { FormState };
