const ms = require('ms');
const dc = require('discord.js');
exports.run = async (client, msg, args) => {
    const message = msg;
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    if (guilds[msg.guild.id].english === true) {
        if (!args[0]) return msg.channel.send(new dc.MessageEmbed().setDescription(`Usage: ${guilds[msg.guild.id].prefix}g-start {#channel} {time} {winner/winners} {prize}`));
        if(!msg.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(new dc.MessageEmbed().setTitle('Uhm...').setDescription('You need mange messages to start a giveaway.'));
        }

        // Giveaway channel
        let giveawayChannel = msg.mentions.channels.first();
        // If no channel is mentionned
        if(!giveawayChannel){
            return msg.channel.send(':x: You must mention a channel there will hosted the giveaway!');
        }

        // Giveaway duration
        let giveawayDuration = args[1];
        // If the duration isn't valid
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return msg.channel.send(':x: You have to specify a valid duration!');
        }

        // Number of winners
        let giveawayNumberWinners = args[2];
        // If the specified number of winners is not a number
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return msg.channel.send(':x: You have to specify a valid number of winners!');
        }

        // Giveaway prize
        let giveawayPrize = args.slice(3).join(' ');
        // If no prize is specified
        if(!giveawayPrize){
            return msg.channel.send(':x: You have to specify a valid prize!');
        }

        // Start the giveaway
        await client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayNumberWinners,
            // Who hosts this giveaway
            hostedBy: msg.author,
            // Messages
            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉 **GIVEAWAY END** 🎉🎉",
                timeRemaining: "Time: **{duration}**!",
                inviteToParticipate: "React with 🎉 to enter!",
                winMessage: ", {winners}! You has **{prize}** won!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway ended. No winner because no user has entered.",
                hostedBy: "Hosted by {user}",
                winners: "Winner",
                endedAt: "Ends at ",
                units: {
                    seconds: "secs",
                    minutes: "min",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        await msg.channel.send(`Giveaway started in ${giveawayChannel}!`);
    } else {
        if (!args[0]) return msg.channel.send(new dc.MessageEmbed().setDescription(`Benutzung: ${guilds[msg.guild.id].prefix}g-start {#channel} {time} {gewinner} {preis}`));
        if(!msg.member.hasPermission('MANAGE_MESSAGES') && !msg.member.roles.cache.some((r) => r.name === "Giveaways")){
            return msg.channel.send(new dc.MessageEmbed().setTitle('Uhm...').setDescription('Du musst nachrichten verwalten können um ein giveaway zu starten'));
        }

        // Giveaway channel
        let giveawayChannel = msg.mentions.channels.first();
        // If no channel is mentionned
        if(!giveawayChannel){
            return msg.channel.send(':x: Du musst mir einen channel geben.!');
        }

        // Giveaway duration
        let giveawayDuration = args[1];
        // If the duration isn't valid
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return msg.channel.send(':x: Du musst schon eine richtige zeit sagen!');
        }

        // Number of winners
        let giveawayNumberWinners = args[2];
        // If the specified number of winners is not a number
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return msg.channel.send(':x: Du musst schon eine richtige anzahl an gewinnern angeben!');
        }

        // Giveaway prize
        let giveawayPrize = args.slice(3).join(' ');
        // If no prize is specified
        if(!giveawayPrize){
            return msg.channel.send(':x: Du musst schon sagen was verlost werden soll!');
        }

        // Start the giveaway
        await client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayNumberWinners,
            // Who hosts this giveaway
            hostedBy: msg.author,
            // Messages
            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉 **GIVEAWAY ENDE** 🎉🎉",
                timeRemaining: "Dauer: **{duration}**!",
                inviteToParticipate: "Reacte mit 🎉 um teil zunehmen!",
                winMessage: "Herzlichen Glückwunsch, {winners}! Du hast **{prize}** gewonnen!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway abgebrochen da niemand mit gemacht hat.",
                hostedBy: "Hoster: {user}",
                winners: "Gewinner",
                endedAt: "Endet in ",
                units: {
                    seconds: "Sekunden",
                    minutes: "Minuten",
                    hours: "Stunden",
                    days: "Tage",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        await msg.channel.send(`Giveaway gestartet in ${giveawayChannel}!`);
    }
};

exports.info = {
    aliases: ["g-start"],
    cooldown: 6
};