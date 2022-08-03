import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";

// below i think for if network not added in metamask then by this pop up for add network in metamask
// this networks obj as it is here
// const networks={
//     rinkeby:{
//         chainId:`0x${Number(4).toString(16)}`,
//         chainName:"Rinkeby Testnet",
//         nativeCurrency:{
//             name:"RinkebyETH",
//             symbol:"RinkebyETH",
//             decimals:18
//         },
//         rpcUrls:["https://rinkeby.infura.io/v3/"],
//         blockExplorerUrls:["https://rinkeby.etherscan.io"]
//     }
// }
// below if after provider
// if(provider.network !== "rinkeby"){
//     await window.ethereum.request({
//         method:"wallet_addEthereumChain",
//         params:[
//             {
//             ...networks["rinkeby"]
//             }
//         ]
//     })
//     const account=provider.getSigner();
//     const Address=await account.getAddress();
//     setAddress(Address)
// }

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const account = provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);
    const Balance = ethers.utils.formatEther(await account.getBalance());
    setBalance(Balance);

    //setAddress(provider._getAddress());
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {address == "" ? (
        <Address>Connect Wallet</Address>
      ) : (
        <>
          <Balance>{balance.slice(0, 4)} Eth</Balance>
          <Address>
            {address.slice(0, 8)}...{address.slice(39)}
          </Address>
        </>
      )}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  padding: 5px 9px;
  height: 100%;
  border-radius: 10px;
  margin-right: 15px;
  cursor: pointer;
  font-family: "Roboto";
  font-weight: bold;
  font-size: small;
`;

const Address = styled.h2`
  background-color: ${(props) => props.theme.bgSubDiv};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 0px 5px 0px 5px;
  border-radius: 10px;
`;

const Balance = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 10px;
`;

export default Wallet;
