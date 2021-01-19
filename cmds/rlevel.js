exports.run = (client, msg, args) => {
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const dc = require('discord.js');
    const guild = guilds[msg.guild.id];

    if (guilds[msg.guild.id].english === true) {
        if (!args[0]) return msg.channel.send(new dc.MessageEmbed().setDescription(`Usage: ${guild.prefix}rlevel add {level} {role} or ${guild.prefix}rlevel remove {role}`));
        if (!msg.member.permissions.has('ADMINISTRATOR')) {
            msg.reply("You must be administrator to use this command")
        } else {
            let condition = args[0];
            if (condition === "add") {
                let alvl = args[1]; //get's the level
                let pRole = args.splice(2); //only get's the name of the role
                let nRole = msg.guild.roles.cache.find(role => role.name === pRole.join(" ")) || msg.mentions.roles.first(); //checks for the role

                if (!nRole) {
                    msg.reply(`the role ${pRole.join(" ")} not found`);
                } else {
                    client.sql.get(`SELECT * FROM levelRoles WHERE guildID = ${msg.guild.id} AND roleID = ${nRole.id}`).then(oRole => {
                        if (!oRole) {
                            client.sql.run(`INSERT INTO levelRoles (guildID, roleID, roleName, level) VALUES (?,?,?,?)`, [msg.guild.id, nRole.id, pRole.join(" "), alvl]);
                            msg.reply(`${pRole} was added to level ${alvl}.`)
                        } else {
                            client.sql.run(`UPDATE levelRoles SET guildID = ${msg.guild.id} AND roleID = ${nRole.id} AND roleName = ${pRole.join(" ")} AND level = ${alvl} WHERE guildID='${msg.guild.id}' AND level='${alvl}'`);
                            msg.reply(`${pRole} was updated to ${alvl}.`)
                        }
                    }).catch(() => {
                        msg.reply("need to create table");
                    })
                }
            } else if (condition === "remove") {
                let pRole = args.splice(1);
                let nRole = msg.guild.roles.cache.find(role => role.name === pRole.join(" ")) || msg.mentions.roles.first(); //checks for the role
                if (!nRole) {
                    msg.reply(`It don't give a role with name ${pRole.join(" ")}.`);
                } else {
                    client.sql.run(`DELETE FROM levelRoles WHERE guildID = ${msg.guild.id} AND roleID = ${nRole.id}`);
                    msg.reply(`${pRole.join(" ")} was removed from rlevel.`);
                }
            }
        }
    } else {
        if (!msg.member.permissions.has('ADMINISTRATOR')) {
            msg.reply("Du brauchst admin perms")
        } else {
            let condition = args[0];
            if (condition === "add") {
                let alvl = args[1]; //get's the level
                let pRole = args.splice(2); //only get's the name of the role
                let nRole = msg.guild.roles.cache.find(role => role.name === pRole.join(" ")); //checks for the role

                if (!nRole) {
                    msg.reply(`die rolle ${pRole.join(" ")} nicht gefunden`);
                } else {
                    client.sql.get(`SELECT * FROM levelRoles WHERE guildID = ${msg.guild.id} AND roleID = ${nRole.id}`).then(oRole => {
                        if (!oRole) {
                            client.sql.run(`INSERT INTO levelRoles (guildID, roleID, roleName, level) VALUES (?,?,?,?)`, [msg.guild.id, nRole.id, pRole.join(" "), alvl]);
                            msg.reply(`${pRole} wurde zum level ${alvl} hinzugefügt.`)
                        } else {
                            client.sql.run(`UPDATE levelRoles SET guildID = ${msg.guild.id} AND roleID = ${nRole.id} AND roleName = ${pRole.join(" ")} AND level = ${alvl} WHERE guildID='${msg.guild.id}' AND level='${alvl}'`);
                            msg.reply(`${pRole} wurde aktualliesert aufs level ${alvl}.`)
                        }
                    }).catch(() => {
                        msg.reply("need to create table");
                    })
                }
            } else if (condition === "remove") {
                let pRole = args.splice(1);
                let nRole = msg.guild.roles.cache.find(role => role.name === pRole.join(" ")); //checks for the role
                if (!nRole) {
                    msg.reply(`Es gibt keine rolle names ${pRole.join(" ")}.`);
                } else {
                    client.sql.run(`DELETE FROM levelRoles WHERE guildID = ${msg.guild.id} AND roleID = ${nRole.id}`);
                    msg.reply(`${pRole.join(" ")} wurde von rlevel enfernt.`);
                }
            } else {
                msg.reply("Benutze rlevel add oder rlevel remove um rollen zu adden oder zu enfernen");
            }
        }
    }
};

exports.info = {
    aliases: ['rlvl'],
    cooldown:2.5
};