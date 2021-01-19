exports.run = async (client, msg, args) => {
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf-8"));
    const {MessageEmbed} = require('discord.js');

    if (guilds[msg.guild.id].english === true) {
        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send('YOU MUST BE A ADMINISTRATOR (by perms) lol');
        await msg.channel.send(new MessageEmbed().setDescription('Are you sure to delete all user stats on this guild?')).then(m => {
            m.react("✔").then(() =>{
                m.react("❌").then(() => {
                    const yesFilter = (reaction, user) => reaction.emoji.name === "✔" && user.id === msg.author.id;
                    const noFilter = (reaction, user) => reaction.emoji.name === "" && user.id === msg.author.id;

                    const yes = m.createReactionCollector(yesFilter);
                    const no = m.createReactionCollector(noFilter);

                    yes.on("collect", r => {
                        m.edit(new MessageEmbed()
                            .setDescription('Ok. I will clear the user stats on this guild'));
                        client.sql.run(`DELETE FROM userScores WHERE guildID = ${msg.guild.id}`);
                    });

                    no.on("collect", r => {
                        m.edit(new MessageEmbed().setDescription('Ok. i don\'t clear the user stats on this guild'));
                    });
                });
            });
        });
    } else {
        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send('DU MUSST ADMINISTRATOR SEIN (by perms) lol');
        await msg.channel.send(new MessageEmbed().setDescription('Bist du dir sicher die user stats auf diesem server zu löschen?')).then(m => {
            m.react("✔").then(() =>{
                m.react("❌").then(() => {
                    const yesFilter = (reaction, user) => reaction.emoji.name === "✔" && user.id === msg.author.id;
                    const noFilter = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id;

                    const yes = m.createReactionCollector(yesFilter);
                    const no = m.createReactionCollector(noFilter);

                    yes.on("collect", r => {
                        m.edit(new MessageEmbed().setDescription('Ok. ich werde die user stats löschen'));
                        client.sql.run(`DELETE FROM userScores WHERE guildID = ${msg.guild.id}`);
                    });

                    no.on("collect", r => {
                        m.edit(new MessageEmbed().setDescription('Ok. Ich werde nicht die user stats löschen'));
                    });
                });
            });
        });
    }
};

exports.info = {
    aliases: ['cl', 'delete-levels', "clearleaderbord"],
    cooldown: 20
};