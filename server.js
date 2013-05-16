var irc = require('irc'),
  fs = require('fs'),
  _ = require('underscore');

var raw = fs.readFileSync('./whimsy.txt');
var txt = raw.toString();
var lines = txt.split("\n");
var whimsies = _.map(lines, function(line) {
  if (! /^\#/.test(line) || line.trim().length > 0) {
    return line;
  }
});

function getWhimsy() {
  var rand = Math.round(Math.random() * whimsies.length);
  return whimsies[rand];
};

if (!module.parent) {
  var bot = new irc.Client('irc.mozilla.org', 'whimsy', {
    channels: ['#whimsybot'],
    secure: true,
    port: 6697
  });

  bot.addListener('message', function(from, to, message) {
    if (/whimsybot/.test) {
      bot.say(to, getWhimsy());
    }
  });
}
