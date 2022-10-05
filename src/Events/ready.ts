import { Client, Options } from "discord.js-selfbot-v13";
import { activities, Log, prefix } from "../Dependencies";

export default function readyEvent(client: Client) {
    Log(
        `Serving ${client.channels.cache.size} channels as ${
            client.user!.tag
        } with the prefix "${prefix}"`
    );
    setInterval(() => {
        client.user!.setActivity(
            activities[Math.floor(Math.random() * activities.length)]
        );
    }, 5000);
}
