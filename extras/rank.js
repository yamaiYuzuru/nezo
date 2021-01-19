exports.run = async (client, msg, args) => {
    const canvacord = require('canvacord');
    const discord = require('discord.js');
    const card = new canvacord.Rank({
        background: "https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-fashion-atmosphere-black-gold-black-background-image_15563.jpg",
        level: client.sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(iUser => iUser.uLevel),
        currentXP: client.sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(iUser => iUser.globalPoints),
        rank: client.sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(iUser => iUser.globalRank),
        username: msg.author.username,
        discriminator: msg.author.discriminator,
        progressBar: true
    });
    await card.build().then((data) => {
        canvacord.write(data, msg.guild.id+'_'+msg.author.id+"_rankcard.jpg");
        msg.channel.send(new discord.MessageAttachment(data));
    });
};

exports.info = {

};