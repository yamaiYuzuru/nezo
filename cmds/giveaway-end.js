const ms = require('ms');

exports.run = async (client, msg, args) => {
    const message = msg;
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: You need the manage messages permission to end the giveaway.');
        }

        // If no message ID or giveaway name is specified
        if(!args[0]){
            return message.channel.send(':x: Give me a valid message id!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if(!giveaway){
            return message.channel.send('Can\'t find the giveaway with id `'+ args.join(' ') + '`.');
        }

        // Edit the giveaway
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(() => {
            message.channel.send('The giveaway ends in '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        }).catch((e) => {
            if(e.startsWith(`Das giveaway mit der nachrichten ID ${giveaway.messageID} ist bereits zu ende.`)){
                message.channel.send('The giveaway is already ended!');
            } else {
                console.error(e);
                message.channel.send('A error is appeared');
            }
        });
    } else {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Du brauchst die Berechtigungen Nachrichten verwalten, um giveaways zu beenden.');
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
            return message.channel.send('kann das giveaway nicht finden `'+ args.join(' ') + '`.');
        }

        // Edit the giveaway
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(() => {
                message.channel.send('Das giveaway endent in weniger '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' sekunden...');
        }).catch((e) => {
            if(e.startsWith(`Das giveaway mit der nachrichten ID ${giveaway.messageID} ist bereits zu ende.`)){
                message.channel.send('Das giveaway ist bereits zu ende!');
            } else {
                console.error(e);
                message.channel.send('ein fehler ist aufgetreten');
            }
        });
    }
};

exports.info = {
    aliases: ['g-end'],
    cooldown: 6
};