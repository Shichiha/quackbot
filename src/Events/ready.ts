import { Client } from "discord.js-selfbot-v13";
import { activities, Log } from "../Deps";

export default function readyEvent(client: Client) {
    Log(`Serving ${client.channels.cache.size} channels as ${client.user!.tag}`)
    setInterval(() => {
        client.user!.setActivity(activities[Math.floor(Math.random() * (activities.length))]);
    }, 5000);
}