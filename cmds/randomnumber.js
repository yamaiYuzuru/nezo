exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        if (!args[0] && isNaN(args[0])) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription('Please enter a valid number.'));
        if (args[0] > 200) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("The number can't bigger then 200."));
        await msg.channel.send(new dc.MessageEmbed().setDescription(Math.floor(Math.random() * args[0])));
    } else {
        if (!args[0] && isNaN(args[0])) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription('Bitte gebe eine richtige zahl an.'));
        if (args[0] > 200) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("Die zahl kann nicht größer als 200 sein."));
        await msg.channel.send(new dc.MessageEmbed().setDescription(Math.floor(Math.random() * args[0])));
    }
};

exports.info = {
    name: 'randomnumber',
    aliases: [],
    cooldown:2.5
};