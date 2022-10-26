const {ethers}=require("hardhat");

async function main(){
    const CampaignFactory=await ethers.getContractFactory("CampaignFactory");
    const campaignFactory=await CampaignFactory.deploy();
    await campaignFactory.deployed(); // wait until not deployed
    console.log("factory deployed to"+campaignFactory.address);
}

main()
    .then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })