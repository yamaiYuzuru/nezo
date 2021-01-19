exports.run = async (client, msg, args) => {
    const {MessageEmbed} = require("discord.js");
    const channel = client.channels.cache.get("776454608477749308");
    const fs = require("fs");
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));

    channel.send('<@&776440469919105066>', {embed: new MessageEmbed().setTitle('Eine idee ist eingetroffen').setDescription(args.join(' ')).setFooter(`Idee von ${msg.author.tag} und vom server ${msg.guild.name}`)});

    if (guilds[msg.guild.id].english === true) {
        await msg.channel.send(new MessageEmbed().setTitle("Thank you").setDescription(`Thanks for your suggest our bot team reads in the next time the suggest. if you had a little bit luck then can be your suggest be a command or function. \nYour suggest was: \n${args.join(' ')}`));
    } else {
        await msg.channel.send(new MessageEmbed().setTitle("Danke").setDescription(`Danke für deine idee unser bot team wird es in der nächste zeit lesen. wenn du etwas glück hast kann deine idee ein command oder eine function sein. \nDein idee war: \n${args.join(' ')}`))
    }
};

exports.info = {
    aliases: ['idea', 'idee']
};