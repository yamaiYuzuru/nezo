exports.run = async (client, msg, args) => {
    const dc = require('discord.js');
    if (!msg.channel.nsfw) return msg.react("🔞");
    const snek = require('snekfetch');
    /*snek.get('https://nekos.life/api/v2/img/Random_hentai_gif').end((err, res) => {
        msg.channel.send(new dc.MessageEmbed({title: "Hentai - Gif", url: res.body.url}).setImage(res.body.url));
    })*/
    const owo = client.nekos.nsfw.randomHentaiGif();
    await msg.channel.send(new dc.MessageEmbed({title: "Hentai - GIf"}).setImage((await owo).url).setURL((await owo).url));

};

exports.info = {
    cooldown:2.5
};