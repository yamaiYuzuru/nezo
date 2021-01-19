exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    await msg.channel.send(new dc.MessageEmbed().setImage(await client.nekobot.imageGen.kannagen(args.join(` `))));
};

exports.info = {
    name: 'kannagen',
    aliases: [],
    cooldown: 5
}