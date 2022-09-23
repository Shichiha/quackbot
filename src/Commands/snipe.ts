import { Command, Log, SendMessage } from "../Deps";
import { lastMessage } from "../Services/Sniper";

export default new Command(
    "snipes the last deleted message",
    "snipe",
    (m, a) => {
        if (lastMessage)
            {SendMessage(
                `<t:${Math.round(lastMessage.createdAt.valueOf()/1000)}:R> ${
                    lastMessage.author.tag
                }: ${lastMessage.content}`,
                m
            );}
        else SendMessage(":#", m);
    }
);
