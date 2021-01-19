const lEmbed = require('./../embeds/eLeaderboard.js');
exports.run = async (client, msg, args) => {
    const sql = client.sql;
    const Discord = require('discord.js');
    await lEmbed.leaderboardEmbed(client, msg, sql, Discord);
};

exports.info = {
    aliases: ['lb', 'top'],
    cooldown: 3.5
};
