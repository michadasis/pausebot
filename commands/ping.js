const { SlashCommandBuilder } = require('discord.js');
const { ownerName, footer } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Hoold on!')
		await interaction.editReply(`**Pong!**\nMessage edit time is ` + (interaction.createdTimestamp - interaction.createdTimestamp) + `ms, Discord API heartbeat is ` + interaction.client.ws.ping + `ms.`)			
	},
};