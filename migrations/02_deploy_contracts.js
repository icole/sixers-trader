var SixersTrader = artifacts.require("./SixersTrader.sol");

module.exports = function(deployer) {
  deployer.deploy(SixersTrader);
};
