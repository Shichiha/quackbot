import { Message } from "discord.js-selfbot-v13";
import { Service } from "../Dependencies";
export let lastMessage: Message | null = null;

export default new Service("Logs the last message in each guild", "messageDelete", (m) => {
    lastMessage = m;
})