exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.trumpTweet(args.join(' '))));
};

exports.info = {
    name: 'trumptweet',
    aliases: ['tt'],
    cooldown:2.5
};