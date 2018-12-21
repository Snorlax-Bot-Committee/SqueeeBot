const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag);
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
    sendImage(args, msg.channel);
  } else if (cmd == 'help') {
    sendText('`!lah [rude|hehe|sadface|busy]`', msg.channel);
  } else {
    sendText('??????????', msg.channel);
  }
}

function sendImage(args, channel) {
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
    channel.send(new Discord.Attachment(url));
  }
}

function sendText(text, channel) {
  channel.send(text);
}

client.login(auth.token);