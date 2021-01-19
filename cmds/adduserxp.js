module.exports = {
    info: {

    },
    async run(client, msg, args) {
        const {MessageEmbed} = require('discord.js');
        const sql = client.sql;
        const {readFileSync} = require('fs');
        const guilds = JSON.parse(readFileSync('./data/guilds.json', "utf8"));

        sql.get(`SELECT * FROM userScores WHERE guildID=${msg.guild.id}`).then(() => {
            if (guilds[msg.guild.id].english === true) {
                if (!args[1]) return msg.channel.send(new MessageEmbed());
                if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription('You need admin perms'));
                if (!msg.mentions.users.first()) return msg.channel.send(new MessageEmbed().setTitle('Uhm...').setDescription('You must mention a user'));
                if (!isNaN(args[0])) return msg.channel.send(new MessageEmbed());
                const member = msg.guild.member(msg.mentions.users.first());
                sql.get(`SELECT * FROM userScores WHERE userID=${member.id}`).then(user => {
                    const currentUserXP = user.globalPoints;
                    sql.run(`UPDATE INTO userScores WHERE userID=${member.id} AND guildID=${msg.guild.id} SET globalPoints=${currentUserXP + args[0]}`).catch(e => client.channels.cache.get("777602098719359056").send(new MessageEmbed().setDescription(e.toString())));
                    msg.channel.send(new MessageEmbed())
                });
            } else {
                if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send(new MessageEmbed());
                if (!msg.mentions.users.first()) return msg.channel.send(new MessageEmbed());
                if (!isNaN(args[0])) return msg.channel.send(new MessageEmbed());
                const member = msg.guild.member(msg.mentions.users.first());
                sql.get(`SELECT * FROM userScores WHERE userID=${member.id}`).then(user => {
                    const currentUserXP = user.globalPoints;
                    sql.run(`UPDATE INTO userScores WHERE userID=${member.id} AND guildID=${msg.guild.id} SET globalPoints=${currentUserXP + args[0]}`).catch(e => client.channels.cache.get("777602098719359056").send(new MessageEmbed().setDescription(e.toString())));
                    msg.channel.send(new MessageEmbed())
                });
            }
        })
    }
};