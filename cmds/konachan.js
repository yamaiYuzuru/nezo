const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require('fs')

const Discord = require('discord.js');
const booru = require('booru');

exports.run = (client, msg, args) => {
    const message = msg;
       if(message.guild === null)return;


        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

var boorus = ['konac'];
var randombooru = boorus[Math.floor(Math.random() * boorus.length)];
var tags = [''];
var randomtag = tags[Math.floor(Math.random() * tags.length)];
var query = message.content.split(/\s+/g).slice(1).join(" ");

        booru.search(randombooru, [query], {nsfw: true, limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Konachan:")
                    .setImage(image.common.file_url)
                    .setColor('#000000')
                    .setFooter(`Tags: konachan ${query}`)
                    .setURL(image.common.file_url);
                    return message.channel.send({embed});
                }
            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**`);
                } else {
                    return message.channel.send(`No results found for **${query}**`);
                }
})
      
};

exports.info = {
    cooldown:2.5
};