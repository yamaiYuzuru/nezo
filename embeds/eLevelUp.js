module.exports.levelUpEmbed = async function(client, msg, Discord, level) {
    const guilds = require('../data/guilds.json');
    if (guilds[msg.guild.id].levelupMessage === true) {
        if (guilds[msg.guild.id].english === true) {
            const embed = new Discord.MessageEmbed()
                .setTitle(msg.author.username)
                .setDescription(`**Good!**\nYou are now level **${level}**, <@!${msg.author.id}>`)
                .setColor(0x00AE86);
            if (msg.author.avatarURL({format: "gif"})) {
                embed.setThumbnail(msg.author.avatarURL({format: "gif"}));
            } else {
                embed.setThumbnail(msg.author.avatarURL({format: "png"}));
            }
            await msg.channel.send({embed: embed});
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(msg.author.username)
                .setDescription(`**Glückwunsch!**\nDu bist nun level **${level}**, <@!${msg.author.id}>`)
                .setColor(0x00AE86);
            if (msg.author.avatarURL({format: "gif"})) {
                embed.setThumbnail(msg.author.avatarURL({format: "gif"}));
            } else {
                embed.setThumbnail(msg.author.avatarURL({format: "png"}));
            }
            await msg.channel.send({embed: embed});
        }
    }
};