const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let eightballwords = [ 
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes – definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Replies with 8ball answers to an answer')
        .addStringOption(option =>
            option
            .setName('question')
            .setDescription('The input to echo back')),
	async execute(interaction) {
        const question = interaction.options.getString('question')?? 'No question asked';
        let eightballrandom = eightballwords[Math.floor(Math.random() * eightballwords.length)]
        const eightballEmbed = new EmbedBuilder()
        .setTitle(`8ball command`)
        .addFields(
            { name: '**Question:**', value: `${question}`},
            { name: '**Reply:**', value: `${eightballrandom}`},
        )
        .setColor(0x0099FF)
		await interaction.reply({ embeds: [eightballEmbed] });
	},
};