import { Command, SendMessage } from "../Deps";

export default new Command("Quacks", "quack", (m) => {
    SendMessage("Quack!", m);
})