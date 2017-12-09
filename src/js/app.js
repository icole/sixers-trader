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
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-claim', App.handleClaim);
  },

  claimPlayer: function(playerId) {
    console.log(playerId);
  },

  handleClaim: function(event) {
    event.preventDefault();

    var playerId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
