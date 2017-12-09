pragma solidity ^0.4.11;

contract SixersTrader {
    uint256 _totalSupply = 17;

    // Owner of this contract
    address public owner;

    // Balances for each account
    mapping(uint256 => address) playerToAddress;

    // Functions with this modifier can only be executed by the owner
    modifier onlyOwner() {
        if (msg.sender != owner) {
            throw;
        }
        _;
    }

    // Constructor
    function SixersTrader() {
        owner = msg.sender;
    }

    function totalSupply() constant returns (uint256 totalSupply) {
        totalSupply = _totalSupply;
    }
}
