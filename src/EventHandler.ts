import { Client } from "discord.js-selfbot-v13";
import { Commands } from "./CommandHandler";
import messageCreate from "./Events/messageCreate";
import ready from "./Events/ready";
export default function setupEvents(client: Client) {
    client.on('ready',(e)=>{ready(e)})
    client.on('messageCreate',(e)=>{messageCreate(e,client,Commands)})
}