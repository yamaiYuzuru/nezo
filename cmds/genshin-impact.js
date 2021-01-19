const {readFileSync} = require('fs');
const guilds = JSON.parse(readFileSync('./data/guilds.json', "utf8"));
const {characters} = require('genshin-impact-api');
const {MessageEmbed} = require('discord.js');
module.exports = {
    run: async (client, msg, args) => {
        if (guilds[msg.guild.id].english === true) {
            if (!args[0]) return msg.channel.send(new MessageEmbed().setDescription('Please give me Genshin Impact Character\n' +
                'Amber, Babara, Beidou, Bennett, Chungyun, Diluc, Fischl, Jean, Kaeya, Keqing, Lisa, Mona, Ningguang, Noelle, Qiqi, Razor, Sucrose, traveler, Venti, Xiangling, Xingqiu'));
        } else {
            if (!args[0]) return msg.channel.send(new MessageEmbed().setDescription('Gebe mir einen Genshin Impact Charakter\n' +
                'Amber, Babara, Beidou, Bennett, Chungyun, Diluc, Fischl, Jean, Kaeya, Keqing, Lisa, Mona, Ningguang, Noelle, Qiqi, Razor, Sucrose, traveler, Venti, Xiangling, Xingqiu'))
        }
        const char = characters(args[0]);
        await msg.channel.send(new MessageEmbed().addField("Name", char.name, true).addField("Title", char.title, true).addField("Vision", char.vision, true).addField("Weapon", char.weapon, true).addField("Gender", char.gender, true).addField("Nation", char.nation, true).addField("Birthday", char.birthday).addField("Description", char.description, true).setImage(char.image))
    },
    info: {
        aliases: ['gi', 'genshin'],
        usage: "genshin-impact <Character>"
    }
};