const Messenger = require.main.require('./services/messenger.js');

const run = (bot, message, args) => {
  console.log('message', message.content);
  console.log('args', args);
  
  if (!args || !args[0]) return;

  const messenger = new Messenger(bot, message);
  let url;

  switch (args[0]) {
    case 'rude':
      url = 'https://i.gifer.com/1yIW.gif';
      break;
    case 'hehe':
      url = 'https://i.gifer.com/7klz.gif';
      break;
    case 'sadface':
      url = 'https://i.gifer.com/6ybb.gif';
      break;
    case 'busy':
      url = 'https://i.gifer.com/2GU.gif';
      break;
    default:
      return;
  }

  messenger.sendAttachment(url);
};

module.exports.run = run;