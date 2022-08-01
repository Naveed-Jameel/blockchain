const {expect}=require("chai");
const {ethers}=require("hardhat");

describe("Token2 contract",async()=>{
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async()=>{
        Token=await ethers.getContractFactory("Token");
        // here signer account of default present in hardhat
        // while using any test or main net we accounts that we specify in accounts arr in net
        [owner,addr1,addr2,...addrs]=await ethers.getSigners();
        hardhatToken=await Token.deploy();
    })

    describe("Deployement",async()=>{
        it("Should set the right owner",async()=>{
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Should assign total supply to owner",async()=>{
            const ownerBlnc=await hardhatToken.balanceOf(owner.address);
            const totalSupply=await hardhatToken.totalSupply();
            expect(totalSupply).to.equal(ownerBlnc);
            
        })
    })
    describe("Transactions",async()=>{

        it("transfer function",async()=>{
            // here we transfer from owner to addr1
            await hardhatToken.transfer(addr1.address,5);
            const addr1Blnc=await hardhatToken.balanceOf(addr1.address);
            expect(addr1Blnc).to.equal(5);

            // here we transfer from addr1 to addr2 so first we connect addr1 with contract
            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Blnc=await hardhatToken.balanceOf(addr2.address);
            console.log(addr2Blnc);
            expect(addr2Blnc).to.equal(5);

        })

        it("Should failed if sender not enough balance",async()=>{
            // For every it ther would be initial state like blnc or other extra unless except that in beforeEach
            const initialOwnerBlnc=await hardhatToken.balanceOf(owner.address)
            // string in revertedWith shoould be same that we write in require("") inside our contract
            // bcz require return same string and we match string here with this string
            await expect(hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens in wallet")
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBlnc)
        })

        it("Should Update balance after transaction",async()=>{
            const initialOwnerBlnc=await hardhatToken.balanceOf(owner.address);
            // transfer from owner to addr1,addr2
            await hardhatToken.transfer(addr1.address,10);
            await hardhatToken.transfer(addr2.address,20);

            const finalOwnerBlnc=await hardhatToken.balanceOf(owner.address);
            const addr1Blnc=await hardhatToken.balanceOf(addr1.address);
            const addr2Blnc=await hardhatToken.balanceOf(addr2.address);

            expect(finalOwnerBlnc).to.equal(initialOwnerBlnc-30);
            expect(addr1Blnc).to.equal(10);
            expect(addr2Blnc).to.equal(20);
        })

    })

        
    
})