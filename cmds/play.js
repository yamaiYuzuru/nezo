exports.run = async (client, msg, args) => {
    //If the member is not in a voice channel
    if(!msg.member.voice.channel) return msg.channel.send(`Du bist nicht in einem Sprachkanal`);

    //If no music is provided
    if (!args[0]) return msg.channel.send(`Bitte gebe einen song ein`);

    const aTrackIsAlreadyPlaying = client.player.isPlaying(msg.guild.id);

    // If there's already a track playing
    if(aTrackIsAlreadyPlaying){

        // Add the track to the queue
        const result = await client.player.addToQueue(msg.guild.id, args[0]);
        if(!result) return msg.channel.send(`Dieser song-Anbieter wird nicht unterstützt...`);

        if(result.type === 'playlist'){
            await msg.channel.send(`${result.tracks.length} songs zur warteschleife hinzugefügt`);
        } else {
            await msg.channel.send(`${result.name} zur warteschleife hinzugefügt`);
        }

    } else {

        // Else, play the song
        const result = await client.player.play(msg.member.voice.channel, args.join(" "));
        if(!result) return msg.channel.send(`Dieser song-Anbieter wird nicht unterstützt...`);

        if(result.type === 'playlist'){
            await msg.channel.send(`${result.tracks.length} songs zur warteschleife hinzugefügt\nSpiele nun ${result.tracks[0].name} !`);
        } else {
            await msg.channel.send(`Spiele nun ${result.name}`);
        }

        const queue = client.player.getQueue(msg.guild.id).on('end', () => {
                msg.channel.send(`Keine songs in der`);
            }).on('trackChanged', (oldTrack, newTrack) => {
                msg.channel.send(`Nun spiele ich ${newTrack.name}`);
            }).on('channelEmpty', () => {
                msg.channel.send(`Stoppe die musik da niemand im voice ist`);
            });
    }
};

exports.info = {
    name: 'play',
    aliases: [],
    cooldown:2.5
};