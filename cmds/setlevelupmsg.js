exports.run = async (client, msg, args) => {
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const dc = require('discord.js');

    if (guilds[msg.guild.id].english === true) {
        if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm...').setDescription('You need manage guild to enable or disable the level up message'));
        if (!args[0]) {
            await msg.channel.send(new dc.MessageEmbed().setDescription(`Usage ${guilds[msg.guild.id].prefix}setlevelupmsg {true/false}`));
        }

        if (args.join(' ') === "true") {
            await msg.channel.send(new dc.MessageEmbed().setDescription('LevelUp Messages enabled'))
            guilds[msg.guild.id] = {
                english: guilds[msg.guild.id].english,
                prefix: guilds[msg.guild.id].prefix,
                levelupMessage: true
            };
            await fs.writeFile('./data/guilds.json', JSON.stringify(guilds), err => {});
        } else if (args.join(' ') === "false") {
            await msg.channel.send(new dc.MessageEmbed().setDescription('LevelUp Messages disabled'));
            guilds[msg.guild.id] = {
                english: guilds[msg.guild.id].english,
                prefix: guilds[msg.guild.id].prefix,
                levelupMessage: false
            };
            await fs.writeFile('./data/guilds.json', JSON.stringify(guilds), err => {});
        }
    } else {
        if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm...').setDescription("Du muss den server verwalten können um die level up nachricht zu aktivieren oder deaktivieren."));
        if (!args[0]) {
            await msg.channel.send(new dc.MessageEmbed().setDescription(`Usage ${guilds[msg.guild.id].prefix}setlevelupmsg {true/false}`));
        }

        if (args.join(' ') === "true") {
            await msg.channel.send(new dc.MessageEmbed().setDescription('LevelUp Messages aktiviert'));
            guilds[msg.guild.id] = {
                english: guilds[msg.guild.id].english,
                prefix: guilds[msg.guild.id].prefix,
                levelupMessage: true
            };
            await fs.writeFile('./data/guilds.json', JSON.stringify(guilds), err => {});
        } else if (args.join(' ') === "false") {
            await msg.channel.send(new dc.MessageEmbed().setDescription('LevelUp Messages deaktiviert'));
            guilds[msg.guild.id] = {
                english: guilds[msg.guild.id].english,
                prefix: guilds[msg.guild.id].prefix,
                levelupMessage: false
            };
            await fs.writeFile('./data/guilds.json', JSON.stringify(guilds), err => {});
        }
    }
};
exports.info = {
    cooldown:2.5
}