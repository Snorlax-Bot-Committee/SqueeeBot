const Discord = require('discord.js');
const request = require('request-promise');
const Messenger = require.main.require('./services/messenger.js');

const baseUrl = 'https://mydictionaryapi.appspot.com/';
const dictThumb = 'https://gph.to/2VeFbmh';

const run = (bot, message, args) => {
  const messenger = new Messenger(bot, message);

  if (args.length == 1) {
    define(args[0]).then(embed => messenger.sendText({ embed }));
  } else if (args.length == 0) {
    messenger.sendText('Yes you are');
  } else {
    messenger.sendText('Too many words don\'t understand lahhhhh');
  }
};

const define = (term) => {
  return request(`${baseUrl}?lang=en&define=${term}`).then(data => {
    const word = JSON.parse(data);

    let embed = new Discord.RichEmbed()
      .setTitle(word.word)
      .setThumbnail(dictThumb)
      .setColor('#ffc107');

    if (word.phonetic) {
      embed.setDescription('`' + word.phonetic + '`');
    }

    let entries = Object.entries(word.meaning);
    for (const [pos, entry] of entries) {
      if (entry.length > 1) {
        const def = entry.reduce((acc, entry) => `+ ${entry.definition}\n${acc}`, '');
        embed.addField(pos, def);
      } else {
        embed.addField(pos, entry[0]['definition']);
      }
    }

    return embed;
  });

};

module.exports.run = run;