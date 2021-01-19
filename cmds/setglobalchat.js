exports.run = async (client, msg, args) => {
    const discord = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const db = require('../extras/db');

    if (guilds[msg.guild.id].english === true) {
        if (!msg.member.permissions.has("MANAGE_CHANNELS")) return msg.channel.send(new discord.MessageEmbed({title: "Uhm...", description: "You dont have the permission to do that."}));
        if (!msg.mentions.channels.first()) return msg.channel.send(new discord.MessageEmbed({description: "please give me a channel."}));
        try {
            db.noServerCreate(msg.guild.id);
            client.db.setServer(msg.guild.id, "globalchat", `${msg.mentions.channels.first().id}`);
            await msg.channel.send(new discord.MessageEmbed({
                title: "Hurray",
                description: `The global chat was set to ${msg.mentions.channels.first()}`
            }));
        } catch (e) {
            await msg.channel.send(e.toString());
        }
    } else {
        if (!msg.member.permissions.has("MANAGE_CHANNELS")) return msg.channel.send(new discord.MessageEmbed({title: "Uhm...", description: "Du hast nicht genug perms um das zu machen."}));
        if (!msg.mentions.channels.first()) return msg.channel.send(new discord.MessageEmbed({title: "Uhm...", description: "Du musst mir schon einen channel geben."}));
        try {
            client.db.noServerCreate(msg.guild.id);
            client.db.setServer(msg.guild.id, "globalchat", `${msg.mentions.channels.first().id}`);
            await msg.channel.send(new discord.MessageEmbed({
                title: "Hurray",
                description: `Der globale chat wurde in ${msg.mentions.channels.first()} gesetzt.`
            }));
        } catch (e) {
            await msg.channel.send(e.toString())
        }
    }
};

exports.info = {
    cooldown:2.5
}