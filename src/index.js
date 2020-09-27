require('dotenv/config')
const Discord = require("discord.js");
const client = new Discord.Client(); 

const muteAction = require('./actions/voice/mute');
const config = {
    "prefix": "!",
    "token": process.env.TOKEN
 }

client.on("ready", () => {
  console.log(`Bot foi iniciado, ${client.user.tag} com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
});

client.on("message", async message => {
    const { channel } = message.channel;
    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);

    if(message.author.bot) return;
    if(channel=== "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "mute" || command ===  "m") {
        muteAction(permissions, voiceChannel, message, true);
    }
    if(command === "unmute" || command === "um") {
        muteAction(permissions, voiceChannel, message, false);
    }
});

client.login(config.token);

// https://discord.com/oauth2/authorize?client_id=759594769079992370&scope=bot&permissions=4197440