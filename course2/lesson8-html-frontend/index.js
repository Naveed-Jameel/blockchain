//import {ethere} from "ethers";


async function connect(){
    if(typeof window.ethereum !== "undefined"){
        console.log("if metamask available then connect")
        await window.ethereum.request({method:"eth_requestAccounts"})
        document.getElementById("connectBtn").innerHTML="connected"
    }  
    else{
        document.getElementById("connectBtn").innerHTML="pleas install metamask"
    }
}

async function fund(etherAmount){
    console.log(`Funding with ${etherAmount}`)
}