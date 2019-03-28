const Discord = require("discord.js");
const request = require("request-promise");
const Messenger = require.main.require("./services/messenger.js");

const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
const dictThumb = "https://gph.to/2VeFbmh";

const run = (bot, message, args) => {
  const messenger = new Messenger(bot, message);

  if (args.length == 1) {
    define(args[0]).then(embed => {
      if (embed) {
        messenger.sendText({ embed });
      } else {
        messenger.sendText("Tsk tsk tsk, making up words now are we?");
      }
    });
  } else if (args.length == 0) {
    messenger.sendText("Yes you are");
  } else {
    messenger.sendText("Too many words don\"t understand lahhhhh");
  }
};

const define = (term) => {
  return request(`${baseUrl}${term}`).then(data => {
    const word = JSON.parse(data);

    let embed = new Discord.RichEmbed()
      .setTitle(word.list[0].word)
      .setThumbnail(dictThumb)
      .setColor("#ffc107");

    if (word.phonetic) {
      embed.setDescription("`" + word.phonetic + "`");
    }
    let entries = word.list;
    //const def = entries.reduce((acc, entry) => `${acc}\n+ ${entry.definition.replace(/[\[\]]/g,"")}`, "");
    let def=""
    for (let entry of entries){
	  def+= `\n+ ${entry.definition.replace(/[\[\]]/g,"")}`
	  def=def.replace(/\n$/,"")
	  if (def.length+entry.definition.length>1024){
		    break
	  }

    }

    embed.addField("Definitions",def)
      return embed;
    }
    )

    .catch(err => {
      // most likely because word doesn"t exist and api doesn"t 
      // return an empty [] or {} for whatever reason
      console.error(err);
      return null;
    });

};

module.exports.run = run;
