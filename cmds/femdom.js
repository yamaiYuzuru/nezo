const superagent = require("snekfetch");
const Discord = require('discord.js');

exports.run = async (client, msg, args, level) => {
    if (!msg.channel.nsfw) return msg.channel.send('You can use this command in an NSFW Channel!')
    const owo = await client.nekos.nsfw.femdom();
    await msg.channel.send(new Discord.MessageEmbed().setTitle("Henati - Femdom").setImage(owo.url).setURL(owo.url));
	
};
exports.info = {
    cooldown:2.5
};
