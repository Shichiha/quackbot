import { Command, SendMessage } from "../Dependencies";

export default new Command("Quacks", "quack", (m) => {
    SendMessage("Quack!", m);
})