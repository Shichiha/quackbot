import { Client, ClientEvents, Message } from "discord.js-selfbot-v13";
import { Commands } from "./CommandHandler";
import messageCreate from "./Events/messageCreate";
import ready from "./Events/ready";
import { Services } from "./ServiceHandler";
export default function setupEvents(client: Client) {
    client.on("ready", (e) => {
        ready(e);
    });
    client.on("messageCreate", (e) => {
        messageCreate(e, client, Commands);
    });

    Services.forEach((Service) => {
        client.on(Service.event as any, (e) => {
            Service.action(e);
        });
    });
}
