const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { ownerName, footer } = require('../config.json')
const axios = require('axios')
require('dotenv').config()
const apikey = process.env.APIKEY
const exampleEmbed = (
	temp,
	maxTemp,
	minTemp,
	pressure,
	humidity,
	wind,
	cloudness,
	icon,
	author,
	profile,
	cityName,
	country,
    modcurrenttemp,
    modmaxtemp,
    modmintemp
) =>
	new EmbedBuilder()
		.setColor('#0099ff')
        .setAuthor({ name:`Hello, ${author}`})
		.setTitle(`There is ${temp}\u00B0C in ${cityName}, ${country}`)
        .addFields(
            { name: `Maximum Temperature:`, value: `${maxTemp}\u00B0C`},
            { name: `Minimum Temperature:`, value: `${minTemp}\u00B0C`},
            { name: `Currect Temparature in Kelvin:`, value: `${modcurrenttemp}°K`},
            { name: `Maximum Temparature in Kelvin:`, value: `${modmaxtemp}°K`},
            { name: `Minimum Temparature in Kelvin:`, value: `${modmintemp}°K`},
            { name: `Humidity:`, value: `${humidity} %`, inline: true},
            { name: `Wind Speed:`, value: `${wind} m/s`, inline: true},
            { name: `Pressure:`, value: `${pressure} hpa`, inline: true},
            { name: `Cloudiness:`, value: `${cloudness}`, inline: true},
        )
		.setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
        .setTimestamp()
	    .setFooter({ text: `${footer}${ownerName}`})

module.exports = {
    data: new SlashCommandBuilder()
	.setName('weather')
	.setDescription('provides weather info for specific country/city')
	.addStringOption(option =>
	    option
        .setName('input')
	    .setDescription('Country/State/City')
        .setRequired(true)),

    async execute(interaction) {
        const args = interaction.options.getString('input');

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${apikey}`)
            .then(response => {
                let apiData = response;
                let currentTemp = Math.ceil(apiData.data.main.temp)
                let maxTemp = apiData.data.main.temp_max;
                let minTemp = apiData.data.main.temp_min;
                let humidity = apiData.data.main.humidity;
                let wind = apiData.data.wind.speed;
                let author = interaction.user.username
                let profile = interaction.user.displayAvatarURL
                let icon = apiData.data.weather[0].icon
                let cityName = args
                let country = apiData.data.sys.country
                let pressure = apiData.data.main.pressure;
                let cloudness = apiData.data.weather[0].description;
                let modcurrenttemppost = (currentTemp + 273.15)
                let modmaxtemppost = (maxTemp + 273.15)
                let modmintemppost = (minTemp + 273.15)
                let modcurrenttemp = modcurrenttemppost.toFixed(2)
                let modmaxtemp = modmaxtemppost.toFixed(2)
                let modmintemp = modmintemppost.toFixed(2)
                interaction.reply({ embeds: [exampleEmbed(
                    currentTemp,
                    maxTemp,
                    minTemp,
                    pressure,
                    humidity,
                    wind,
                    cloudness,
                    icon,
                    author,
                    profile,
                    cityName,
                    country,
                    modcurrenttemp,
                    modmaxtemp,
                    modmintemp
                    )] });
            }).catch(err => {
                console.log(err)
            })
        },
};
