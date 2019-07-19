const Discord = require("discord.js");
const request = require("request-promise");
const Wiki = require("wikijs").default;
const Messenger = require.main.require("./services/messenger.js");

const wikipediaRandomUrl = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
const boredThumb = "https://gph.to/2BMtrhV";

const run = (bot, message, args) => {
{  }const messenger = new Messenger(bot, message);

{  }if (args.length == 0) {
{  }{  }random().then(embed => messenger.sendText({ embed }));
{  }} else {
{  }{  }let keywords = args.join(" ");
{  }{  }search(keywords).then(embed => messenger.sendText({ embed }));
{  }}
};

const random = () => {
{  }return request(wikipediaRandomUrl)
{  }{  }.then(data => {
{  }{  }{  }const page = JSON.parse(data);
{  }{  }{  }return new Discord.RichEmbed()
{  }{  }{  }{  }.setTitle(page.title)
{  }{  }{  }{  }.setThumbnail(boredThumb)
{  }{  }{  }{  }.setColor("#dc3545")
{  }{  }{  }{  }.setDescription(page.description)
{  }{  }{  }{  }.setURL(page.content_urls.desktop.page)
{  }{  }{  }{  }.addField("Summary", page.extract)
{  }{  }{  }{  }.setImage(page.originalimage.source);
{  }{  }})
{  }{  }.catch(err => {
{  }{  }{  }console.error(err);
{  }{  }});
};

const search = (keywords) => {
{  }let info = {};

{  }return Wiki().search(keywords, 1)
{  }{  }.then(data => {
{  }{  }{  }return Wiki().page(data.results[0]);
{  }{  }})
{  }{  }.then(page => {
{  }{  }{  }info.title = page.raw.title;
{  }{  }{  }info.url = page.raw.fullurl;
{  }{  }{  }const summaryPromise = page.summary();
{  }{  }{  }const imagePromise = page.mainImage();
{  }{  }{  }return Promise.all([summaryPromise, imagePromise]);
{  }{  }})
{  }{  }.then(data => {
{  }{  }{  }info.summary = data[0].split("\n").shift();
{  }{  }{  }info.img = data[1];
{  }{  }{  }return new Discord.RichEmbed()
{  }{  }{  }{  }.setThumbnail(boredThumb)
{  }{  }{  }{  }.setColor("#28a745")
{  }{  }{  }{  }.setTitle(info.title)
{  }{  }{  }{  }.setDescription(info.summary)
{  }{  }{  }{  }.setURL(info.url)
{  }{  }{  }{  }.setImage(info.img);
{  }{  }})
{  }{  }.catch(err => {
{  }{  }{  }console.error(err);
{  }{  }});
};

module.exports.run = run;
