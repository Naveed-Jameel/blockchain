
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

// only run on development chain
!developementChain.includes(network.name) ? describe.skip :
    describe("FundMe", async () => {
        let fundMe;
        let deployer;
        let mockV3Aggregator;
        const sendVal = 100000000000000;
        beforeEach(async () => {
            // deploy our FundMe contract using hardhat deploy
            //const accounts=await ethers.getSigners() > from hh.config.js networks >rinkeby >accounts
            //const account1=accounts[0];
            deployer = (await getNamedAccounts()).deployer; // account that deploy contract
            console.log(deployer);
            await deployments.fixture(["all"]) // deploy all contracts that is in deploy folder
            fundMe = await ethers.getContract("FundMe", deployer); // give most recently deployed FundMe contract and connect with deployer account
            mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);

        })

        describe("constructor", async () => {
            it("sets the aggregator address correctly", async () => {
                const response = fundMe.s_priceFeed();
                assert.equal(response, mockV3Aggregator.address);
            })
        })

        describe("fund", async () => {
            it("Fails if you dont send enough Eth", async () => {
                await expect(fundMe.fund()).to.be.revertedWith("You need to spend more Eth")
            })

            it("update the amount funded data structure", async () => {
                await fundMe.fund({ value: sendVal }) // here we transfer fund
                const response = await fundMe.s_addressToAmountFunded(deployer) //from mapping we get funded value who fund it
                assert.equal(response.toString(), sendVal.toString())
            })
            it("add funder to array of s_funders", async () => {
                await fundMe.fund({ value: sendVal });
                const funder = await fundMe.s_funders(0); // funder at s_funders array 0
                assert.equal(funder, deployer);
            })
        })

        describe("withdraw", async () => {
            beforeEach(async () => {
                await fundMe.fund({ value: sendVal })
            })

            it("withdraw fund from a single funder", async () => {
                // before withdraw blnc of contract and deployer
                // this is contract blnc
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                // this is deployer blnc mean who deploy this contract
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                const transactionResponse = await fundMe.withdraw();
                const transactionReceipt = await transactionResponse.wait(1);
                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                const gasCost = gasUsed.mul(effectiveGasPrice); // multiply like this bcz big numbers

                // now after withdraw blnc of contract and deployer
                const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const endingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                assert.equal(endingFundMeBalance, 0);
                assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                    endingDeployerBalance.add(gasCost).toString())// gasCost bcz some amount also used for gas


            })
            it("allows us to withdraw from multiple s_funders", async () => {
                const accounts = await ethers.getSigners();
                for (let i = 0; i < 6; i++) {
                    // connect function similar like in remix we change account and add blnc to contract from changed account
                    const fundMeConnectedContract = await fundMe.connect(accounts[i]);
                    fundMeConnectedContract.fund({ value: sendVal })
                }
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                const transactionResponse = await fundMe.withdraw();
                const transactionReceipt = await transactionResponse.wait(1);
                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                const gasCost = gasUsed.mul(effectiveGasPrice);

                const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const endingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                assert.equal(endingFundMeBalance, 0);
                assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                    endingDeployerBalance.add(gasCost).toString())

                // make sure s_funders array reset
                await expect(fundMe.s_funders(0)).to.be.reverted

                // also all the mapping updating to zero blncs
                for (let i = 0; i < 6; i++) {
                    assert.equal(fundMe.s_addressToAmountFunded(accounts[i].address), 0);
                }


            })

            it("only allow owner to withdraw", async () => {
                const accounts = await ethers.getSigners();
                const attacker = accounts[1]; // suppose this is attacker
                const attackerConnectedAccounts = await fundMe.connect(attacker);
                await expect(attackerConnectedAccounts.withdraw()).to.be.revertedWith("FundMe_notOwner")
            })

            it("cheaperWithdraw testing...", async () => {
                const accounts = await ethers.getSigners();
                for (let i = 0; i < 6; i++) {
                    // connect function similar like in remix we change account and add blnc to contract from changed account
                    const fundMeConnectedContract = await fundMe.connect(accounts[i]);
                    fundMeConnectedContract.fund({ value: sendVal })
                }
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                const transactionResponse = await fundMe.cheaperWithdraw();
                const transactionReceipt = await transactionResponse.wait(1);
                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                const gasCost = gasUsed.mul(effectiveGasPrice);

                const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const endingDeployerBalance = await fundMe.provider.getBalance(deployer.address);

                assert.equal(endingFundMeBalance, 0);
                assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(),
                    endingDeployerBalance.add(gasCost).toString())

                // make sure s_funders array reset
                await expect(fundMe.s_funders(0)).to.be.reverted

                // also all the mapping updating to zero blncs
                for (let i = 0; i < 6; i++) {
                    assert.equal(fundMe.s_addressToAmountFunded(accounts[i].address), 0);
                }


            })
        })


    })