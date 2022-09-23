import { Client, ClientEvents, Message } from "discord.js-selfbot-v13";
import { activities, prefix, token } from "./config";
import { Log, LogError, msToRelativeTime, SendMessage } from "./Helper";
interface CommandProperties {
    AdminOnly?: boolean;
    ShowInHelp?: boolean;
}
interface CommonArguments {
    client: Client;
    message: Message;
    Commands: Command[];
}
class Command {
    description: string;
    usage: string;
    cmd_function: (message: Message, args: CommonArguments) => void;
    properties?: CommandProperties;
    constructor(
        description: string,
        usage: string,
        task: (message: Message, args: CommonArguments) => void,
        properties: CommandProperties = { AdminOnly: false, ShowInHelp: true }
    ) {
        this.description = description;
        this.usage = usage;
        this.cmd_function = task;
        this.properties = properties;
    }
}

class Service {
    description: string;
    event: keyof ClientEvents;
    action: (m: Message) => void;
    constructor(
        description: string,
        event: keyof ClientEvents,
        action: (m: Message) => void
    ) {
        this.description = description;
        this.event = event;
        this.action = action;
    }
}

export {
    token,
    prefix,
    msToRelativeTime,
    Command,
    activities,
    Log,
    LogError,
    SendMessage,
    CommonArguments,
    Service,
};
