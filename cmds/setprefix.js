exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guild = JSON.parse(fs.readFileSync(`./data/guilds.json`, 'utf8'));

    if (guild[msg.guild.id].english === true) {
        if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("You don't have permissions to use this command"));
        if (!args[0]) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription('Please give me an prefix\n Example: ! or ?').setColor('RED'));

        guild[msg.guild.id] = {
            english: true,
            prefix: args[0],
            levelupMessage: false
        };
        fs.writeFile("./data/guilds.json", JSON.stringify(guild), (err) => {
            if (err) console.log(err);
        });

        await msg.channel.send(new dc.MessageEmbed().setTitle('Hurray!').setDescription(`Prefix was set to ${args[0]}`));
    } else {
        if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription("Du hast keine rechte um den command zu benutzen"));
        if (!args[0]) return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm..').setDescription('Gib mir einen prefix\n Z.b.: ! oder ?').setColor('RED'));

        guild[msg.guild.id] = {
            english: false,
            prefix: args[0],
            levelupMessage: false
        };
        fs.writeFile("./data/guilds.json", JSON.stringify(guild), (err) => {
            if (err) console.log(err);
        });

        await msg.channel.send(new dc.MessageEmbed().setTitle('Hurra!').setDescription(`Der prefix ist nun ${args[0]}`));
    }
};
exports.info = {
    cooldown:2.5
}