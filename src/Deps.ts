import { Client, Message } from "discord.js-selfbot-v13";
import fs from 'fs';
import { activities, prefix, token } from "./config";
function Log(message: any, time: Date = new Date()) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    console.log(`[${hours}:${minutes}:${seconds}]: ${message}`);
}

function LogError(error:Error) {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let fileName = `logs/error-${Date.now()}`;
    let errorMessage = `[${hours}:${minutes}:${seconds}]: ${error}`;
    fs.writeFile(fileName, errorMessage, (err) => {
        if (err) LogError(err)
    });
    Log(errorMessage)
}
function SendMessage(txt: string, msg: Message) {
    if (txt.length >= 500) msg.channel.send("string too long")
    else if (txt.length <= 0) msg.channel.send("no string returned.");
    else msg.channel.send(txt).catch((e) => { LogError(e)});
}
interface CommonArguments {
    client: Client,
    message: Message,
    Commands: Command[]
}
class Command {
    description: string
    usage: string
    cmd_function: (message: Message, args: CommonArguments) => void
    show_in_help: boolean
    constructor(description: string, usage: string, cmd_function: (message: Message, args: CommonArguments) => void, show_in_help: boolean = true) {
        this.description = description
        this.usage = usage
        this.cmd_function = cmd_function
        this.show_in_help = show_in_help
    }
}

function msToRelativeTime(ms: number) {
    var seconds = Math.floor((ms / 1000) % 60)
    var decimal = Math.floor(((ms / 1000) % 1) * 10)
    var minutes = Math.floor((ms / (1000 * 60)) % 60)
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    var days = Math.floor(ms / (1000 * 60 * 60 * 24))
    var stringBuffer = ''
    if (days > 0) stringBuffer += days + 'd '
    if (hours > 0) stringBuffer += hours + 'h '
    if (minutes > 0) stringBuffer += minutes + 'm '
    if (seconds > 0) stringBuffer += seconds + 's '
    if (decimal > 0) stringBuffer += decimal + 'ms'

    return stringBuffer
}


export { token, prefix, msToRelativeTime, Command, activities, Log, LogError, SendMessage, CommonArguments };

