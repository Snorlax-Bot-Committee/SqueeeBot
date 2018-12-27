const Discord = require('discord.js')
const config = require('./config.json');
const Commander = require('./services/commander.js');

const bot = new Discord.Client();
const commander = new Commander();

bot.on('ready', () => {
  console.log('Connected as ' + bot.user.tag);

  // register all commands in the commands dir
  commander.register();
});

bot.on('message', message => {
  // ignore messages from bots
  if (message.author.bot) return;

  // ignore messages from itself
  if (message.author == bot.user) return;

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandText = args.shift().toLowerCase();

  // grab command from commander list
  const cmd = commander.get(commandText);

  // cmd does not exist
  if (!cmd) return;

  // make sure run() is exported in [cmd].js
  cmd.run(bot, message, args);
});

bot.login(config.token);