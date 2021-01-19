module.exports = async (client, guild) => {
    const {WebhookClient, MessageEmbed} = require('discord.js');
    //https://discordapp.com/api/webhooks/771760388713873418/2xOZWW-_3fuLfEHlD-cmTfs-RfR-7dA1sxtOovTvAJlqZB_wN31O7S9NjndhwpD--ikC
    const hook = new WebhookClient("776561096164376596", "TvWOxEfJnXYoSfE1lsgoBDyq3ZbAQAGMKazgc0N5t_jmcCFyVPkv4UnL8Pt5fHb1V-Cm");
    await hook.send(new MessageEmbed().setTitle("Nezo was added to a new server").setDescription(`Guild Name: ${guild.name}\nGuild Owner: ${guild.owner.displayName}#${guild.owner.discriminator}\nGuild ID: ${guild.id}\nGuild Membercount: ${guild.memberCount}`).setFooter(`Nezo is now on ${client.guilds.cache.size} guilds.`));
};