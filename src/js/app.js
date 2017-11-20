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
    /*
     * Replace me...
     */

    return App.initContract();
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

  markClaimed: function(claimers, account) {
    /*
     * Replace me...
     */
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
