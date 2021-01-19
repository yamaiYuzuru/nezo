exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    if (msg.mentions.users.first()) {
        await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.tweet(msg.mentions.users.first().username, args.join(' '))))
    } else {
        await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.tweet(msg.author.username, args.join(' '))));
    }
};

exports.info = {
    aliases: [],
    cooldown:2.5
};