import { Command, msToRelativeTime } from "../Deps";

export default new Command("How long the bot has been on", "uptime", (m, a) => {
    let uptime = a.client.uptime;
    let uptime_r = `${msToRelativeTime(uptime!)} ago`;
    m.channel.send(`Uptime: ${uptime_r}`);
})