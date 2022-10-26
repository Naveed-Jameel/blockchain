import styled from "styled-components";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Wallet from "./Wallet";
import { App } from "../Layout";
import { useContext } from "react";

const HeaderRight = () => {
  const { changeTheme, theme } = useContext(App);

  return (
    <HeaderRightWrapper>
      <Wallet />
      <ThemeToggle>
        {theme == "light" ? (
          <DarkModeIcon onClick={changeTheme} />
        ) : (
          <Brightness7Icon onClick={changeTheme} />
        )}
      </ThemeToggle>
    </HeaderRightWrapper>
  );
};

const HeaderRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  height: 60%;
`;
const ThemeToggle = styled.div`
  background-color: ${(props) => props.theme.bgDiv};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5px;
  width: 45px;
  border-radius: 10px;
  cursor: pointer;
`;

export default HeaderRight;
