var etherpad = require('./lib/etherpad'),
  irc = require('irc');

var getWhimsy = etherpad.load('urlbar-sayings');

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
