exports.run = async (client, msg, args) => {
    const {MessageEmbed} = require("discord.js");
    const channel = client.channels.cache.get("776454614903029790");
    const fs = require("fs");
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));

    channel.send('<@&776440238754365491>', {embed: new MessageEmbed().setTitle('Ein feedback ist eingetroffen').setDescription(args.join(' ')).setFooter(`Feedback von ${msg.author.tag} und vom server ${msg.guild.name}`)});

    if (guilds[msg.guild.id].english === true) {
        await msg.channel.send(new MessageEmbed().setTitle("Thank you").setDescription(`Thanks for your feedback our bot team reads in the next time the feedback. \nYour feedback was: \n${args.join(' ')}`));
    } else {
        await msg.channel.send(new MessageEmbed().setTitle("Danke").setDescription(`Danke für dein feedback unser bot team wird es in der nächste zeit lesen. \nDein feedback war: \n${args.join(' ')}`))
    }
};

exports.info = {
    cooldown:2.5
};