module.exports = {
    info: {
        aliases: ["setbc"]
    },
    async run(client, msg, args) {
        const {readFileSync} = require('fs');
        const guilds = JSON.parse(readFileSync('./data/guilds.json', "utf8"));
        const sql = client.sql;
        const {MessageEmbed} = require('discord.js');

        if (guilds[msg.guild.id].english === true) {
            if (!msg.member.permissions.has('MANAGE_CHANNELS')) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription('You need the permission Manage Channels'));
            if (!args[0]) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription(`${guilds[msg.guild.id].prefix}setblockedchannel {add/delete} #{channel}`));
            if (!msg.mentions.channels.last()) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription("One thing is missing...\n" +
                "Please mention a channel they be blocked on the level system"));
            sql.get(`SELECT * FROM bListChannels WHERE guildID=${msg.guild.id}`).then(raw => {
                if (args.join(' ') === "add") {
                    if (!raw) {
                        sql.run(`INSERT INTO bListChannels (guildID, channelName, channelID) VALUES (?,?,?)`, [msg.guild.id, msg.mentions.channels.last().name, msg.mentions.channels.last().id]);
                    } else {
                        sql.run(`UPDATE bListChannels SET guildID=${msg.guild.id} channelName=${msg.mentions.channels.last().name} channelID=${msg.mentions.channels.last().id}`).catch(e => client.channels.cache.get('').send(new MessageEmbed().setTitle("Error eingetroffen").setDescription('Error:\n' + e.toString())));
                        msg.channel.send(new MessageEmbed().setTitle("Yay!").setDescription(`The channel ${msg.mentions.channels.last()} is now blocked for the levelsystem.`));
                    }
                } else if (args.join(' ') === "delete") {
                    if (!raw) {
                        sql.run(`INSERT INTO bListChannels (guildID, channelName, channelID) VALUES (?,?,?)`, [msg.guild.id, msg.mentions.channels.last().name, msg.mentions.channels.last().id]);
                    } else {
                        sql.run(`DELETE bListChannels WHERE guildID=${msg.guild.id}`).catch(e => client.channels.cache.get('').send(new MessageEmbed().setTitle("Error eingetroffen").setDescription('Error:\n' + e.toString())));
                        msg.channel.send(new MessageEmbed().setTitle("Yay!").setDescription(`The channel ${msg.mentions.channels.last()} is now unblocked for the levelsystem.`));
                    }
                }
            });
        } else {
            if (!msg.member.permissions.has('MANAGE_CHANNELS')) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription('Du brachst die permission Manage Channels'));
            if (!args[0]) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription(`${guilds[msg.guild.id].prefix}setblockedchannel {add/delete} #{channel}`));
            if (!msg.mentions.channels.last()) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription("Eine sache fehlt...\n" +
                "Bitte makiere einen channel der vom level system geblockt werden soll"));
            sql.get(`SELECT * FROM bListChannels WHERE guildID=${msg.guild.id}`).then(raw => {
                if (args.join(' ') === "add") {
                    if (!raw) {
                        sql.run(`INSERT INTO bListChannels (guildID, channelName, channelID) VALUES (?,?,?)`, [msg.guild.id, msg.mentions.channels.last().name, msg.mentions.channels.last().id]);
                    } else {
                        sql.run(`UPDATE bListChannels SET guildID=${msg.guild.id} channelName=${msg.mentions.channels.last().name} channelID=${msg.mentions.channels.last().id}`).catch(e => client.channels.cache.get('').send(new MessageEmbed().setTitle("Error eingetroffen").setDescription('Error:\n' + e.toString())));
                        msg.channel.send(new MessageEmbed().setTitle("Yay!").setDescription(`Der channel ${msg.mentions.channels.last()} ist nun fürs levelsystem geblockt.`));
                    }
                } else if (args.join(' ') === "delete") {
                    if (!raw) {
                        sql.run(`INSERT INTO bListChannels (guildID, channelName, channelID) VALUES (?,?,?)`, [msg.guild.id, msg.mentions.channels.last().name, msg.mentions.channels.last().id]);
                    } else {
                        sql.run(`DELETE bListChannels WHERE guildID=${msg.guild.id}`).catch(e => client.channels.cache.get('').send(new MessageEmbed().setTitle("Error eingetroffen").setDescription('Error:\n' + e.toString())));
                        msg.channel.send(new MessageEmbed().setTitle("Yay!").setDescription(`Der channel ${msg.mentions.channels.last()} ist nun entblockt fürs level system.`));
                    }
                }
            });
        }
    }
};