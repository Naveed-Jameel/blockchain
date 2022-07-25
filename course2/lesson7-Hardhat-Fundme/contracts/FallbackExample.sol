//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract FallbackExample {
    uint public result;
    bytes public data;

    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        data = msg.data;
    }

    // fallback(bytes calldata) external payable returns(bytes memory){
    //     return msg.data;
    // }
}
