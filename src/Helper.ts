import chalk from "chalk";
import { Client, Message } from "discord.js-selfbot-v13";
import fs from "fs";
export function Log(message: any, time: Date = new Date()) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    console.log(
        `${chalk.yellow(`[${hours}:${minutes}:${seconds}]:`)} ${message}`
    );
}

export function LogError(error: Error) {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let fileName = `logs/error-${Date.now()}`;
    let errorMessage = `${chalk.red(
        `[${hours}:${minutes}:${seconds}]:`
    )} ${error}`;
    fs.writeFile(fileName, errorMessage, (err) => {
        if (err) LogError(err);
    });
    Log(errorMessage);
}
export function SendMessage(txt: string, msg: Message) {
    if (txt.length >= 500) msg.channel.send("string too long");
    else if (txt.length <= 0) msg.channel.send("no string returned.");
    else
        msg.channel.send(txt).catch((e) => {
            LogError(e);
        });
}
