const superagent = require("snekfetch");
const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (client, msg, args, level) => {
    const message = msg;
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!');
    const owo = client.nekos.nsfw.blowJob();
    await msg.channel.send(new Discord.MessageEmbed().setImage((await owo).url).setTitle('Hentai - Blowjob'));
    /*superagent.get('https://nekos.life/api/v2/img/blowjob')
        .end((err, response) => {
      const lewdembed = new Discord.MessageEmbed()
      .setTitle("Hentai")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })*/
	
};

exports.info = {
    cooldown: 2.5
};