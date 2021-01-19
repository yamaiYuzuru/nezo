module.exports.leaderboardEmbed = async function(client, msg, sql, Discord) {
    const {readFileSync} = require('fs');
    const guilds = JSON.parse(readFileSync('./data/guilds.json', "utf-8"));

    sql.all(`SELECT username, globalPoints, nextPL from userScores WHERE guildID='${msg.guild.id}' ORDER BY globalPoints DESC LIMIT 10`).then(gLeader =>{
        if(!gLeader[0]){
            client.leadOut = "Sorry there is no leaderboards yet. Start chatting!";
        }else{
            const lUser = gLeader.map(z => z.username);
            const lPoints = gLeader.map(y => y.globalPoints);
            const lNextP = gLeader.map(x => x.nextPL);

            const leadOutp = lUser.map(function(a,b){
                let s = b + 1;
                return[s + '. ' + a + ' ' + lPoints[b] + '/' + lNextP[b]];
            });
            client.leadOut = leadOutp.join("\n");
        }
        const embed = new Discord.MessageEmbed()
            .setColor(0x00AE86);
        if (guilds[msg.guild.id].english === true) {
            embed.addField(`Leaderboard for **${msg.guild.name}**`, `${client.leadOut}`, true);
            if (msg.guild.iconURL({format: "gif"})) {
                embed.setThumbnail(msg.guild.iconURL({format: "gif"}));
            } else {
                embed.setThumbnail(msg.guild.iconURL());
            }
            if (msg.author.avatarURL({format: "gif"})) {
                embed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}))
            } else {
                embed.setFooter(msg.author.tag, msg.author.avatarURL())
            }
        } else {
            embed.addField(`Leaderboard für **${msg.guild.name}**`, `${client.leadOut}`, true);
            if (msg.guild.iconURL({format: "gif"})) {
                embed.setThumbnail(msg.guild.iconURL({format: "gif"}));
            } else {
                embed.setThumbnail(msg.guild.iconURL());
            }
            if (msg.author.avatarURL({format: "gif"})) {
                embed.setFooter(msg.author.tag, msg.author.avatarURL({format: "gif"}))
            } else {
                embed.setFooter(msg.author.tag, msg.author.avatarURL())
            }
        }
        msg.channel.send({embed: embed});
    });
};