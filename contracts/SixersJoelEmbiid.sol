pragma solidity ^0.4.18;

import './erc821/StandardAssetRegistry.sol';

contract SixersJoelEmbiid is StandardAssetRegistry {
    // Owner of this contract
    address public _owner;

    // Events
    event claimPlayerEvent (
      uint indexed _id,
      address indexed _seller
    );

    // Constructor
    function SixersJoelEmbiid() public {
      _owner = msg.sender;
      _name = "SIXERSEMBIID";
      _symbol = "SIXERS";
      _description = "Philadelphia 76ers Joel Embiid";
      _count = 20;

    }

    function claimPlayer(uint256 id) payable public {
      require(msg.value >= 0.05 ether);
      _generate(id, msg.sender, '');
    }

    function idToAddress(uint256 id) public view returns (address) {
      return _holderOf[id];
    }

    function getOwnedPlayers(address playerOwner) public view returns (uint256[]) {
      return _assetsOf[playerOwner];
    }

    function claimedCount() public view returns (uint256) {
      uint256 _claimedCount = 0;
      for (uint i = 0; i < _count; i++) {
        if (exists(i)) {
          _claimedCount++;
        }
      }
      return _claimedCount;
    }

}
