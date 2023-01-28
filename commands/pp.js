const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let pps = [
    "8D",
    "8=D",
    "8==D",
    "8===D",
    "8====D",
    "8=====D",
    "8======D",
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D'
    ]


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pp')
		.setDescription('"How big is your slong?"')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Specific users pp size')),
	async execute(interaction) {
        const user = interaction.options.getUser('user')?? `${interaction.user.username}`;
        let pp = pps[Math.floor(Math.random() * pps.length)]
        const ppEmbed = new EmbedBuilder()
        .setTitle(`peepee size machine`)
        .setDescription(`${user}'s penis ${pp}`)
        .setColor(0x0099FF)
		await interaction.reply({ embeds: [ppEmbed] });
	},
};