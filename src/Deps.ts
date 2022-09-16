import chalk from 'chalk';
import { Client, Message } from "discord.js-selfbot-v13";
import fs from 'fs';
import { activities, prefix, token } from "./config";
function Log(message: any, time: Date = new Date()) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    console.log(`${chalk.yellow(`[${hours}:${minutes}:${seconds}]:`)} ${message}`);
}

function LogError(error: Error) {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let fileName = `logs/error-${Date.now()}`;
    let errorMessage = `${chalk.red(`[${hours}:${minutes}:${seconds}]:`)} ${error}`
    fs.writeFile(fileName, errorMessage, (err) => {
        if (err) LogError(err)
    });
    Log(errorMessage)
}
function SendMessage(txt: string, msg: Message) {
    if (txt.length >= 500) msg.channel.send("string too long")
    else if (txt.length <= 0) msg.channel.send("no string returned.");
    else msg.channel.send(txt).catch((e) => { LogError(e) });
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
    constructor(description: string, usage: string, task: (message: Message, args: CommonArguments) => void, showInHelp: boolean = true) {
        this.description = description
        this.usage = usage
        this.cmd_function = task
        this.show_in_help = showInHelp
    }
}
function msToRelativeTime(ms: number): string {
    let stringBuffer: string = '';
    const unitsRT = { seconds: [Math.floor((ms / 1000) % 60), "s"], decimal: [Math.floor(((ms / 1000) % 1) * 10), "ms"], minutes: [Math.floor((ms / (1000 * 60)) % 60), "m"], hours: [Math.floor((ms / (1000 * 60 * 60)) % 24), "h"], days: [Math.floor(ms / (1000 * 60 * 60 * 24)), "d"] }
    const condition = (n: (string | number)[]) => { n[0] > 0 ? stringBuffer += `${n[0]}${n[1]}` : null; return stringBuffer }
    for (let unit in unitsRT)
        condition(unitsRT[unit as keyof typeof unitsRT])
    return stringBuffer
}

export { token, prefix, msToRelativeTime, Command, activities, Log, LogError, SendMessage, CommonArguments };
