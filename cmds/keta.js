const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/keta')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Hentai - Keta")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
};

exports.info = {
    cooldown:2.5
};