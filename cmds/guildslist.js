module.exports = {
    run: async (client, msg, args) => {
        const {MessageEmbed} = require('discord.js');
        const embed = new MessageEmbed();
        client.guilds.cache.map(g => {
            embed.addField("Name:", g.name);
            embed.addField("ID:",g.id);
            embed.addField("MemberCount", g.memberCount)
        });
        await msg.channel.send(embed)
    }
};