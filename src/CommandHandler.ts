import { Command, Log, LogError } from "./Deps";
import { readdirSync } from "fs";
import { join } from "path";

let commandDir = readdirSync(join(__dirname, "Commands"));
export let Commands: Command[] = [];

Commands = commandDir.map((module) => {
    try {
        Log(`loaded command ${module}`);
        return require(join(__dirname, "Commands", module)).default;
    } catch (error) {
        LogError(error as Error);
    }
});
