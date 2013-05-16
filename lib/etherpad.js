var request = require('request'),
  _ = require('underscore');

exports.load = function etherpad_load(name) {
  var url = 'https://firefox-ux.etherpad.mozilla.org/ep/pad/export/' + name + '/latest?format=txt';
  var whimsies = ['Hold on a second there, pilgrim!'];
  var updateWhimsies = function updateWhimsies() {
    console.log("Updating whimsies…");
    request.get( url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var lines = body.split("\n");
        var incoming = _.map(lines, function(line) {
          if (! /^\#/.test(line) || line.trim().length > 0) {
            return line;
          }
        });
        if (incoming.length) {
          whimsies = incoming;
        }
      }
    });
    setTimeout(updateWhimsies, 4*60*60*1000);
  };
  updateWhimsies();
  return function getWhimsy() {
    var rand = Math.round(Math.random() * whimsies.length);
    return whimsies[rand];
  };
}
