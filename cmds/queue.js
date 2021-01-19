exports.run = async (client, msg, args) => {
    //If the member is not in a voice channel
    if(!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel`);
    //Get queue
    const queue = client.player.getQueue(msg.guild.id);

    //If there's no music
    if(!queue) return msg.channel.send(`No songs currently playing`);

    //Message
    await msg.channel.send(`**Server queue**\nCurrent - ${queue.playing.name} | ${queue.playing.author}\n` +
        (
            queue.tracks.map((track, i) => {
                return `#${i + 1} - ${track.name} | ${track.author}`
            }).join('\n')
        ));
};

exports.info = {
    name: 'queue',
    aliases: [],
    cooldown:2.5
};