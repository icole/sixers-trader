pragma solidity ^0.4.11;

contract SixersTrader {
    string public standard = 'PhillySixers';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply = 17;
    // Owner of this contract
    address public owner;
    // Balances for each account
    mapping(uint256 => address) public playerToAddress;
    mapping(address => uint256[]) public addressToPlayers;
    mapping(address => uint256) public balanceOf;

    // Events
    event claimPlayerEvent (
      uint indexed _id,
      address indexed _seller
    );

    // Functions with this modifier can only be executed by the owner
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    // Constructor
    function SixersTrader() {
      owner = msg.sender;
      name = "PHILLYSIXERS";
      symbol = "SIXERS";
      decimals = 0;
    }

    function claimPlayer(uint256 playerId) {
      playerToAddress[playerId] = msg.sender;
      addressToPlayers[msg.sender].push(playerId);
      balanceOf[msg.sender]++;
      claimPlayerEvent(playerId, msg.sender);
    }

    function getOwnedPlayers(address playerOwner) constant returns (uint256[]) {
      return addressToPlayers[playerOwner];
    }

}
