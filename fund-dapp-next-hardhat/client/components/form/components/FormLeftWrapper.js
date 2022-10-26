import styled from "styled-components";
import { FormState } from "../Form";
import { useContext } from "react";

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>Campaign Title</label>
        <Input
          value={Handler.form.campaignTitle}
          onChange={Handler.formHandler}
          placeholder="Campaign Title"
          name="campaignTitle"
        ></Input>
      </FormInput>
      <FormInput>
        <label>Story</label>
        <TextArea
          value={Handler.form.story}
          onChange={Handler.formHandler}
          placeholder="Describe your story"
          name="story"
        ></TextArea>
      </FormInput>
    </FormLeft>
  );
};

const FormLeft = styled.div`
  width: 48%;
`;
const FormInput = styled.div`
  font-family: poppins;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

const TextArea = styled.textarea`
  padding: 8px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  max-width: 100%;
  min-width: 100%;
  overflow-x: hidden;
`;

export default FormLeftWrapper;
