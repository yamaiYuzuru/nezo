exports.run = async (client, msg, args) => {
    //If the member is not in a voice channel
    if(!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel`);

    //If there's no music
    if(!client.player.isPlaying(msg.guild.id)) return msg.channel.send(`No music playing on this server`);

    //Stop player
    await client.player.stop(msg.guild.id);

    //Message
    await msg.channel.send(`Music stopped`);
};

exports.info = {
    name: 'stop',
    aliases: [],
    cooldown:2.5
};