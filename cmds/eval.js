exports.run = async (client, msg, args) => {
    const discord = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const settings = require('../config.json');
    if (guilds[msg.guild.id].english === true) {
        if (!settings.admins.some(c => c === msg.author.id)) return msg.channel.send(new discord.MessageEmbed().setTitle('Uhm..').setDescription('You must be developer of this bot to use this command.'));

        try {
            await msg.channel.send(eval(args.join(' ')));
        } catch (e) {
            await msg.channel.send(e.toString());
        }
    } else {
        if (!settings.admins.some(c => c === msg.author.id)) return msg.channel.send(new discord.MessageEmbed().setTitle('Uhm..').setDescription('Du musst Entwickler dieses Bots sein, um diese Befehle verwenden zu können'));

        try {
            await msg.channel.send(eval(args.join(' ')));
        } catch (e) {
            await msg.channel.send(e.toString());
        }
    }
};

exports.info = {
    name: 'eval'
};