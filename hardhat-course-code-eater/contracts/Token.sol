//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 <0.9.0;

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;
    mapping(address => uint) balances;

    constructor() {
        // mean who deploy this contract will have own all token in his wallet & and also he is owner
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    // send token
    function transfer(address to, uint amount) external {
        // check wether who call this function have enough blnc/tokens in his wallet or not
        require(balances[msg.sender] >= amount, "Not enough tokens in wallet");
        balances[msg.sender] = balances[msg.sender] - amount;
        balances[to] = balances[to] + amount; // balances[to]+=amount
    }

    // check blnc
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
