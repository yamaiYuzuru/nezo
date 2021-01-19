exports.run = async (client, msg, args) => {
    if(!msg.member.voice.channel) return msg.channel.send(`Du bist nicht in einem Sprachkanal`);

    //If there's no music
    if(!client.player.isPlaying(msg.guild.id)) return msg.channel.send(`Auf diesem server wird keine Musik abgespielt`);

    //Repeat mode
    const repeatMode = client.player.getQueue(msg.guild.id).repeatMode;

    //If the mode is enabled
    if(repeatMode) {

        await client.player.setRepeatMode(msg.guild.id, false);

        //Message
        return msg.channel.send(`loop deaktiviert`);

        //If the mode is disabled
    } else {

        await client.player.setRepeatMode(msg.guild.id, true);

        //Message
        return msg.channel.send(`loop aktiviert`);

    }
};

exports.info = {
    name: 'loop',
    aliases: [],
    cooldown:2.5
};