pragma solidity ^0.4.18;

import './erc821/StandardAssetRegistry.sol';

contract SixersTrader is StandardAssetRegistry {
    // Owner of this contract
    address public _owner;

    // Events
    event claimPlayerEvent (
      uint indexed _id,
      address indexed _seller
    );

    // Constructor
    function SixersTrader() public {
      _owner = msg.sender;
      _name = "PHILLYSIXERS";
      _symbol = "SIXERS";
      _description = "Philadelphia 76er's Trader";
      _count = 17;

    }

    function claimPlayer(uint256 playerId) public {
      _generate(playerId, msg.sender, '');
    }

    function playerToAddress(uint256 playerId) public view returns (address) {
      return _holderOf[playerId];
    }

    function getOwnedPlayers(address playerOwner) public view returns (uint256[]) {
      return _assetsOf[playerOwner];
    }

}
