const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, msg, args, level) => {
    let message = msg;
    if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
    const owo = client.nekos.nsfw.futanari();
    await msg.channel.send(new Discord.MessageEmbed().setTitle("Hentai - Futanari").setImage((await owo).url).setURL((await owo).url));
};

exports.info = {
    cooldown:2.5
};