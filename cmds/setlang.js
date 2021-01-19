exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));

    if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send('No perms');
    await msg.channel.send(new dc.MessageEmbed({
        title: "Choose a language",
        description: "English: 🇺🇸 German: 🇩🇪"
    })).then(message => {
        message.react('🇩🇪').then(() => {
            message.react('🇺🇸').then(() => {
                const germanFilter = (reaction, user) => reaction.emoji.name === "🇩🇪" && user.id === msg.author.id;
                const englishFilter = (reaction, user) => reaction.emoji.name === "🇺🇸" && user.id === msg.author.id;

                const german = message.createReactionCollector(germanFilter);
                const english = message.createReactionCollector(englishFilter);

                german.on('collect' , () => {
                    const germanEmbed = new dc.MessageEmbed();
                    germanEmbed.setDescription('Spache auf Deutsch gestellt.');
                    guilds[msg.guild.id] = {
                        english: false,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage
                    };
                    fs.writeFileSync('./data/guilds.json', JSON.stringify(guilds), (err => {}));
                    message.edit(germanEmbed);
                });

                english.on('collect', () => {
                    const englishEmbed = new dc.MessageEmbed();
                    englishEmbed.setDescription('Language set to English');
                    guilds[msg.guild.id] = {
                        english: true,
                        prefix: guilds[msg.guild.id].prefix,
                        levelupMessage: guilds[msg.guild.id].levelupMessage
                    };
                    fs.writeFileSync('./data/guilds.json', JSON.stringify(guilds), (err => {}));
                    message.edit(englishEmbed);
                })
            });
        });
    });
};

exports.info = {
    cooldown:2.5
};