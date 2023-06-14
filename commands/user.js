const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ownerName, footer } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('the target of info gathering')),
	async execute(interaction) {
		const userman = interaction.options.getUser('user')?? interaction.user;
		const UserEmbed1 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`${"**" + userman.username + "#" + userman.discriminator + "**"}`)
  		  //.setThumbnail(`${interaction.user.iconURL}`) NW
			.addFields(
		{ name: '**Username**', value: `${userman.username}`},
		{ name: '**Discrimination**', value: `${userman.discriminator}`},
		{ name: '**ID**', value: `${userman.id}`},
		{ name: '**Account Creation**', value: `${userman.createdAt}`},
		//{ name: '**Joined Guild At**', value: `${userman.member.joinedAt}`},
					  )
			.setTimestamp()
			.setFooter({ text: `${footer + ownerName}`});
	await interaction.reply({ embeds: [UserEmbed1] });
	},
};