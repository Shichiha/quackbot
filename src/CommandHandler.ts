import { Command, Log, LogError } from "./Dependencies";
import { readdirSync } from "fs";
import { join } from "path";

let commandDir = readdirSync(join(__dirname, "Commands"));
export let Commands: Command[] = [];

for (let module of commandDir) {
    let command: Command = require(join(__dirname, "Commands", module))
        .default as Command;

    if (command) {
        Log(`loaded command ${module}`);
        Commands.push(command);
    } else {
        LogError(new Error(`Command ${module} is broken.`));
    }
}
