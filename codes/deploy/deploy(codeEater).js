//code Eater
// npx hardhat run scripts/deploy.js --network rinkeby
const {ethers}=require("hardhat");

async function main(){
    const[deployer]=await ethers.getSigners();
    const Token=await ethers.getContractFactory("Token");// Token is contract name
    const token=await Token.deploy();
    console.log(token.address);
}

main().then(()=>process.exit(0))
      .catch(err=>{
        console.log(err)
        process.exit(1)
    });