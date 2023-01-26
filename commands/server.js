const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { ownerName, Footer } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
	const ServerEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('**Server Information**')
	.setAuthor({ name: `${interaction.guild.name}`})
  //.setThumbnail(`${interaction.guild.iconURL}`)
	.addFields(
	  //{ name: '**Server Owner:**', value: `${interaction.guild.owner}`},
		{ name: '**Server Member Count:**', value: `${interaction.guild.memberCount}`, },
		{ name: '**Server Creation:**', value: `${interaction.guild.createdAt}`,},
		{ name: '**Server ID**', value: `${interaction.guild.id}`,},
	  //{ name: '**Server AFK Channel**', value: `${interaction.guild.afkChannel}` || "No afk channel."}, NW
	  //{ name: '**Server AFK Channel**', value: `${afkchannel}`}, NW
		{ name: '**Server AFK Timeout**', value: `${interaction.guild.afkTimeout}`},
	  //{ name: '**Server System Channel**', value: `${interaction.guild.systemChannel}` || "No system channel."}, NW
	  //{ name: '**You Joined This Guild At**', value: `${interaction.GuildMemberManage.joinedAt}`}, NW
	  //{ name: '**Server Verification Level', value: `${interaction.guild.verificationlevel}`}, NW
	)
	.setTimestamp()
	.setFooter({ text: `${Footer + ownerName}`
	});
		await interaction.reply({ embeds: [ServerEmbed] });
	},
};

