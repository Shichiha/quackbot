import Discord from "discord.js-selfbot-v13";
import fs from "fs";
import { token } from "./Dependencies";
import setupEvents from "./EventHandler";
if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
const client = new Discord.Client({ checkUpdate: false });
setupEvents(client);
client.login(token);
