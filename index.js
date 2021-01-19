const discord = require('discord.js');
const fs = require('fs');
//const db = require('quick.db');
const { GiveawaysManager } = require("discord-giveaways");
const {Player} = require('discord-player');
const {NekoBot} = require('nekobot-api');
const sql = require('sqlite');
const Nekos = require('nekos.life');
const {CanvasSenpai} = require('canvas-senpai');
const fetch = require("node-fetch");
const axios = require('axios');
const inviteBlocker = require("./extras/inviteBlocker");
const guilds = JSON.parse(fs.readFileSync('./data/guilds.json', 'utf8'));
const hum = require('humanize-number');

const client = new discord.Client();
const cmds = client.commands = new discord.Collection();
const aliases = client.aliases = new discord.Collection();
// const dblapi = new dbleu.Client();
client.player = new Player(client);
client.nekobot = new NekoBot();
client.nekos = new Nekos();
client.senpai = new CanvasSenpai();
client.settings = require('./config.json');
client.db = require('./extras/db');
/*dblapi.login("", "");
dblapi.on("ready", () => {
    console.log("[DBL.eu] API Logged in.");
    // setTimeout(() => dblapi.autoPost(client), 20e3)  ;
});

dblapi.on('vote', async vote => {
    const votehook = new discord.WebhookClient("","");
    await votehook.send(new discord.MessageEmbed().setAuthor(client.user.username, client.user.avatarURL({format: "png"})).setTitle("Nezo was voted").setURL(dblapi.url).addField("Username", vote.user.name, true).addField("ID", vote.user.id, true))
})*/


client.on('ready', async () => {
    console.log('Online \n' +
        'Server: ' + client.guilds.cache.size + '\n' +
        'Users: ' + client.users.cache.size);
    setInterval(() => {
        setPresence(client)
    }, 15e3);
	await axios.post(``, {guilds: client.guilds.cache.size, users: client.users.cache.size}, {
        headers: {Authorization: ""}
		}).then(res => {console.log(`[Status: Post] Stats on posted to discordbotlist.com. Code: ${res.status}`)}).catch(err => {console.error(err)});
    setInterval(() => {
		axios.post(`https://discordbotlist.com/api/v1/bots/${client.user.id}/stats`, {guilds: client.guilds.cache.size, users: client.users.cache.size}, {
        headers: {Authorization: ""}
		}).then(res => {console.log(`[Status: Post] Stats on posted to discordbotlist.com. Code: ${res.status}`)}).catch(err => {console.error(err)});
	}, 50e3);
});

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaway.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FFFFFF",
        reaction: "🎉",
        hostedBy: true
    }
});

// We now have a client.giveawaysManager property to manage our giveaways!
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} nimmt am giveaway #${giveaway.messageID} (${reaction.emoji.name}) teil`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} nimmt nicht mehr giveaway #${giveaway.messageID} (${reaction.emoji.name}) teil`);
});

// Handler

fs.readdir('./cmds', (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return true;
        const cmd = require(`./cmds/${file}`);
        if (!cmd.info) return console.log(`[CommandHandler] Konnte ${file.split('.')[0]} nicht laden da exports.info fehlt.`);
        cmd.info.name = file.split(".")[0];
        cmds.set(cmd.info.name, cmd);
        if (cmd.info.aliases)
            cmd.info.aliases.forEach(a => aliases.set(a, cmd));
        console.log(`[CommandHandler] Der ${file.split('.')[0]}-Command wurde geladen.`);
    });
    client.cmds = files.length;
});

fs.readdir('./events',(err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return true;
        const event = require(`./events/${file}`);
		delete require.cache[require.resolve(`./events/${file}`)];
        client.on(file.split('.')[0], event.bind(null, client));
        console.log(`[EventHandler] Das ${file.split('.')[0]}-Event wurde geladen.`);
    });
});

async function setPresence(client) {
    const statuses = [
        `on ${hum(client.guilds.cache.size)} Servers|||PLAYING`,
        "with Wummy|||PLAYING",
        "Anime openings on Spotify|||LISTENING",
        "Netflix with Wummy|||WATCHING",
        `with ${hum(client.cmds)} Commands|||PLAYING`,
        "Ping me for prefix|||PLAYING"
    ];
    const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
    const type = statuses[index].split('|||')[1];
    const name = statuses[index].split("|||")[0].replace("$SERVERS", hum(client.guilds.cache.size)).replace("$COMMANDS", hum(client.cmds));
    await client.user.setPresence({
        activity: {
            name: name + ' | n!help',
            type: type
        }, status: "idle"
    })
}

sql.open('./db/mainDB.sqlite').then(r => console.log('DB Geladen'));
client.sql = sql;

client.login('').then(r => console.log('Login erfolgreich'));