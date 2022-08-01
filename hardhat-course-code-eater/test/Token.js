// const {expect}=require("chai");
// //const {ethers}=require("hardhat");

// // below syntax is mocka framwork
// describe("Token contract",async()=>{

//     it("assign total supply to owner",async()=>{
//         const[owner]=await ethers.getSigners();
//         const Token=await ethers.getContractFactory("Token"); // create instance/obj of Token contract
//         const hardhatToken=await Token.deploy(); // deploy contract
//         const ownerBalance=await hardhatToken.balanceOf(owner.address);
//         const totalSupply=await hardhatToken.totalSupply(); // bcz public and getter auto available

//         expect(totalSupply).to.equal(ownerBalance);
//     })

//     it("transfer function",async()=>{
//         const[owner,addr1,addr2]=await ethers.getSigners();
//         const Token=await ethers.getContractFactory("Token"); // create instance/obj of Token contract
//         const hardhatToken=await Token.deploy(); // deploy contract

//         // transfer 10 token from owner to addr1
//         await hardhatToken.transfer(addr1.address,10);
//         expect(await hardhatToken.balanceOf(addr1.address),10);

//         // transfer 5 token from addr1 to addr2
//         // connect addr1 bcz now it can interact with contract functions by default owner/deployer i think connect
//         await hardhatToken.connect(addr1).transfer(addr2.address,5);
//         expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);

        
//     })
// })