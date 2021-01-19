const {embed} = require('../package/main');
exports.run = async (client, msg, args) => {
    await msg.channel.send(embed.setImage(await client.nekobot.imageGen.changeMyMind(args.join(' '))));
};

exports.info = {
    aliases: [],
    cooldown: 2
};