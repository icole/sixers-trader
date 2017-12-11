App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load players.
    $.getJSON('../players.json', function(data) {
      var playersRow = $('#playersRow');
      var playerTemplate = $('#playerTemplate');

      for (i = 0; i < data.length; i ++) {
        playerTemplate.find('.panel-title').text(data[i].name);
        playerTemplate.find('img').attr('src', data[i].picture);
        playerTemplate.find('.player-position').text(data[i].position);
        playerTemplate.find('.player-number').text(data[i].number);
        playerTemplate.find('.btn-claim').attr('data-id', data[i].id);

        playersRow.append(playerTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    App.displayAccountInfo();
    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#account").text(account);
      }
    });
  },

  initContract: function() {
    $.getJSON('SixersTrader.json', function(sixersTraderArtifact) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.SixersTrader = TruffleContract(sixersTraderArtifact);

      // Set the provider for our contract.
      App.contracts.SixersTrader.setProvider(App.web3Provider);

      // Listen for contract events
      App.listenToEvents();

      // Bind Javascript Events
      App.bindEvents();
    });
  },

  listenToEvents: function () {
    App.contracts.SixersTrader.deployed().then(function(instance) {
      instance.claimPlayerEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        if (!error) {

        } else {
          console.error(error);
        }
        //App.reloadPlayers();
      });
    });
  },

  bindEvents: function() {
    $(document).on('click', '.btn-claim', App.claimPlayer);
  },

  claimPlayer: function(event) {
    event.preventDefault();

    var playerId = parseInt($(event.target).data('id'));
    console.log("Claiming player: " + playerId);

    App.contracts.SixersTrader.deployed().then(function(instance) {
      return instance.claimPlayer(playerId, {
        from: App.account,
        gas: 500000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
