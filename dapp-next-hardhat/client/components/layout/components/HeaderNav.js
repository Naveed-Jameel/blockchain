import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderNav = () => {
  const Router = useRouter();
  return (
    <HeaderNavWrapper>
      <Link href={"/"}>
        <HeaderNavLink active={Router.pathname == "/" ? true : false}>
          Campaigns
        </HeaderNavLink>
      </Link>
      <Link href={"/createcampaign"}>
        <HeaderNavLink
          active={Router.pathname == "/createcampaign" ? true : false}
        >
          Create Campaign
        </HeaderNavLink>
      </Link>
      <Link href={"/dashboard"}>
        <HeaderNavLink active={Router.pathname == "/dashboard" ? true : false}>
          Dashboard
        </HeaderNavLink>
      </Link>
    </HeaderNavWrapper>
  );
};

const HeaderNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 60%;
  border-radius: 10px;
`;
const HeaderNavLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.active ? props.theme.bgSubDiv : props.theme.bgDiv};
  height: 80%;
  font-family: roboto;
  margin: 10px;
  padding: 0px 5px 0px 5px;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`;

export default HeaderNav;
