import { Message } from "discord.js-selfbot-v13";
import fs from "fs";

function getHMS(time: Date = new Date()) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return [hours, minutes, seconds];
}
export function Log(message: any) {
    let [hours, minutes, seconds] = getHMS();

    console.log(`[${hours}:${minutes}:${seconds}]: ${message}`);
}

export function LogError(error: Error) {
    let [hours, minutes, seconds] = getHMS();

    let fileName = `logs/error-${Date.now()}`;
    let errorMessage = `[${hours}:${minutes}:${seconds}]: ${error}`;

    fs.writeFile(fileName, errorMessage, (err) => {
        if (err) LogError(err);
    });
    console.log(errorMessage);
}
export function SendMessage(txt: string, msg: Message) {
    if (txt.length >= 500) msg.channel.send("string too long");
    else if (txt.length <= 0) msg.channel.send("no string returned.");
    else
        msg.channel.send(txt).catch((e) => {
            LogError(e);
        });
}
