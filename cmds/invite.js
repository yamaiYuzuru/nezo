const {MessageEmbed} = require('discord.js');
const embed = new MessageEmbed();
const fs = require('fs');
const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', "utf8"));
exports.run = async (client, msg, args) => {
    if (guilds[msg.guild.id].english === true) {
        await msg.channel.send(embed.setDescription('[With administrator](https://discord.com/api/oauth2/authorize?client_id=756256019318833183&permissions=8&scope=bot)\n' +
            '[With needed permissions](https://discord.com/api/oauth2/authorize?client_id=756256019318833183&permissions=271903814&scope=bot)'));
    } else {
        await msg.channel.send(embed.setDescription('[Mit Administrator](https://discord.com/api/oauth2/authorize?client_id=756256019318833183&permissions=8&scope=bot)\n' +
            '[Mit benötigten rechten](https://discord.com/api/oauth2/authorize?client_id=756256019318833183&permissions=271903814&scope=bot)'));
    }
};

exports.info = {
    cooldown:2.5
}