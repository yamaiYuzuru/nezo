const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    const owo = client.nekos.nsfw.yuri();
    await message.channel.send(new Discord.MessageEmbed().setImage((await owo).url).setTitle("Hentai - Yuri").setURL((await owo).url));
	
}
exports.info = {
    cooldown:2.5
};