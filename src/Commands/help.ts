import { Command, SendMessage } from "../Deps";

export default new Command("All the functions and their usage", "help", (m, a) => {
    let stringBuffer = "";
    a.Commands.forEach(command => { if (command.show_in_help) stringBuffer += `${command.description}\nUsage: ${command.usage}\n\n`; });
    SendMessage(stringBuffer, m);
})