module.exports = async (client, msg) => {
    const fs = require('fs');
    const Discord = require('discord.js');
    const talkedRecently = new Set();
    const sql = client.sql;
    const levelerCore = require("../extras/levelSystem");
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', 'utf8'));
    const inviteBlocker = require('../extras/inviteBlocker');

	if (!msg.guild) return true;

    if (!guilds[msg.guild.id]) guilds[msg.guild.id] = {
        english: true,
        prefix: "n!",
        levelupMessage: false,
        inviteBlocker: false
    };

    fs.writeFileSync('./data/guilds.json', JSON.stringify(guilds));

    /*if (guilds[msg.guild.id].inviteBlocker === true) {
        await inviteBlocker.inviteBlocker(client, msg, sql, Discord, guilds);
    }*/

    if (msg.author.bot) return true;

    if (msg.channel.id === client.db.getServer(msg.guild.id, "globalchat")) {
        if (client.db.getUser(msg.author.id, "globalchat.mute")) return true;
        let channels = [];
        client.db.getDB().get("servers")
            .reject({globalchat: undefined})
            .value()
            .map(server => {
                const channel = client.channels.cache.get(server.globalchat);
                if (channel) channels.push(channel);
            });
        const embed = new Discord.MessageEmbed();
        if (msg.author.avatarURL({format: "gif"})) {
            embed.setAuthor(msg.author.tag, msg.author.avatarURL({format: "gif"}));
        } else {
            embed.setAuthor(msg.author.tag, msg.author.avatarURL());
        }
        embed.setDescription(msg.content.replace(new RegExp(/[A-Za-z]+\/\/[A-Za-z0-9\-_]+\.A-Za-z0-9-_:%&;\?#\/.=]+/, "g"), "**[LINK]**"));
        embed.setFooter(msg.guild.name + " | " + msg.guild.id + " | " + msg.author.id, msg.guild.iconURL);
        if (client.settings.admins.includes(msg.author.id)) embed.setDescription(msg.content).setColor("RED");
        channels.map((c) => {
            c.send(embed);
            msg.delete().catch(()=>{});
            if (!c.topic) {
                if (guilds[msg.guild.id].english === true) {
                    c.setTopic('Global Chat Rules: \n1. Be friendly \n2. Don\'t spam \n3. No commands \nInfo: Links (Invite links yt/instagram/facebook/twitter) are blocked');
                } else {
                    c.setTopic("Global Chat Regeln: \n1. Sei freundlich \n2. Kein spammen \n3. Keine commands\nInfo: Links (Invite links yt/instagram/facebook/twitter) sind geblockt")
                }
            }
        });
    }

    const mentioned = msg.mentions.members.find(u => u.id === client.user.id);

    if (mentioned) {
        if (guilds[msg.guild.id].english === true) {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`My prefix on this guild is ${guilds[msg.guild.id].prefix}`);
            await msg.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`Mein prefix auf diesem server ist ${guilds[msg.guild.id].prefix}`);
            await msg.channel.send(embed)
        }
    }

    client.sql.all(`SELECT roleName FROM bListRoles WHERE guildID=${msg.guild.id}`).then((rCheck)=>{
        const blRoles = rCheck.map((g)=>g.roleName);
        if(msg.member.roles.cache.some(r=>blRoles.includes(r.name)) || msg.guild.id === "264445053596991498" || msg.guild.id === "110373943822540800" || msg.channel.id === "771783412364345364") {
            return true;
        }else{
            if (talkedRecently.has(msg.author.id)) {
                return true;
            }else{
                levelerCore.scoreSystem(client, msg, sql, Discord);
                talkedRecently.add(msg.author.id);
                setTimeout(() => {
                    // Removes the user from the set after 2.5 seconds
                    talkedRecently.delete(msg.author.id);
                }, 25e3);
            }
        }
    });

    if (guilds[msg.guild.id].english === true) {
        if (client.db.getUser(msg.author.id, "bot-banned")) return msg.channel.send(new Discord.MessageEmbed().setTitle('BANNED').setDescription('Sorry, but you can\'t use commands because you was banned from the bot. \nYou can be unbanned if you sent a un-ban request on the support-server').setAuthor(msg.author.tag, msg.author.avatarURL()));
    } else {
        if (client.db.getUser(msg.author.id, "bot-banned")) return msg.channel.send(new Discord.MessageEmbed().setTitle('GEBANNT').setDescription('Sorry, aber du wurdest vom bot verbannt und kannst somit keine commands mehr ausführen. \nWenn du entbannt werden möchtest musst du eine anfrage auf dem support-server stellen.').setAuthor(msg.author.tag, msg.author.avatarURL()));
    }

    if (!msg.content.toLocaleLowerCase().startsWith(guilds[msg.guild.id].prefix)) return true;

    const args = msg.content.slice(guilds[msg.guild.id].prefix.length).trim().split(' ');
    const command = args.shift().toLocaleLowerCase();
    let cmd = client.commands.get(command) || client.aliases.get(command);

    if (!cmd) return true;

    await cmd.run(client, msg, args);
};