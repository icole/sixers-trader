pragma solidity ^0.4.11;

contract SixerTrader {
    // State variables
    address seller;
    string playerId;

    // claim a player
    function claimPlayer(string _playerId) public {
        seller = msg.sender;
        playerId = _playerId;
    }
}
