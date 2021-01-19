exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const request = require('request');
    if (guilds[msg.guild.id].english === true) {
        request('https://sasaki.me/api/happy', (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} is really happy!`).setImage(res.body));
        });
    } else {
        request('https://sasaki.me/api/happy', (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} ist wirklich glücklich!`).setImage(res.body));
        });
    }
};

exports.info = {
    aliases: [],
    cooldown: 2
};