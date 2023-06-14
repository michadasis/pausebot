const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { ownerName, footer } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help command'),
	async execute(interaction) {
		
		const embed = new EmbedBuilder()
		.setColor("Blue")
		.setTitle("Help center")
		.setDescription("All commands and their functions.")
		.addFields({name: "/8ball", value: "Ask a question and get an answer."})
		.addFields({name: "/echo", value: "Echos your message."})
		.addFields({name: "/mc", value: "Displays information about a minecraft java server."})
		.addFields({name: "/pingtimer", value: "Replies to your command after a bit of time."})
		.addFields({name: "/pp", value: "Displays the size of your weiner"})
		.addFields({name: "/secretping", value: "A ping only you can see."})
		//Code markdown discriminator
		.addFields({name: "/help", value: "This."})
		.addFields({name: "/ping", value: "Replies to your message + calculates your ping."})
		.addFields({name: "/server", value: "Displays information about the current server."})
		.addFields({name: "/user", value: "Displays information about you/any user."})
		.addFields({name: "/weather", value: "Displays the weather of a country/state"})
		.setFooter({text: `${footer + ownerName}`})
		.setTimestamp()


		const message = await interaction.reply({embeds: [embed]});
		
	},
};