const Discord = require("discord.js-selfbot-v13");
const { token } = require("./config.json");
const { msToRelativeTime }  = require("./helper.js");

const client = new Discord.Client({
  checkUpdate: false,
});

const activities_list = ["dying", "suffocating", "in the cement"];

client.on("ready", () => {
  console.log("Bot is online!");
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 5000);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf("!ping") === 0) {
    message.channel.send("Pong!");
  }
  if (message.content.indexOf("!uptime") === 0) {
    let uptime = client.uptime;
    let uptime_r = msToRelativeTime(uptime); // Relative Time
    message.channel.send(`Uptime: ${uptime_r}`);
  }
  console.log(`${message.author.username}: ${message.content}`);
});

client.login(token);
