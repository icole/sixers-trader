// Contract to be tested
var SixersTrader = artifacts.require("./SixersTrader.sol");

// Test suite
contract('SixersTrader', function(accounts) {
  var sixersTraderInstance;
  var account = accounts[1];

  // Test case: check initial supply
  it("should set the initial supply to 17", function() {
    return SixersTrader.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(data) {
      assert.equal(data.valueOf(), '17', "total supply should be 17");
    });
  });

  // Test case: balanceOf after claiming a player
  it("should increase the balance after claiming a player", function() {
    return SixersTrader.deployed().then(function(instance) {
      sixersTraderInstance = instance;
      sixersTraderInstance.balanceOf(account).then(function(data) {
        assert.equal(data.valueOf(), '0', "initial balance should be 0");
      });
      return instance.claimPlayer(0, {
        from: account
      });
    }).then(function() {
      return sixersTraderInstance.balanceOf(account)
    }).then(function(data) {
      assert.equal(data.valueOf(), '1', "balance should be 1")
    });
  });

  // Test case: adding a claimed playerId
  it("should add the player to playerToAddress after claiming", function() {
    return SixersTrader.deployed().then(function(instance) {
      sixersTraderInstance = instance;
      return sixersTraderInstance.claimPlayer(0, {
        from: account
      });
    }).then(function() {
      return sixersTraderInstance.playerToAddress(0);
    }).then(function(data) {
      assert.equal(data.valueOf(), account, "player 0 needs to be assigned to account");
    });
  });


});
