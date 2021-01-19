exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        if (!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("You need the manage message permisson").setColor("RED"));
        //if (msg.pinned === true) return true;
        if (isNaN(args[0])) return msg.channel.send(new dc.MessageEmbed().setTitle("Uhm..").setDescription('Please enter a vaild number.').setColor('RED'));
        if (args[0] > 100) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm').setDescription("The number can't bigger than 100.").setColor("RED"));
        msg.channel.bulkDelete(args[0]).then(r => setTimeout(() => {
            msg.channel.send(`${r.size} messages cleared.`)
        }, 3e0));
    } else {
        if (!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("Du musst nachrichten verwalten können zum clearen").setColor("RED"));
        /*const fetched = msg.channel.messages.fetchPinned();
        if (fetched) return true;*/
        if (isNaN(args[0])) return msg.channel.send(new dc.MessageEmbed().setTitle("Uhm..").setDescription('Bitte gebe eine gültige Zahl ein.').setColor('RED'));
        if (args[0] > 100) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm').setDescription("Die Zahl kann nicht größer als 100 sein").setColor("RED"));
        msg.channel.bulkDelete(args[0]).then(r => setTimeout(() => {
            msg.channel.send(`${r.size} nachrichten gelöscht.`)
        }, 3e0));
    }
};

exports.info = {
    name: 'clear',
    aliases: ["purge"],
    cooldown: 10
};