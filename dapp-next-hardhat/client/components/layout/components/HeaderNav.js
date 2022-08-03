import styled from "styled-components"


const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <HeaderNavLink>Campaign</HeaderNavLink>
      <HeaderNavLink>Create Campaign</HeaderNavLink>
      <HeaderNavLink>Dashboard</HeaderNavLink>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:${(props)=>props.theme.bgDiv};
  padding:6px;
  height:60%;
  border-radius:10px;
`
const HeaderNavLink=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:${(props)=>props.theme.bgSubDiv};
  height:80%;
  font-family:roboto;
  margin:10px;
  padding:0px 5px 0px 5px;
  border-radius:10px;
  cursor:pointer;
  text-transform:uppercase;
  font-weight:bold;
  font-size:small;


`

export default HeaderNav