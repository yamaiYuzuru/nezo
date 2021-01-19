exports.run = async (client, msg, args) => {
    //If the member is not in a voice channel
    if(!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel`);

    //If there's no music
    if(!client.player.isPlaying(msg.guild.id)) return msg.channel.send(`No music playing on this server`);

    const track = await client.player.skip(msg.guild.id);

    //Message
    await msg.channel.send(`Song ${track.name} skipped`);
};

exports.info = {
    name: 'skip',
    cooldown:2.5
};