const ms = require('ms');
const dc = require('discord.js');
exports.run = async (client, msg, args) => {
    const message = msg;
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));

    if (guilds[msg.guild.id].english === true) {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(new dc.MessageEmbed().setTitle('Uhm...').setDescription('You need the manage messages permission to choose a new winner'));
        }

        // If no message ID or giveaway name is specified
        if(!args[0]){
            return message.channel.send(':x: Enter a valid message id!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if(!giveaway){
            return message.channel.send('Can\'t find the giveaway with the id `'+ args.join(' ') +'`.');
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID).then(() => {
            // Success message
            message.channel.send('Giveaway rerolled!');
        }).catch((e) => {
            if(e.startsWith(`Giveaway mit der nachrichten ID ${giveaway.messageID} ist nicht zu ende.`)){
                message.channel.send('The giveaway is not ended yet!');
            } else {
                console.error(e);
                message.channel.send('A error is appeared');
            }
        });
    } else {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Du brauchst die Berechtigungen Nachrichten verwalten, um giveaways einen anderen gewinner zu auszulosen.');
        }

        // If no message ID or giveaway name is specified
        if(!args[0]){
            return message.channel.send(':x: gebe eine richige nachrichten id ein!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if(!giveaway){
            return message.channel.send('kann das giveaway nicht finden `'+ args.join(' ') +'`.');
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID).then(() => {
            // Success message
            message.channel.send('Giveaway rerolled!');
        }).catch((e) => {
            if(e.startsWith(`Giveaway mit der nachrichten ID ${giveaway.messageID} ist nicht zu ende.`)){
                message.channel.send('Das giveaway ist nicht zu ende!');
            } else {
                console.error(e);
                message.channel.send('Ein fehler ist aufgetreten');
            }
        });
    }
};

exports.info = {
    aliases: ['g-reroll'],
    cooldown: 6
};