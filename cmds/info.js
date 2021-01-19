exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const ms = require('ms');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const hum = require('humanize-number');
    if (guilds[msg.guild.id].english === true) {
        const embed = new dc.MessageEmbed();
        embed.setTitle('Stats of Nezo');
        embed.addField('Version', "0.0.7", true);
        embed.addField('Library', "discord.js@"+dc.version, true);
        embed.addField('Operation System', "Windows 10", true);
        embed.addField("Developer", "!yuzuru.#4112", true);
        embed.addField("Guilds", hum(client.guilds.cache.size), true);
        embed.addField('Users', hum(client.users.cache.size), true);
        embed.addField("Commands Size", client.cmds, true);
        embed.addField('Statistics for developers', `Uptime: ${require('ms')(client.uptime)}`, true);
        await msg.channel.send(embed)
    } else {
        const embed = new dc.MessageEmbed();
        embed.setTitle('Stats von Nezo');
        embed.addField('Version', "0.0.7", true);
        embed.addField('Library', "discord.js@"+dc.version, true);
        embed.addField('Operation System', "Windows 10", true);
        embed.addField("Developer", "!yuzuru.#4112", true);
        embed.addField("Server", hum(client.guilds.cache.size), true);
        embed.addField('User', hum(client.users.cache.size), true);
        embed.addField("Befehle", client.cmds, true);
        embed.addField('Statistiken für Developer', `Uptime: ${ms(client.uptime)}`, true);
        await msg.channel.send(embed)
    }
};

exports.info = {
    aliases: ['botinfo', 'bot-info'],
    cooldown: 3
};