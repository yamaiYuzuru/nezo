const superagent = require("snekfetch");
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    if (!msg.channel.nsfw) return msg.channel.send('You can use this command in an NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/anal')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Hentai - Anal")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setURL(response.body.url);
    msg.channel.send(lewdembed);
    })
	
};
exports.info = {
    cooldown: 2.5
};