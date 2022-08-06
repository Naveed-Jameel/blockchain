import styled from "styled-components";
import { FormState } from "../Form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

import { create as IPFSHTTPClient } from "ipfs-http-client";
const client = IPFSHTTPClient("https://ipfs.infura.io:5001/apiv0");

const FormRightWrapper = () => {
  const Handler = useContext(FormState);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUploadFile = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path);
      } catch (error) {
        console.log("error story");
        toast.warn("Error Uploading Story");
      }
    } else {
      toast.warn("File Field is Required");
      setUploadLoading(false);
      return;
    }

    if (Handler.image !== null) {
      try {
        const added = await client.add(Handler.image);
        Handler.setImageUrl(added.path);
      } catch (error) {
        toast.warn("Error Uploading Image");
      }
    } else {
      toast.warn("Story Field is Required");
      setUploadLoading(false);
      return;
    }

    setUploadLoading(false);
    setUploaded(true);
    toast.success("Files Uploaded Success");
  };

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              value={Handler.form.requiredAmount}
              onChange={Handler.formHandler}
              type={"number"}
              placeholder="Required Amount"
              name="requiredAmount"
            ></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select
              value={Handler.form.category}
              onChange={Handler.formHandler}
              name="category"
            >
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      <FormInput>
        <label>Select Image</label>
        <Image
          onChange={Handler.imageHandler}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>
      {uploadLoading ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded ? (
        <Button style={{ cursor: "no-drop" }}>File Uploaded Successfuly</Button>
      ) : (
        <Button onClick={handleUploadFile}>Upload Files to IPFS</Button>
      )}
      <Button
        onClick={(e) => {
          uploaded
            ? Handler.startCampaign(e)
            : toast.warn("File Upload Required");
        }}
      >
        Start Campaign
      </Button>
    </FormRight>
  );
};

const FormRight = styled.div`
  width: 45%;
`;
const FormInput = styled.div`
  font-family: poppins;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Input = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Select = styled.select`
  padding: 8px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
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
export default FormRightWrapper;
