const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ownerName, Footer } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const UserEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(`${"**" +interaction.user.username + "#" + interaction.user.discriminator + "**"}`)
  //.setThumbnail(`${interaction.user.iconURL}`) NW
	.addFields(
		{ name: '**Username**', value: `${interaction.user.username}`},
		{ name: '**Discrimination**', value: `${interaction.user.discriminator}`},
		{ name: '**ID**', value: `${interaction.user.id}`},
		{ name: '**Account Creation**', value: `${interaction.user.createdAt}`},
		{ name: '**Joined Guild At**', value: `${interaction.member.joinedAt}`},
	)
	.setTimestamp()
	.setFooter({ text: `${Footer + ownerName}`
	});
		await interaction.reply({ embeds: [UserEmbed] });
	},
};