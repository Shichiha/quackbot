import { Command } from "./Deps";
import { readdirSync } from "fs";
import { join } from "path";
export const Commands: Command[] = readdirSync(join(__dirname, "Commands")).map(file => require(join(__dirname, "Commands", file)).default)