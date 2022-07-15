const Discord = require("discord.js-selfbot-v13");
const { token } = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);