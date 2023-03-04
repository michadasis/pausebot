const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require('discord.js');
const fs = require("fs");
const mc = require("minecraft-server-status-simple");
const { ownerName, footer } = require('../config.json');
const imagesrv = new AttachmentBuilder('../pausebot/commands/image.png'); //change according to yours
const exampleEmbed = (
    online,
    playersonline,
    playersmax,
    ip,
    hostname,
    version1,
    author,
    motd,
)  =>
    new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({ name:`Hello, ${author}`})
        .setTitle(`${hostname}`)
        .addFields(
            { name: `IP:`, value: `${ip}`},
            { name: `Version:`, value: `${version1}`},
            { name: `Online?`, value: `${online}`},
            { name: `Player count:`, value: `${playersonline}`},
            { name: `Max player count:`, value: `${playersmax}`},
            { name: `Message of the day (MOTD)`, value: `${motd}`},
        )
        .setThumbnail('attachment://image.png')
        .setTimestamp()
        .setFooter({ text: `${footer}${ownerName}`})


module.exports = {
    data: new SlashCommandBuilder()
	.setName('mc')
	.setDescription("Replies with a java minecraft servers information")
	.addStringOption(option =>
	    option
        .setName('ip')
	    .setDescription('IP address of the minecraft server')
        .setRequired(true))
    .addIntegerOption(option => 
        option
        .setName('port')
        .setDescription('Port of server (Default: 25565)')),

    async execute(interaction) {
        const ippre = interaction.options.getString('ip');
        const port = interaction.options.getInteger('port')?? 25565;
        mc.statusJava({ip: ippre, port: port, show: [
        "online",
        "players",
        "ip",
        "hostname",
        "version",
        "motd",
        "icon"
    ] }).then(res => {
        //console.log(res) //used only for debugging
            let apiData = res;
            let online = apiData.online;
            let playersonline = apiData.players.online;
            let playersmax = apiData.players.max;
            let ip = apiData.ip;
            let hostname = apiData.hostname;
            let version1 = apiData.version;
            let motd = apiData.motd.clean;
            let icon = apiData.icon;
            let author = interaction.user.username;
            var imageString = icon;
            var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
            fs.writeFile("./commands/image.png", base64Data, 'base64', function(err) {
                if (err === null) return
                console.log(err);
              });
            interaction.reply({ embeds: [exampleEmbed(
                online,
                playersonline,
                playersmax,
                ip,
                hostname,
                version1,
                author,
                motd,
                base64Data
                )],  files: [imagesrv]  });
          }).catch(err => {
            console.log(err)})
        },
};