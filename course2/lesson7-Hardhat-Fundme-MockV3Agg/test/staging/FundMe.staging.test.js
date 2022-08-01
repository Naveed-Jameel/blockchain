const { getNamedAccounts, ethers, network } = require("hardhat");
const { developementChain } = require("../../helper-hardhat-config");
const { assert } = require("chai");
// only run on testnet
developementChain.includes(network.name) ? describe.skip :
    describe("FundMe", async () => {
        let fundMe;
        let deployer;
        const sendVal = 100000000;
        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer;
            fundMe = await ethers.getContract("FundMe", deployer);
        })

        it("allows people to fund and withdraw", async () => {
            await fundMe.fund({ value: sendVal });
            await fundMe.withdraw();
            const endingBalance = await fundMe.provider.getBalance(fundMe.address);
            assert.equal(endingBalance.toString(), "0");
        })
    })