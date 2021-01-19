module.exports.inviteBlocker = async function(client, msg, sql, Discord, guilds) {
    sql.get(`SELECT * FROM inviteChannels WHERE guildID = '${msg.guild.id}'`).then(i1 => {
        sql.get(`SELECT * FROM inviteRoles WHERE guildID = '${msg.guild.id}'`).then(i2 => {
            sql.get(`SELECT * FROM inviteUsers WHERE guildID = '${msg.guild.id}'`).then(i3 => {
                if (!i1) {
                    sql.run(`INSERT INTO inviteChannels (guildID, channelID, channelName) VALUES (?, ?, ?)`, [msg.guild.id, "", ""]);
                } else if(!i2) {
                    sql.run(`INSERT INTO inviteRoles (guildID, roleID, roleName) VALUES (?, ?, ?)`, [msg.guild.id, "", ""])
                } else if (!i3) {
                    sql.run(`INSERT INTO inviteUsers (guildID, userID, username) VALUES (?, ?, ?)`, [msg.guild.id, "", ""]);
                } else {
                    const channel = msg.guild.channels.cache.find(ch => ch.id === i1.channelID);
                    const user = msg.guild.member(client.users.cache.get(i3.userID));
                    const role = msg.guild.roles.cache.find(role =>  role.id === i2.roleID);

                    if (!channel || !user || !role) {
                        if (msg.content.includes("discord.gg/")) {
                            msg.delete().then(() => {
                                if (guilds[msg.guild.id].english === true) {
                                    msg.channel.send(new Discord.MessageEmbed().setTitle('No!').setDescription('You can\'t send here invites, ' + msg.author.tag));
                                } else {
                                    msg.channel.send(new Discord.MessageEmbed().setTitle('Nope!').setDescription('Du kannst hier keine invites senden, ' + msg.author.tag))
                                }
                            })
                        }
                        if (msg.content.includes("discord.com/invite/")) {
                            msg.delete().then(() => {
                                if (guilds[msg.guild.id].english === true) {
                                    msg.channel.send(new Discord.MessageEmbed().setTitle('No!').setDescription('You can\'t send here invites, ' + msg.author.tag));
                                } else {
                                    msg.channel.send(new Discord.MessageEmbed().setTitle('Nope!').setDescription('Du kannst hier keine invites senden, ' + msg.author.tag))
                                }
                            });
                        }
                    }
                }
            })
        });
    });
};