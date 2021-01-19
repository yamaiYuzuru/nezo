exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const member = msg.mentions.users.first();
    if (member) {
        await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.lolice(member.avatarURL({format: "png"}))));
    } else {
        await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.lolice(msg.author.avatarURL({format: "png"}))));
    }
};

exports.info = {
    name: 'lolice',
    aliases: [],
    cooldown:2.5
};