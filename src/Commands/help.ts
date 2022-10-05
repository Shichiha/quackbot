import { Command, Log, SendMessage } from "../Dependencies";

export default new Command("All the functions and their usage", "help", (m, a) => {
    let stringBuffer = "";
    a.Commands.forEach(command => { 
        Log(command);
        if (command.properties?.ShowInHelp) stringBuffer += `${command.description}\nUsage: ${command.usage}\n\n`; });
    SendMessage(stringBuffer, m);
})