exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const embed = new dc.MessageEmbed();

    if (guilds[msg.guild.id].english === true) {
        await msg.channel.send(embed.setTitle('Vote for Nezo').setDescription('[discord-botlist.eu](https://discord-botlist.eu/bots/756256019318833183/vote)\n' +
            '[discordbots.com](https://discord.ly/nezo/upvote/)'));
    } else {
        await msg.channel.send(embed.setTitle('Vote für Nezo').setDescription('[discord-botlist.eu](https://discord-botlist.eu/bots/756256019318833183/vote)\n' +
            '[discordbots.com](https://discord.ly/nezo/upvote/)'));
    }
};

exports.info = {
    cooldown:2.5
};