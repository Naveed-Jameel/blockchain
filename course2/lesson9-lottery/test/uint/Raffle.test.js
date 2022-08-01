const {developmentChains,networkConfig}=require("../../hepler-hardhat-config");
const {network,getNamedAccounts,deployments,ethers}=require("hardhat");
const {assert,expect}=require("chai");

!developmentChains.includes(network.name) ? describe.skip : 
    describe("Raffle Unit Tests",async()=>{
        let raffle;
        let vrfCoordinatorV2Mock;
        let raffleEntranceFee;
        let deployer;
        let interval;
        const chainId=network.config.chainId;

        beforeEach(async()=>{
            deployer=(await getNamedAccounts()).deployer;
            await deployments.fixture(["all"]); // this mean deploy all contract whose tags include is 'all';
            raffle=await ethers.getContract("Raffle",deployer);
            vrfCoordinatorV2Mock=await ethers.getContract("VRFCoordinatorV2Mock",deployer);
            raffleEntranceFee=await raffle.getEntranceFee();
            interval=await raffle.getInterval();

        })

        describe("constructor",async()=>{
            it("initializes the raffle correctly",async ()=>{
                const raffleState=await raffle.getRaffleState();
                assert(raffleState.toString(),"0");
                assert(interval.toString(),networkConfig[chainId]["interval"]);
            })
        })

        describe("enterRaffle",async()=>{
            it("reverts when you dont pay enough",async()=>{
                await expect(raffle.enterRaffle()).to.be.revertedWith("Raffle__NotEnoughEthEntered");

            })
            it("records players when they enter",async()=>{
                await raffle.enterRaffle({value:raffleEntranceFee});
                const playerFromContract=await raffle.getPlayer(0);
                assert.equal(playerFromContract,deployer)
            })
            it("emits event on enter",async()=>{
                await expect(raffle.enterRaffle({value:raffleEntranceFee})).to.emit(raffle,"RaffleEnter")
            })
            it("doesnt allow the entrance when raffle is calculating",async()=>{
                await raffle.enterRaffle({value:raffleEntranceFee});
                await network.provider.send("evm_increaseTime",[interval.toNumber()+1])
                await network.provider.send("evm_mine",[])
                await raffle.performUpkeep([])
                await expect(raffle.enterRaffle({value:raffleEntranceFee})).to.be.revertedWith("Raffle__NotOpen")
            })
        })
    })

