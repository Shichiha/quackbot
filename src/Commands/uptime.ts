import { Command } from "../Dependencies";

export default new Command("How long the bot has been on", "uptime", (m, a) => {
    let now = new Date();
    let uptime = a.client.uptime!;
    let seconds = uptime / 1000;
    let iso = now.valueOf();
    let unix = Math.round((iso / 1000) - seconds);
    m.channel.send(`Uptime: <t:${unix}:R>`);
})