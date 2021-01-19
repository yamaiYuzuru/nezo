exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const request = require('request');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        if (!msg.mentions.users.first()) return msg.channel.send(new dc.MessageEmbed({title: 'Uhm..', description: 'You must mention an user.', color: 'RED'}));
        request('https://sasaki.me/api/bite', (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} bites ${msg.mentions.users.first().username}`).setImage(res.body));
        });
    }else {
        if (!msg.mentions.users.first()) return msg.channel.send(new dc.MessageEmbed({title: 'Uhm..', description: 'Du musst einen user pingen.', color: 'RED'}));
        request('https://sasaki.me/api/bite', (err, res) => {
            msg.channel.send(new dc.MessageEmbed().setTitle(`${msg.author.username} beißt ${msg.mentions.users.first().username}`).setImage(res.body));
        })
    }
};

exports.info = {
    name: 'bite',
    aliases: [],
    cooldown: 2
};