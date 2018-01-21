// Contract to be tested
var SixersTrader = artifacts.require("./SixersJoelEmbiid.sol");

// Test suite
contract('SixersTrader', function(accounts) {
  var sixersTraderInstance;
  var account = accounts[1];

  // Test case: check initial supply
  it("should set the initial supply to 20", function() {
    return SixersTrader.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(data) {
      assert.equal(data.valueOf(), '20', "total supply should be 20");
    });
  });

  // Test case: assetCount after claiming a player
  it("should increase the count after claiming a player", function() {
    return SixersTrader.deployed().then(function(instance) {
      sixersTraderInstance = instance;
      sixersTraderInstance.assetsCount(account).then(function(data) {
        assert.equal(data.valueOf(), '0', "initial balance should be 0");
      });
      return instance.claimPlayer(0, {
        from: account
      });
    }).then(function() {
      return sixersTraderInstance.assetsCount(account)
    }).then(function(data) {
      assert.equal(data.valueOf(), '1', "balance should be 1")
    });
  });

  // Test case: adding a claimed playerId
  it("should add the player to assets storage for the player owner", function() {
    return SixersTrader.deployed().then(function(instance) {
      sixersTraderInstance = instance;
      return sixersTraderInstance.claimPlayer(1, {
        from: account
      });
    }).then(function() {
      return sixersTraderInstance.idToAddress(1);
    }).then(function(data) {
      assert.equal(data.valueOf(), account, "player 1 needs to be assigned to account");
    });
  });

  // Test case: claimed player count
  it("should return the number of claimed ids", function() {
    return SixersTrader.deployed().then(function(instance) {
      return sixersTraderInstance.claimedCount();
    }).then(function(data) {
      assert.equal(data.valueOf(), 2, "claimed acount should be 2");
    });
  });


});
