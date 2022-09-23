import { Client, Message } from "discord.js-selfbot-v13";
import { blacklist, prefix } from "../config";
import { Command, Log } from "../Deps";
import { admin } from "../config";
export default function messageEvent(
    message: Message,
    client: Client,
    Commands: Command[] 
) {
    const cargs = {
        client,
        message,
        Commands,
    };
    if (
        message.author.bot ||
        message.author.id == client.user!.id ||
        !message.content.startsWith(prefix) ||
        blacklist.includes(message.author.id)
    )
        return;
    const messageSplit = message.content.split(" ");

    Commands.forEach((command) => {
        if (command.usage == messageSplit[0].slice(prefix.length))
            if (
                command.properties?.AdminOnly
                    ? admin.includes(message.author.id)
                    : true
            )
                command.cmd_function(message, cargs);
    });

    Log(`${message.author.username}: ${message.content}`);
}
