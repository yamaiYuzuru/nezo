module.exports = {
    run: async function(client, msg, args) {
        const {readFileSync, writeFileSync} = require('fs');
        const guilds = JSON.parse(readFileSync('./data/guilds.json', "utf8"));
        const {MessageEmbed} = require('discord.js');

        if (!guilds[msg.guild.id]) guilds[msg.guild.id] = {
            english: guilds[msg.guild.id].english,
            prefix: guilds[msg.guild.id].prefix,
            levelupMessage: guilds[msg.guild.id].levelupMessage,
            inviteBlocker: false
        };

        if (!msg.member.permissions.has('ADMINISTRATOR')) {
            if (guilds[msg.guild.id].english === true) {
                await msg.channel.send(new MessageEmbed().setTitle('Missing Permissions').setDescription('You need administrator to use this command'));
            } else {
                await msg.channel.send(new MessageEmbed().setDescription('Du brauchst administrator um den command zu benutzen'))
            }
        }

        if (!args[0]) return msg.channel.send(new MessageEmbed().setDescription('Usage: \n' +
            guilds[msg.guild.id].prefix + "setinviteblocker --enable \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --disable \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --add-channel <Channel> \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --add-user <User> \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --add-role <Role> \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --remove-channel <Channel> \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --remove-user <User> \n" +
            guilds[msg.guild.id].prefix + "setinviteblocker --remove-role <Role> \n"));

        if (guilds[msg.guild.id].english === true) {
            switch (args[0]) {
                case "--enable":
                    guilds[msg.guild.id] = {
                        english: guilds[msg.guild.id].english,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage,
                        inviteBlocker: true
                    };
                    writeFileSync('./data/guilds.json', JSON.stringify(guilds), "utf8");
                    await msg.channel.send('Inviteblocker Enabled');
                    break;
                case "--disable":
                    guilds[msg.guild.id] = {
                        english: guilds[msg.guild.id].english,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage,
                        inviteBlocker: false
                    };
                    writeFileSync('./data/guilds.json', JSON.stringify(guilds), "utf8");
                    await msg.channel.send('Inviteblocker disabled');
                    break;
                case "--add-channel":
                    if (!msg.mentions.channels.last()) return msg.channel.send(new MessageEmbed().setDescription("Please mention a channel."));
                    client.sql.run(`UPDATE inviteChannels SET guildID = '${msg.guild.id}', channelID = '${msg.mentions.channels.last().id}' AND channelName = '${msg.mentions.channels.last().name}'`).catch(e => {msg.channel.send(e); console.error(e)});
                    await msg.channel.send(new MessageEmbed().setDescription(`In the channel ${msg.mentions.channels.last()} can be send invites.`));
                    break;
                case "--add-user":
                    if (!msg.mentions.users.last()) return msg.channel.send(new MessageEmbed().setDescription("Please mention a member."));
                    client.sql.run(`UPDATE inviteUsers SET guildID = '${msg.guild.id}', userID = '${msg.mentions.users.last().id}' AND username = '${msg.mentions.users.last().name}'`).catch(e => {msg.channel.send(e); console.error(e)});
                    await msg.channel.send(new MessageEmbed().setDescription(`In the user ${msg.mentions.users.last()} can now send invites.`));
                    break;
                case "--add-role":
                    if (!msg.mentions.roles.last()) return msg.channel.send(new MessageEmbed().setDescription("Please mention a role."));
                    client.sql.run(`UPDATE inviteRoles SET guildID = '${msg.guild.id}', roleID = '${msg.mentions.roles.last().id}' AND roleName = '${msg.mentions.roles.last().name}'`).catch(e => {msg.channel.send(e); console.error(e)});
                    await msg.channel.send(new MessageEmbed().setDescription(`All users w ${msg.mentions.channels.last()} can be send invites.`));
                    break;
                case "--remove-channel":
                    client.sql.get(`SELECT * FROM inviteChannels WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE channelID, channelName FROM inviteChannels WHERE guildID = '${msg.guild.id}' AND channelID = '${msg.mentions.channels.last().id}'`);
                        msg.channel.send(new MessageEmbed().setDescription(`In the channel (${msg.mentions.channels.last()}) can't any more be send invites.`));
                    });
                    break;
                case "--remove-user":
                    client.sql.get(`SELECT * FROM inviteUsers WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE userID, username FROM inviteUsers WHERE guildID = '${msg.guild.id}' AND userID = '${msg.mentions.users.last().id}'`);
                        msg.channel.send(new MessageEmbed().setDescription(`The user (${msg.mentions.users.last()}) can't send any more invites `))
                    });
                    break;
                case "--remove-role":
                    client.sql.get(`SELECT * FROM inviteRoles WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE roleID, roleName FROM inviteRoles WHERE guildID = ${msg.guild.id} AND roleID = ${msg.mentions.channels.last().id}`);
                        msg.channel.send(new MessageEmbed().setDescription(`All with the role (${msg.mentions.roles.last()}) can't send any more invites `))
                    });
            }
        } else {
            switch (args[0]) {
                case "--enable":
                    guilds[msg.guild.id] = {
                        english: guilds[msg.guild.id].english,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage,
                        inviteBlocker: true
                    };
                    writeFileSync('./data/guilds.json', JSON.stringify(guilds), "utf8");
                    await msg.channel.send('Inviteblocker aktiviert!');
                    break;
                case "--disable":
                    guilds[msg.guild.id] = {
                        english: guilds[msg.guild.id].english,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage,
                        inviteBlocker: false
                    };
                    writeFileSync('./data/guilds.json', JSON.stringify(guilds), "utf8");
                    await msg.channel.send('Inviteblocker deaktiviert');
                    break;
                case "--add-channel":
                    if (!msg.mentions.channels.last()) return msg.channel.send(new MessageEmbed().setDescription("Bitte makiere einen channel."));
                    client.sql.run(`UPDATE inviteChannels SET guildID = ${msg.guild.id}, channelID = ${msg.mentions.channels.last().id} AND channelName = '${msg.mentions.channels.last().name}'`);
                    await msg.channel.send(new MessageEmbed().setDescription(`In dem channel ${msg.mentions.channels.last()} kann man nun invites senden.`));
                    break;
                case "--add-user":
                    if (!msg.mentions.users.last()) return msg.channel.send(new MessageEmbed().setDescription("Bitte makiere einen User."));
                    client.sql.run(`UPDATE inviteUsers SET guildID = ${msg.guild.id}, userID = ${msg.mentions.users.last().id} AND username = '${msg.mentions.users.last().name}'`);
                    await msg.channel.send(new MessageEmbed().setDescription(`Der user ${msg.mentions.users.last()} kann nun invites senden.`));
                    break;
                case "--add-role":
                    if (!msg.mentions.roles.last()) return msg.channel.send(new MessageEmbed().setDescription("Bitte makiere eine Rolle."));
                    client.sql.run(`UPDATE inviteRoles SET guildID = ${msg.guild.id}, roleID = ${msg.mentions.roles.last().id} AND roleName = '${msg.mentions.roles.last().name}'`);
                    await msg.channel.send(new MessageEmbed().setDescription(`Alle user mit der rolle ${msg.mentions.roles.last()} können nun invites senden.`));
                    break;
                case "--remove-channel":
                    client.sql.get(`SELECT * FROM inviteChannels WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE channelID, channelName FROM inviteChannels WHERE guildID = ${msg.guild.id} AND channelID = ${msg.mentions.channels.last().id}`);
                        msg.channel.send(new MessageEmbed().setDescription(`In dem Channel (${msg.mentions.channels.last()}) kann man keine invites mehr senden`))
                    });
                    break;
                case "--remove-user":
                    client.sql.get(`SELECT * FROM inviteUsers WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE userID, username FROM inviteUsers WHERE guildID = ${msg.guild.id} AND userID = ${msg.mentions.users.last().id}`);
                        msg.channel.send(new MessageEmbed().setDescription(`Der user ${msg.mentions.users.last()} kann nun keine invites senden.`));
                    });
                    break;
                case "--remove-role":
                    client.sql.get(`SELECT * FROM inviteRoles WHERE guildID = ${msg.guild.id}`).then(() => {
                        client.sql.run(`DELETE roleID, roleName FROM inviteRoles WHERE guildID = ${msg.guild.id} AND roleID = ${msg.mentions.channels.last().id}`);
                        msg.channel.send(new MessageEmbed().setDescription(`Alle user mit der rolle ${msg.mentions.roles.last()} können nun keine invites mehr senden.`));
                    });
            }
        }
    },

    info: {

    }
};