exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    const fs = require('fs');
    const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
    const errEmbed = new dc.MessageEmbed();
    const embed = new dc.MessageEmbed();
    if (guilds[msg.guild.id].english === true) {
        if (!msg.channel.nsfw) return msg.channel.send(errEmbed.setTitle('Uhm...').setDescription("You can't use this command here.\nTry it in a nsfw channel again."));
        embed.setTitle("NSFW Commands");
        embed.setDescription("`blowjob`, `boobs`, `classic`,\n`cum`, `erofeet`, `erok`,\n`eroyuri`, `femdom`, `futa`,\n`hentai`,`hgif`, `lewd`,\n`neko`, `ngif`, `trap`,\n`yuri`, `ero`, `keta`\n `furry`, `gelbooru`, `holoro`\n`konachan`, `pussy`, `r34`\n`real`, `safebooru`, `smallboobs`\n`solo`, `tis`, `xbooru`\n `yandre`, `yaoi`");
        await msg.channel.send(embed);
    } else {
        if (!msg.channel.nsfw) return msg.channel.send(errEmbed.setTitle('Uhm...').setDescription("Du kannst diesen command nicht hier benutzen.\nVersuche es in einem NSFW Kanal"));
        embed.setTitle("NSFW Befehle");
        embed.setDescription("`blowjob`, `boobs`, `classic`,\n`cum`, `erofeet`, `erok`,\n`eroyuri`, `femdom`, `futa`,\n`hentai`,`hgif`, `lewd`,\n`neko`, `ngif`, `trap`,\n`yuri`, `ero`, `keta`\n `furry`, `gelbooru`, `holoro`\n`konachan`,`pussy`, `r34`\n`real`, `safebooru`, `smallboobs`\n`solo`, `tis`, `xbooru`\n `yandre`, `yaoi`");
        await msg.channel.send(embed);
    }
};

exports.info = {
    cooldown:2.5
}