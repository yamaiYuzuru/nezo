exports.run = async (client, msg, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    client.sql.all(`SELECT roleName, level FROM levelRoles WHERE guildID = '${msg.guild.id}' ORDER BY level ASC`).then(rRow =>{
        if(!rRow[0]){
            client.rlOut = "None";
        }else{
            const rlName = rRow.map(z=>z.roleName);
            const rlLevel = rRow.map(x => x.level);
            const rlOutp = rlLevel.map(function (a, b) {
                return ['Levels: ' + `**${a}**` + '  Name: ' + `**${rlName[b]}**`];
            });
            client.rlOut = rlOutp.join("\n");
        }
        if (guilds[msg.guild.id].english === true) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**Roles for the ${msg.guild.name} server**`)
                .setColor(0x00AE86)
                .setThumbnail(msg.guild.iconURL)
                .addField("Roles", `${client.rlOut}`, false);
            msg.channel.send({embed: embed});
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**Rollen für den  ${msg.guild.name} server**`)
                .setColor(0x00AE86)
                .setThumbnail(msg.guild.iconURL)
                .addField("Rollen", `${client.rlOut}`, false);
            msg.channel.send({embed: embed});
        }
    });
};

exports.info = {
    cooldown:2.5
};