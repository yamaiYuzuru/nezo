module.exports.profileEmbed = async function(client, msg, user, iUser, Discord) {
    /*const canvacord = require('canvacord');
    const rank = new canvacord.Rank().setAvatar(user.avatarURL({format: "png"})).setUsername(user.username).setLevel(iUser.uLevel).setBackground("IMAGE", "https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-fashion-atmosphere-black-gold-black-background-image_15563.jpg").setCurrentXP(iUser.globalPoints).setRequiredXP(iUser.nextPL).setDiscriminator(user.discriminator).setRank(iUser.globalRank).setProgressBar(['#0101DF', '#5858FA'], 'GRADIENT');
    if (user.presence.status === "dnd") {
        rank.setStatus("dnd", true, 5);
    } else if(user.presence.status === "idle") {
        rank.setStatus("idle", true, 5);
    } else if (user.presence.status === "online") {
        rank.setStatus("online", true, 5);
    } else if (user.presence.status === "offline") {
        rank.setStatus("offline", true, 5);
    } else if (user.presence.status === "streaming") {
        rank.setStatus('streaming', true, 5);
    }
    await rank.build({fontX: "Sans Bold", fontY: "Sans Bold"}).then(data => {
        msg.channel.send(new Discord.MessageAttachment(data, `rankcard_${msg.guild.id}_${iUser.userID}.jpg`));
    })*/
    const embed = new Discord.MessageEmbed();
    if (user.avatarURL({format: "gif"})) {
        embed.setTitle(user.tag).setThumbnail(user.avatarURL({format: "gif"}));
    } else {
        embed.setTitle(user.tag).setThumbnail(user.avatarURL({format: "png"}));
    }
    embed.setDescription(`Level: ${iUser.uLevel} \nXP: ${iUser.globalPoints}/${iUser.nextPL} \nRank: ${iUser.globalRank}`);
    await msg.channel.send(embed);
};