const Messenger = require('../services/messenger.js');

const run = (bot, message, args) => {
  console.log('message', message.content);
  console.log('args', args);
  
  const messenger = new Messenger(bot, message);
  messenger.sendText('`!lah [rude|hehe|sadface|busy]`');
};

module.exports.run = run;