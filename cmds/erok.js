exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    if (!msg.channel.nsfw) return msg.react("🔞");
    const snek = require('snekfetch');
    snek.get('https://nekos.life/api/v2/img/erok').end((err, res) => {
        msg.channel.send(new dc.MessageEmbed({title: "Hentai - Erok", url: res.body.url}).setImage(res.body.url));
    })

};

exports.info = {

}