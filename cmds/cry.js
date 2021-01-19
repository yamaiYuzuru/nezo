exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const request = require('request');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        request("https://sasaki.me/api/cry", (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} cries`).setImage(res.body));
        });
    } else {
        request("https://sasaki.me/api/cry", (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} weint`).setImage(res.body));
        })
    }
};

exports.info = {
    name: 'cry',
    aliases: [],
    cooldown: 2.5
};