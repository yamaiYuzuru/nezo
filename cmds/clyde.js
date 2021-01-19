exports.run = async (client, msg, args) => {
    const discord = require('discord.js');
    await msg.channel.send(new discord.MessageEmbed().setImage(await client.nekobot.imageGen.clyde(args.join(' '))))
};

exports.info = {
    name: 'clyde',
    aliases: [],
    cooldown: 3
};