import styled from "styled-components";
import FormLeftWrapper from "./components/FormLeftWrapper";
import FormRightWrapper from "./components/FormRightWrapper";

const Form = () => {
  return (
    <FormWrapper>
      <FormMain>
        <FormInputsWrapper>
          <FormLeftWrapper />
          <FormRightWrapper />
        </FormInputsWrapper>
      </FormMain>
    </FormWrapper>
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

export default Form;
