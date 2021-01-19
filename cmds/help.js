exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf-8"));
    const embed = new dc.MessageEmbed();
        //https://cdn.discordapp.com/emojis/732585164659490816.png?v=1
        //https://cdn.discordapp.com/emojis/732585164676530207.png?v=1
    if (msg.author.avatarURL({format: "gif"})) {
        embed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
    } else {
        embed.setFooter(msg.author.tag, msg.author.avatarURL());
    }
    embed.addField("✨ General", "General Commands").addField("<:ban:779360087441276978> Moderation", "Moderation Commands").addField("🎉 Fun", "Fun Commands").addField('<a:levelup:759457814308585523> Leveling', "Level Commands\n\n[Invite Nezo](https://discord.com/api/oauth2/authorize?client_id=756256019318833183&permissions=271903814&scope=bot) | [Support Server](https://discord.gg/) \n\n Bot by !yuzuru.#4112");
        if (guilds[msg.guild.id].english === true) {
            (await msg.channel.send(embed).then(message => {
                message.react("✨").then(() => {
                    message.react("779360087441276978").then(() => {
                        message.react("🎉").then(() => {
                            message.react('759457814308585523').then(() => {
                                message.react('750404612577820823').then(() => {
                                    const generalFilter = (reaction, user) => reaction.emoji.name === '✨' && user.id === msg.author.id;
                                    const moderationFilter = (reaction, user) => reaction.emoji.name === 'ban' && user.id === msg.author.id;
                                    const funFilter = (reaction, user) => reaction.emoji.name === "🎉" && user.id === msg.author.id;
                                    const levelingFilter = (reaction, user) => reaction.emoji.name === "nezoLevelUp" && user.id === msg.author.id;
                                    const backFilter = (reaction, user) => reaction.emoji.name === 'zurueck' && user.id === msg.author.id;

                                    const general = message.createReactionCollector(generalFilter);
                                    const moderation = message.createReactionCollector(moderationFilter);
                                    const fun = message.createReactionCollector(funFilter);
                                    const leveling = message.createReactionCollector(levelingFilter);
                                    const back = message.createReactionCollector(backFilter);

                                    general.on('collect', r => {
                                        const generalEmbed = new dc.MessageEmbed();
                                        generalEmbed.setTitle("General Commands");
                                        generalEmbed.addField("> help", '`Shows the main Page of the help command`', true);
                                        generalEmbed.addField("> setprefix", '`Set a custom prefix`', true);
                                        generalEmbed.addField('> info', "`Shows informations of the bot`", true);
                                        generalEmbed.addField('> g-start', "`Starts a giveaway`", true);
                                        generalEmbed.addField("> g-end", "`Ends a giveaway`", true);
                                        generalEmbed.addField("> g-reroll", "`Choose a new winner`", true);
                                        generalEmbed.addField('> invite', "`Invite the bot`", true);
                                        generalEmbed.addField("> setlang", "`Change the language of the bot`", true);
                                        generalEmbed.addField("> setlevelupmsg", "`Enable levelup message or disable`", true);
                                        generalEmbed.addField("> vote", "`Vote for the bot`");
                                        generalEmbed.addField("> suggest", "`Send the bot team a idea`", true);
                                        generalEmbed.addField("> feedback", "`Send a feedback to the bot team`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            generalEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            generalEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(generalEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    moderation.on('collect', r => {
                                        const moderationEmbed = new dc.MessageEmbed();
                                        moderationEmbed.addField('> clear', '`Clear messages.`');
                                        moderationEmbed.addField('> ban', '`Throw the ban hammer to a user.`', true);
                                        moderationEmbed.addField("> kick", "`Kick an user from an guild`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            moderationEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            moderationEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        r.users.remove(msg.author.id);
                                        message.edit(moderationEmbed);
                                    });

                                    fun.on('collect', r => {
                                        const funEmbed = new dc.MessageEmbed();
                                        funEmbed.addField('> clyde', '`Let clyde send a message`', true);
                                        funEmbed.addField('> ship', '`Ship you and another user`', true);
                                        funEmbed.addField('> trumptweet', '`Tweet as Trump`', true);
                                        // npm i genshin-impact-apifunEmbed.addField('> lolice', '`Be the Lolice chief`', true);
                                        funEmbed.addField('> kannagen', '`Let kanna write on an paper`', true);
                                        funEmbed.addField('> happy', '`Say if you happy`', true);
                                        funEmbed.addField('> cry', '`Say if you sad and want to cry`', true);
                                        funEmbed.addField('> nom', '`You want to eat an user?`', true);
                                        funEmbed.addField('> bite', '`You want to bite an user?`', true);
                                        funEmbed.addField('> changemymind', "`Write a custom message on a poster`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            funEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            funEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(funEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    leveling.on("collect", r => {
                                        const levelEmbed = new dc.MessageEmbed();
                                        levelEmbed.addField("> rank", "`Shows your or a other person the level stats`", true);
                                        levelEmbed.addField("> leaderboard", "`Shows the Top 5`", true);
                                        levelEmbed.addField("> rlevel", "`Add, remove or update level roles`", true);
                                        levelEmbed.addField("> rroles", "`Shows the level roles on this guild`", true);
                                        levelEmbed.addField("> clearlevels", "`Clear all levels on this guild`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            levelEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            levelEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(levelEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    back.on('collect', r => {
                                        message.edit(embed);
                                        r.users.remove(msg.author.id);
                                    });
                                });
                            });
                        });
                    });
                });
            }));
        } else {
            (await msg.channel.send(embed).then(message => {
                message.react("✨").then(() => {
                    message.react("779360087441276978").then(() => {
                        message.react("🎉").then(() => {
                            message.react('759457814308585523').then(() => {
                                message.react('750404612577820823').then(() => {
                                    const generalFilter = (reaction, user) => reaction.emoji.name === '✨' && user.id === msg.author.id;
                                    const moderationFilter = (reaction, user) => reaction.emoji.name === 'ban' && user.id === msg.author.id;
                                    const funFilter = (reaction, user) => reaction.emoji.name === "🎉" && user.id === msg.author.id;
                                    const levelingFilter = (reaction, user) => reaction.emoji.name === "nezoLevelUp" && user.id === msg.author.id;
                                    const backFilter = (reaction, user) => reaction.emoji.name === 'zurueck' && user.id === msg.author.id;

                                    const general = message.createReactionCollector(generalFilter);
                                    const moderation = message.createReactionCollector(moderationFilter);
                                    const fun = message.createReactionCollector(funFilter);
                                    const leveling = message.createReactionCollector(levelingFilter);
                                    const back = message.createReactionCollector(backFilter);

                                    general.on('collect', r => {
                                        const generalEmbed = new dc.MessageEmbed();
                                        generalEmbed.setTitle("General Commands");
                                        generalEmbed.addField("> help", '`Zeigt dir die start seite des help commands`', true);
                                        generalEmbed.addField("> setprefix", '`Setze einen neuen prefix`', true);
                                        generalEmbed.addField('> info', "`Zeige informationen über den bot`", true);
                                        generalEmbed.addField('> g-start', "`Starte ein giveaway`", true);
                                        generalEmbed.addField("> g-end", "`Beende ein giveaway`", true);
                                        generalEmbed.addField("> g-reroll", "`Wähle einen neuen gewinner`", true);
                                        generalEmbed.addField('> invite', "`Invite den bot`", true);
                                        generalEmbed.addField("> setlang", "`Ändere die sprache des bots`", true);
                                        generalEmbed.addField("> setlevelupmsg", "`Aktiviere oder deaktiviere die level up nachricht`", true);
                                        generalEmbed.addField("> vote", "`Vote für den bot`", true);
                                        generalEmbed.addField("> feedback", "`Sende ein feedback`", true);
                                        generalEmbed.addField("> suggest", "`Sende eine idee ab`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            generalEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            generalEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(generalEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    moderation.on('collect', r => {
                                        const moderationEmbed = new dc.MessageEmbed();
                                        moderationEmbed.addField('> clear', '`Lösche nachrichten.`', true);
                                        moderationEmbed.addField('> ban', '`Werfe den banhammer auf einen user`', true);
                                        moderationEmbed.addField("> kick", "`Kicke einen user vom server`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            moderationEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            moderationEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        r.users.remove(msg.author.id);
                                        message.edit(moderationEmbed);
                                    });

                                    fun.on('collect', r => {
                                        const funEmbed = new dc.MessageEmbed();
                                        funEmbed.addField('> clyde', '`Lass cyde eine nachricht senden`', true);
                                        funEmbed.addField('> trumptweet', '`Tweete als Trump`', true);
                                        funEmbed.addField('> lolice', '`Sei der Lolice chief`', true);
                                        funEmbed.addField('> kannagen', '`Lass kanna auf paier schreiben`', true);
                                        funEmbed.addField('> happy', '`Sag wenn du glücklich bist`', true);
                                        funEmbed.addField('> cry', '`Sage wenn du traurig bist und weinen möchetest`', true);
                                        funEmbed.addField('> nom', '`Möchtest du einen user essen?`', true);
                                        funEmbed.addField('> bite', '`Möchetet du einen user beißen`', true);
                                        funEmbed.addField('> changemymind', "`Scheibe eine custom nachrich auf ein poster`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            funEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            funEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(funEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    leveling.on("collect", r => {
                                        const levelEmbed = new dc.MessageEmbed();
                                        levelEmbed.addField("> rank", "`Zeige dir oder einer anderen person die level stats an`", true);
                                        levelEmbed.addField("> leaderboard", "`Shows the Top 5`", true);
                                        levelEmbed.addField("> rlevel", "`Add, remove or update level roles`", true);
                                        levelEmbed.addField("> rroles", "`Shows the level roles on this guild`", true);
                                        levelEmbed.addField("> clearlevels", "`Lösche alle level von dem server`", true);
                                        if (msg.author.avatarURL({format: "gif"})) {
                                            levelEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}));
                                        } else {
                                            levelEmbed.setFooter(msg.author.tag, msg.author.avatarURL());
                                        }
                                        message.edit(levelEmbed);
                                        r.users.remove(msg.author.id);
                                    });

                                    back.on('collect', r => {
                                        message.edit(embed);
                                        r.users.remove(msg.author.id);
                                    });
                                });
                            });
                        });
                    });
                });
            }));
        }
};

/**
 * message.react('').then(r => {
                        const generalFilter = (reaction, user) => reaction.emoji.name === '✨' && user.id === msg.author.id;
                        const moderationFilter = (reaction, user) => reaction.emoji.name === 'ban' && user.id === msg.author.id;
                        const funFilter = (reaction, user) => reaction.emoji.name === "🎉" && user.id === msg.author.id;
                        const backFilter = (reaction, user) => reaction.emoji.name === 'back' && user.id === msg.author.id;

                        const general = message.createReactionCollector(generalFilter, {time: 128000});
                        const moderation = message.createReactionCollector(moderationFilter, {time: 128000});
                        const fun = message.createReactionCollector(funFilter, {time: 128000});
                        const back = message.createReactionCollector(backFilter, {time: 1280000});

                        general.on('collect', r => {
                            const generalEmbed = new dc.MessageEmbed();
                            generalEmbed.setTitle("General Commands");
                            generalEmbed.addField("help", '`Shows the main Page of the help command`');
                            generalEmbed.addField("setprefix", '`Set a custom prefix`');
                            generalEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "png"}));
                            message.edit(generalEmbed);
                            r.users.remove(msg.author.id);
                        });

                        moderation.on('collect', r => {
                           const moderationEmbed = new dc.MessageEmbed();
                           moderationEmbed.addField('clear', '`Clear messages.`');
                           moderationEmbed.addField('ban', '`Throw the ban hammer to a user.`');
                           moderationEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "png"}));
                           r.users.remove(msg.author.id);
                           message.edit(moderationEmbed);
                        });

                        fun.on('collect', r => {
                            const funEmbed = new dc.MessageEmbed();
                            funEmbed.addField('clyde', '`Let clyde send a message`');
                            funEmbed.addField('ship', '`Ship you and another user`');
                            funEmbed.addField('trumptweet', '`Tweet as Trump`');
                            funEmbed.addField('lolice', '`Be the Lolice chief`');
                            funEmbed.addField('kannagen', '``Let kanna write on an paper`');
                            funEmbed.addField('happy', '`Say if you happy`');
                            funEmbed.addField('cry', '`Say if you sad and want to cry`');
                            funEmbed.addField('nom', '`You want to eat an user?`');
                            funEmbed.addField('bite', '`You want to bite an user?`');
                            funEmbed.addField('cat', '`Random cat picture` :x: **Disabled**');
                            funEmbed.setFooter(msg.author.tag, msg.author.avatarURL({format: "png"}));
                            message.edit(funEmbed);
                            r.users.remove(msg.author.id);
                        });

                        back.on('collect', r => {
                            message.edit(embed);
                            r.users.remove(msg.author.id);
                        });
                    });
 */

exports.info = {
    name: 'help',
    aliases: ['h', 'hilfe'],
    cooldown: 2.5
};