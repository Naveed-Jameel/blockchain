// SPDX-License-Identifier:MIT

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity "0.8.7";

// yarn add --dev @chainlink/contracts
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error Raffle__NotEnoughEthEntered();
error Raffle__TransferFailed();
error Raffle__NotOpen(); // or lottery not open , raffle mean lottery
error Raffle__UpkeepNotNeeded(uint256 currentBalance,uint256 numPlayers,uint256 raffleState);

contract Raffle is VRFConsumerBaseV2,KeeperCompatibleInterface{

    enum  RaffleState {
        OPEN,
        CALCULATING
    } //uint256 0=OPEN, 1=CALACULATING

    uint256 private immutable i_enteranceFee; // i bcz set 1 time
    address payable[] private s_players;
    VRFCordinatorV2Interface private immutable i_vrfCordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATION=3;
    uint32 private constant NUM_WORDS=1;

    // lotter state vars
    address private s_recentWinner;
    RaffleState private s_raffleState;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_interval;

    event RaffleEnter(address indexed player);
    event RequestedRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);
     
    constructor(
        address vrfCordinatorV2,
        uint256 enteranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint256 interval
        ) VRFConsumerBaseV2(vrfCordinatorV2) {
        i_enteranceFee = enteranceFee;
        i_vrfCordinator=VRFCordinatorV2Interface(vrfCordinatorV2)
        i_gasLane=gasLane
        i_subscriptionId=subscriptionId
        i_callbackGasLimit=callbackGasLimit
        s_raffleState=RaffleState.OPEN // RaffleState(0)
        s_lastTimeStamp=block.timestamp
        i_interval=interval
    }

    function enterRaffle() public payable {
        if (msg.value < i_enteranceFee) {
            revert Raffle__NotEnoughEthEntered();
        }
        if(s_raffleState != RaffleState.OPEN){
            revert Raffle__NotOpen();
        }
        s_players.push(payable(msg.sender))
        emit RaffleEnter(msg.sender)
    }

    function checkUpkeep(bytes memory /*checkData*/)
        public view override returns(bool upkeepNeeded,bytes memory /*performData*/) {
            bool isOpen=(RaffleState.OPEN==s_raffleState)
            bool timePassed=((block.timestamp - s_lastTimeStamp) > i_interval)
            bool hasPlayers=(s_players.length > 0)
            bool hasBalance=address(this).balance > 0
            upkeepNeeded=(isOpen && timePassed && hasPlayers && hasBalance)

    }
    // i think below function automatic called whenever checkUpkeep return true
    function performUpkeep(bytes calldata /*performData*/) external override {

        (bool upkeepNeeded,)=checkUpkeep("")
        if(!upkeepNeeded){
            revert Raffle__UpkeepNotNeeded(address(this).balance,s_players.length,uint256(s_raffleState));
        }
        s_raffleState=RaffleState.CALACULATING;
        // Request the random number by chainLink VRF
        uint256 requestId= i_vrfCordinator.requestRandomWords(
            i_gasLane, // gasLane
            i_subscriptionId,
            REQUEST_CONFIRMATION,
            i_callbackGasLimit,
            NUM_WORDS
        )
        emit RequestedRaffleWinner(requestId);
    }
    function fulfilRandomWord(uint256 requestId,uint256[] memory randomWords) internal override{
        uint256 indexOfWinner= randomWords[0] % s_players.length;
        address payable recentWinner=s_players[indexOfWinner];
        s_recentWinner=recentWinner;
        s_raffleState=RaffleState.OPEN;
        s_players=new address payable[](0); // reset array
        s_lastTimeStamp=0; //need to reset timestamp, but this is wrong way i think
        (bool success,)=recentWinner.call{value:address(this).balance}("")
        if(!success){
            revert Raffle__TransferFailed();
        }
        emit WinnerPicked(recentWinner);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_enteranceFee;
    }
    function getPlayer(uint256 index)public view returns(address){
        return s_players[index]
    }

    function getRecentWinner()public view returns(address){
        return s_recentWinner;
    }

    function getRaffleState()public view returns(RaffleState){
        return s_raffleState;
    }

    // pure function bcz not reading from storage bcz are constants 
    function getNumWords()public pure returns(uint256){
        return NUM_WORDS;
    }

    function getRequestConfirmation()public pure returns(uint256){
        return REQUEST_CONFIRMATION;
    }

    function getNumberOfPlayers()public view returns(uint256){
        return s_players.length;
    }

    function getLatestTimeStamp()public view return(uint256){
        return s_lastTimeStamp;
    }

    function getInterval()public view returns(uint256){
        return i_interval;
    }
}
