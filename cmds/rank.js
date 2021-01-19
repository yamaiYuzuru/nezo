const pEmbed = require('./../embeds/eProfile.js');
exports.run = async (client, msg, args) =>{
    const member = msg.guild.member(msg.mentions.users.first());
    const Discord = require('discord.js');
    const sql = client.sql;
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));

    if (guilds[msg.guild.id].english === true) {
        if(!member){
            client.sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(iUser =>{ //gets user row of whos requesting
                if(!iUser){
                    msg.reply("Sorry honey, you don't have any xps.");
                }else{
                    pEmbed.profileEmbed(client, msg, msg.author, iUser, Discord);
                }
            })
        }else{
            sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${member.id}'`).then(iUser =>{
                if(!iUser){
                    msg.reply("Sorry honey, this user don't have any xps.");
                }else{
                    pEmbed.profileEmbed(client, msg, member.user, iUser, Discord);
                }
            })
        }
    } else {
        if(!member){
            client.sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${msg.author.id}'`).then(iUser =>{ //gets user row of whos requesting
                if(!iUser){
                    msg.reply("Sorry honey, du hat keine xps gesammelt schreibe ein wenig und du bekommst xps");
                }else{
                    pEmbed.profileEmbed(client, msg, msg.author, iUser, Discord);
                }
            })
        }else{
            sql.get(`SELECT * FROM userScores WHERE guildID = '${msg.guild.id}' AND userID = '${member.id}'`).then(iUser =>{
                if(!iUser){
                    msg.reply("Sorry honey, der user hat keine xps");
                }else{
                    pEmbed.profileEmbed(client, msg, member.user, iUser, Discord);
                }
            })
        }
    }
};

exports.info = {
    cooldown:2.5
};