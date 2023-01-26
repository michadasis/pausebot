const { SlashCommandBuilder, client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secretping')
		.setDescription('Pong but private'),
	async execute(interaction) {
        await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	},
};