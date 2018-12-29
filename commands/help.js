const Messenger = require.main.require('./services/messenger.js');

const run = (bot, message, args) => {
  console.log('message', message.content);
  console.log('args', args);
  
  const messenger = new Messenger(bot, message);
  const menu = '```!lah rude|hehe|sadface|busy\n!bored (keyword)\n!esl term```';
  messenger.sendText(menu);
};

module.exports.run = run;