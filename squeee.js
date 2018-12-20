const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

let generalChannel;

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag);
  generalChannel = client.channels.get(auth.generalChannelId);
});

client.on('message', (msg) => {
  if (msg.author == client.user) {
    return;
  }

  if (msg.content.startsWith('!')) {
    processCommand(msg);
  }
});

function processCommand(msg) {
  let processedMsg = msg.content.trim().substr(1).split(' ');
  let cmd = processedMsg[0];
  let args = processedMsg.slice(1);

  console.log('cmd', cmd);
  console.log('args', args);

  if (cmd === 'lah') {
    sendImage(args);
  } else if (cmd == 'help') {
    sendText('`!lah [rude|hehe|sadface|busy]`');
  } else {
    sendText('??????????');
  }
}

function sendImage(args) {
  if (args && args[0]) {
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
    generalChannel.send(new Discord.Attachment(url));
  }
}

function sendText(text) {
  generalChannel.send(text);
}

client.login(auth.token);