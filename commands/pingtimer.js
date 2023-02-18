const { SlashCommandBuilder } = require('discord.js');
const { ownerName, footer } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pingtimer')
		.setDescription('Pong but 2x after 200ms'),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;

		await interaction.reply('Pong!');
		await wait(2000);
		await interaction.editReply('Pong again!');
	},
};
